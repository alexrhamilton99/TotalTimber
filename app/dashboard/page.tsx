import Link from 'next/link';
import { ProjectTable } from '@/components/project-table';
import { StatsCard } from '@/components/stats-card';
import { getProjects } from '@/lib/queries';
import { currency } from '@/lib/utils';

export default async function DashboardPage() {
  const projects = await getProjects();
  const activeJobs = projects.filter((p) => ['Scheduled', 'In Progress'].includes(p.status)).length;
  const openQuotes = projects.filter((p) => p.status === 'Quote').length;
  const unpaid = projects.filter((p) => !['Paid'].includes(p.status)).length;
  const totalRevenue = projects
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + (p.final_invoice_amount ?? p.quote_amount ?? 0), 0);

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1c1917', letterSpacing: '-0.02em', margin: 0 }}>
            Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: '#78716c', margin: '4px 0 0' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link href="/projects/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '9px 18px', background: '#16a34a', color: '#fff',
          fontSize: '13px', fontWeight: '600', borderRadius: '8px',
          textDecoration: 'none',
        }}>
          + New Project
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
        <StatsCard title="Active Jobs" value={String(activeJobs)} detail="In progress or scheduled" />
        <StatsCard title="Open Quotes" value={String(openQuotes)} detail="Awaiting approval" />
        <StatsCard title="Projects Total" value={String(projects.length)} detail="All time" />
        <StatsCard title="Needs Payment" value={String(unpaid)} detail="Not yet marked paid" />
      </div>

      {/* Recent Projects */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917' }}>Recent Projects</div>
          <Link href="/projects" style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500', textDecoration: 'none' }}>
            View all →
          </Link>
        </div>
        <ProjectTable projects={projects.slice(0, 8)} />
      </div>
    </div>
  );
}
