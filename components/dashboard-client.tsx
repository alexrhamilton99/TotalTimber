'use client';

import { useState } from 'react';
import { StatsCard } from '@/components/stats-card';
import { ProjectTable } from '@/components/project-table';
import type { Project } from '@/lib/types';
import { currency } from '@/lib/utils';

type FilterKey = 'Active Jobs' | 'Open Quotes' | 'Projects Total' | 'Needs Payment' | null;

const filterFns: Record<NonNullable<FilterKey>, (p: Project) => boolean> = {
  'Active Jobs':    (p) => ['Scheduled', 'In Progress'].includes(p.status),
  'Open Quotes':    (p) => p.status === 'Quote',
  'Projects Total': ()  => true,
  'Needs Payment':  (p) => p.status !== 'Paid',
};

export function DashboardClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<FilterKey>(null);

  const activeJobs   = projects.filter(filterFns['Active Jobs']).length;
  const openQuotes   = projects.filter(filterFns['Open Quotes']).length;
  const totalRevenue = projects.filter((p) => p.status === 'Paid')
    .reduce((s, p) => s + (p.final_invoice_amount ?? p.quote_amount ?? 0), 0);
  const needsPayment = projects.filter(filterFns['Needs Payment']).length;

  const stats: { title: NonNullable<FilterKey>; value: string; detail: string }[] = [
    { title: 'Active Jobs',    value: String(activeJobs),      detail: 'In progress or scheduled' },
    { title: 'Open Quotes',    value: String(openQuotes),      detail: 'Awaiting approval' },
    { title: 'Projects Total', value: String(projects.length), detail: 'All time' },
    { title: 'Needs Payment',  value: String(needsPayment),    detail: 'Not yet marked paid' },
  ];

  const filtered = active
    ? projects.filter(filterFns[active])
    : projects.slice(0, 8);

  function toggle(key: NonNullable<FilterKey>) {
    setActive(prev => prev === key ? null : key);
  }

  return (
    <>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
        {stats.map((s) => (
          <StatsCard
            key={s.title}
            title={s.title}
            value={s.value}
            detail={s.detail}
            active={active === s.title}
            onClick={() => toggle(s.title)}
          />
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917' }}>
            {active ? `${active} (${filtered.length})` : 'Recent Projects'}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {active && (
              <button
                onClick={() => setActive(null)}
                style={{
                  fontSize: '12px', color: '#78716c', background: '#f5f5f4',
                  border: '1px solid #e7e5e4', borderRadius: '6px',
                  padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Clear filter ✕
              </button>
            )}
            <a href="/projects" style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500', textDecoration: 'none' }}>
              View all →
            </a>
          </div>
        </div>
        <ProjectTable projects={filtered} />
      </div>
    </>
  );
}
