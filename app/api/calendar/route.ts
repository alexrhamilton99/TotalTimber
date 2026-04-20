import { createClient } from '@supabase/supabase-js';
import type { Project } from '@/lib/types';

function toICSDate(dateStr: string): string {
  return dateStr.replace(/-/g, '');
}

function nextDayICS(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + 1);
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('');
}

function esc(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export async function GET() {
  let projects: Project[] = [];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data } = await supabase
      .from('projects')
      .select('*, customers(*)')
      .not('start_date', 'is', null)
      .order('start_date', { ascending: true });

    if (data) projects = data as Project[];
  } catch {
    // return empty calendar on error
  }

  const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';

  const events = projects
    .filter((p) => p.start_date)
    .map((p) => {
      const dtstart = toICSDate(p.start_date!);
      // DTEND is exclusive for all-day events, so end_date+1 day
      const dtend = p.end_date ? nextDayICS(p.end_date) : nextDayICS(p.start_date!);
      const desc = [p.customers?.name, p.job_address].filter(Boolean).join(' · ');

      return [
        'BEGIN:VEVENT',
        `UID:job-${p.id}@totaltimber`,
        `DTSTAMP:${now}`,
        `DTSTART;VALUE=DATE:${dtstart}`,
        `DTEND;VALUE=DATE:${dtend}`,
        `SUMMARY:${esc(p.title)}`,
        desc ? `DESCRIPTION:${esc(desc)}` : null,
        p.job_address ? `LOCATION:${esc(p.job_address)}` : null,
        `STATUS:CONFIRMED`,
        'END:VEVENT',
      ]
        .filter(Boolean)
        .join('\r\n');
    });

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Total Timber Restoration//Jobs//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Total Timber Jobs',
    'X-WR-CALDESC:Total Timber Restoration Job Schedule',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="total-timber-jobs.ics"',
      'Cache-Control': 'no-cache, no-store',
    },
  });
}
