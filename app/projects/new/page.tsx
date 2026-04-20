import Link from 'next/link';
import { ProjectForm } from '@/components/project-form';
import { getCustomers } from '@/lib/queries';

export default async function NewProjectPage() {
  const customers = await getCustomers();

  return (
    <div style={{ maxWidth: '780px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/projects" style={{ fontSize: '13px', color: '#78716c', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
          ← Back to Projects
        </Link>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1c1917', letterSpacing: '-0.02em', margin: 0 }}>New Project</h1>
        <p style={{ fontSize: '14px', color: '#78716c', margin: '4px 0 0' }}>Fill in the details to create a new job.</p>
      </div>
      <ProjectForm customers={customers} />
    </div>
  );
}
