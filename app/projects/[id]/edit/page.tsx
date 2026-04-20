import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById, getCustomers } from '@/lib/queries';
import { EditProjectForm } from '@/components/edit-project-form';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, customers] = await Promise.all([getProjectById(id), getCustomers()]);
  if (!project) notFound();

  return (
    <div style={{ maxWidth: '780px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href={`/projects/${id}`} style={{ fontSize: '13px', color: '#78716c', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
          ← Back to Project
        </Link>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1c1917', letterSpacing: '-0.02em', margin: 0 }}>
          Edit Project
        </h1>
        <p style={{ fontSize: '14px', color: '#78716c', margin: '4px 0 0' }}>{project.title}</p>
      </div>
      <EditProjectForm project={project} customers={customers} />
    </div>
  );
}
