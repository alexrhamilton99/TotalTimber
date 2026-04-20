import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/queries';
import { currency, formatDate } from '@/lib/utils';

const statusConfig: Record<string, { dot: string; bg: string; text: string }> = {
  'Quote':       { dot: '#d97706', bg: '#fef3c7', text: '#92400e' },
  'Approved':    { dot: '#2563eb', bg: '#dbeafe', text: '#1e40af' },
  'Scheduled':   { dot: '#7c3aed', bg: '#ede9fe', text: '#5b21b6' },
  'In Progress': { dot: '#ea580c', bg: '#ffedd5', text: '#9a3412' },
  'Completed':   { dot: '#16a34a', bg: '#dcfce7', text: '#166534' },
  'Invoiced':    { dot: '#0891b2', bg: '#cffafe', text: '#155e75' },
  'Paid':        { dot: '#16a34a', bg: '#dcfce7', text: '#166534' },
};

function DetailCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{
      background: highlight ? '#f0fdf4' : '#fff',
      border: `1px solid ${highlight ? '#bbf7d0' : '#e7e5e4'}`,
      borderRadius: '10px', padding: '16px 18px',
    }}>
      <div style={{ fontSize: '11px', fontWeight: '600', color: highlight ? '#16a34a' : '#78716c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
        {label}
      </div>
      <div style={{ fontSize: '16px', fontWeight: '600', color: highlight ? '#166534' : '#1c1917' }}>
        {value}
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  const status = statusConfig[project.status] || { dot: '#a8a29e', bg: '#f5f5f4', text: '#57534e' };

  return (
    <div style={{ maxWidth: '900px' }}>
      {/* Back */}
      <Link href="/projects" style={{ fontSize: '13px', color: '#78716c', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
        ← Back to Projects
      </Link>

      {/* Header */}
      <div style={{
        background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px',
        padding: '24px', marginBottom: '16px',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1c1917', letterSpacing: '-0.02em', margin: '0 0 6px' }}>
            {project.title}
          </h1>
          {project.description && (
            <p style={{ fontSize: '14px', color: '#78716c', margin: '0 0 12px', lineHeight: '1.5' }}>
              {project.description}
            </p>
          )}
          {project.job_address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#a8a29e' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {project.job_address}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '6px 14px', borderRadius: '20px',
            background: status.bg, color: status.text,
            fontSize: '13px', fontWeight: '600',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: status.dot }} />
            {project.status}
          </span>
          <Link href={`/projects/${project.id}/edit`} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '8px',
            background: '#fff', border: '1.5px solid #e7e5e4',
            color: '#1c1917', fontSize: '13px', fontWeight: '600', textDecoration: 'none',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </Link>
        </div>
      </div>

      {/* Customer Info */}
      <div style={{
        background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px',
        padding: '20px 24px', marginBottom: '16px',
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
          Customer
        </div>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#a8a29e', marginBottom: '2px' }}>Name</div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917' }}>{project.customers?.name ?? '—'}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a8a29e', marginBottom: '2px' }}>Phone</div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917' }}>{project.customers?.phone ?? '—'}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a8a29e', marginBottom: '2px' }}>Email</div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917' }}>{project.customers?.email ?? '—'}</div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <DetailCard label="Start Date" value={formatDate(project.start_date)} />
        <DetailCard label="End Date" value={formatDate(project.end_date)} />
        <DetailCard label="Deposit" value={currency(project.deposit_amount)} />
        <DetailCard label="Quote Amount" value={currency(project.quote_amount)} highlight />
        <DetailCard label="Final Invoice" value={currency(project.final_invoice_amount)} highlight />
        <div style={{
          background: project.status === 'Paid' ? '#f0fdf4' : '#fff',
          border: `1px solid ${project.status === 'Paid' ? '#bbf7d0' : '#e7e5e4'}`,
          borderRadius: '10px', padding: '16px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '22px', marginBottom: '4px' }}>{project.status === 'Paid' ? '✓' : '○'}</div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: project.status === 'Paid' ? '#16a34a' : '#a8a29e' }}>
              {project.status === 'Paid' ? 'Payment Received' : 'Awaiting Payment'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
