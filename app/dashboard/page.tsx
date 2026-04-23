import Link from 'next/link';
import { DashboardDate } from '@/components/dashboard-date';
import { DashboardClient } from '@/components/dashboard-client';
import { getProjects } from '@/lib/queries';

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1c1917', letterSpacing: '-0.02em', margin: 0 }}>
            Dashboard
          </h1>
          <DashboardDate />
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

      <DashboardClient projects={projects} />
    </div>
  );
}
