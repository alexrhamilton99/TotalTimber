'use client';

import Link from 'next/link';
import type { Project } from '@/lib/types';
import { currency, formatDate } from '@/lib/utils';

const statusConfig: Record<string, { dot: string; bg: string; text: string; label: string }> = {
  'Quote':       { dot: '#d97706', bg: '#fef3c7', text: '#92400e', label: 'Quote' },
  'Approved':    { dot: '#2563eb', bg: '#dbeafe', text: '#1e40af', label: 'Approved' },
  'Scheduled':   { dot: '#7c3aed', bg: '#ede9fe', text: '#5b21b6', label: 'Scheduled' },
  'In Progress': { dot: '#ea580c', bg: '#ffedd5', text: '#9a3412', label: 'In Progress' },
  'Completed':   { dot: '#16a34a', bg: '#dcfce7', text: '#166534', label: 'Completed' },
  'Invoiced':    { dot: '#0891b2', bg: '#cffafe', text: '#155e75', label: 'Invoiced' },
  'Paid':        { dot: '#16a34a', bg: '#dcfce7', text: '#166534', label: 'Paid' },
};

const thStyle: React.CSSProperties = {
  padding: '11px 16px',
  textAlign: 'left',
  fontSize: '11px',
  fontWeight: '600',
  color: '#78716c',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  whiteSpace: 'nowrap',
};

export function ProjectTable({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div style={{
        background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px',
        padding: '48px 24px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏗️</div>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917', marginBottom: '4px' }}>No projects yet</div>
        <div style={{ fontSize: '13px', color: '#78716c' }}>Create your first project to get started.</div>
        <Link href="/projects/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          marginTop: '16px', padding: '9px 18px', background: '#16a34a',
          color: '#fff', fontSize: '13px', fontWeight: '600',
          borderRadius: '8px', textDecoration: 'none',
        }}>
          + New Project
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f0eeed', background: '#fafaf9' }}>
              <th style={thStyle}>Project</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Dates</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Quote</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => {
              const status = statusConfig[project.status] || { dot: '#a8a29e', bg: '#f5f5f4', text: '#57534e', label: project.status };
              return (
                <tr
                  key={project.id}
                  style={{
                    borderBottom: i < projects.length - 1 ? '1px solid #f5f5f4' : 'none',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fafaf9')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '13px 16px' }}>
                    <Link href={`/projects/${project.id}`} style={{
                      fontWeight: '600', color: '#1c1917', textDecoration: 'none',
                      fontSize: '14px',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#16a34a')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#1c1917')}
                    >
                      {project.title}
                    </Link>
                    {project.job_address && (
                      <div style={{ fontSize: '12px', color: '#a8a29e', marginTop: '2px' }}>
                        {project.job_address}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '13px 16px', color: '#57534e', fontSize: '13px' }}>
                    {project.customers?.name ?? '—'}
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '3px 10px', borderRadius: '20px',
                      background: status.bg, color: status.text,
                      fontSize: '12px', fontWeight: '600',
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: status.dot, flexShrink: 0 }} />
                      {status.label}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: '13px', color: '#78716c' }}>
                    {project.start_date ? (
                      <span>{formatDate(project.start_date)}{project.end_date ? ` → ${formatDate(project.end_date)}` : ''}</span>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '13px 16px', textAlign: 'right', fontWeight: '600', color: '#1c1917', fontVariantNumeric: 'tabular-nums' }}>
                    {currency(project.quote_amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
