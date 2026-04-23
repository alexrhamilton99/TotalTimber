import { getProjects } from '@/lib/queries';
import type { Project } from '@/lib/types';
import { CalendarSubscribe } from '@/components/calendar-subscribe';

const statusDot: Record<string, string> = {
  'Quote': '#d97706', 'Approved': '#2563eb', 'Scheduled': '#7c3aed',
  'In Progress': '#ea580c', 'Completed': '#16a34a', 'Invoiced': '#0891b2', 'Paid': '#16a34a',
};

function ProjectRow({ project: p }: { project: Project }) {
  return (
    <a href={`/projects/${p.id}`} style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '10px 12px', borderRadius: '8px', textDecoration: 'none',
    }}>
      <span style={{
        width: '10px', height: '10px', borderRadius: '50%',
        background: statusDot[p.status] || '#a8a29e', flexShrink: 0,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1c1917' }}>{p.title}</div>
        <div style={{ fontSize: '12px', color: '#a8a29e', marginTop: '1px' }}>
          {[p.customers?.name, p.job_address].filter(Boolean).join(' · ')}
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#78716c', flexShrink: 0, textAlign: 'right' }}>
        <div>{new Date(p.start_date! + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        {p.end_date && p.end_date !== p.start_date && (
          <div style={{ color: '#a8a29e' }}>
            → {new Date(p.end_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        )}
      </div>
    </a>
  );
}

export default async function CalendarPage() {
  const projects = await getProjects();
  const scheduled = projects.filter((p) => p.start_date);

  const byMonth: Record<string, Project[]> = {};
  scheduled.forEach((p) => {
    const month = p.start_date!.slice(0, 7);
    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(p);
  });

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1c1917', letterSpacing: '-0.02em', margin: 0 }}>Calendar</h1>
          <p style={{ fontSize: '14px', color: '#78716c', margin: '4px 0 0' }}>
            {scheduled.length} scheduled projects
          </p>
        </div>
        <CalendarSubscribe />
      </div>

      {Object.keys(byMonth).length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📅</div>
          <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917', marginBottom: '4px' }}>No scheduled projects</div>
          <div style={{ fontSize: '13px', color: '#78716c' }}>Add start dates to your projects to see them here.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {Object.entries(byMonth).sort().map(([month, projs]) => {
            const label = new Date(month + '-01T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            return (
              <div key={month} style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid #f5f5f4', background: '#fafaf9' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1c1917' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: '#a8a29e', marginTop: '1px' }}>{projs.length} project{projs.length !== 1 ? 's' : ''}</div>
                </div>
                <div style={{ padding: '8px' }}>
                  {projs.map((p) => <ProjectRow key={p.id} project={p} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
