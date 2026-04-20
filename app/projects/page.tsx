import Link from 'next/link';
import { ProjectTable } from '@/components/project-table';
import { getProjects } from '@/lib/queries';

export default async function ProjectsPage() {
  const projects = await getProjects();

  const counts = {
    all: projects.length,
    active: projects.filter((p) => ['In Progress', 'Scheduled'].includes(p.status)).length,
    quotes: projects.filter((p) => p.status === 'Quote').length,
    paid: projects.filter((p) => p.status === 'Paid').length,
  };

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1c1917', letterSpacing: '-0.02em', margin: 0 }}>Projects</h1>
          <p style={{ fontSize: '14px', color: '#78716c', margin: '4px 0 0' }}>
            {counts.all} total · {counts.active} active · {counts.quotes} open quotes
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
      <ProjectTable projects={projects} />
    </div>
  );
}
