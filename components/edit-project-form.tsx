'use client';

import { useState, useTransition, useRef } from 'react';
import type { Customer, Project } from '@/lib/types';
import { updateProject, deleteProject } from '@/app/projects/[id]/actions';
import { createCustomerAndReturn } from '@/app/customers/actions';

const inputStyle: React.CSSProperties = {
  width: '100%', borderRadius: '8px', border: '1.5px solid #e7e5e4',
  background: '#fff', padding: '9px 12px', fontSize: '14px',
  color: '#1c1917', outline: 'none', transition: 'border-color 0.15s',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '13px', fontWeight: '600',
  color: '#57534e', marginBottom: '6px',
};

const sectionLabel: React.CSSProperties = {
  fontSize: '13px', fontWeight: '700', color: '#78716c',
  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px',
};

export function EditProjectForm({ project, customers: initialCustomers }: { project: Project; customers: Customer[] }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState(project.customer_id);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDelete] = useTransition();
  const [addingCustomer, startAddCustomer] = useTransition();
  const newCustomerFormRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => updateProject(project.id, formData));
  }

  function handleDelete() {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    startDelete(() => deleteProject(project.id));
  }

  function handleAddCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startAddCustomer(async () => {
      const newId = await createCustomerAndReturn(fd);
      const name = String(fd.get('name') || '');
      const phone = String(fd.get('phone') || '') || null;
      const email = String(fd.get('email') || '') || null;
      setCustomers(prev => [...prev, { id: newId, name, phone, email, created_at: new Date().toISOString() }].sort((a, b) => a.name.localeCompare(b.name)));
      setSelectedCustomerId(newId);
      setShowNewCustomer(false);
      newCustomerFormRef.current?.reset();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', overflow: 'hidden' }}>

        {/* Project Details */}
        <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f4' }}>
          <div style={sectionLabel}>Project Details</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Project Name <span style={{ color: '#dc2626' }}>*</span></label>
              <input name="title" style={inputStyle} defaultValue={project.title} required />
            </div>
            <div>
              <label style={labelStyle}>Customer <span style={{ color: '#dc2626' }}>*</span></label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <select
                  name="customer_id"
                  style={{ ...inputStyle, flex: 1 }}
                  value={selectedCustomerId}
                  onChange={e => { setSelectedCustomerId(e.target.value); setShowNewCustomer(false); }}
                  required
                >
                  <option value="">Select customer…</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowNewCustomer(v => !v)}
                  style={{
                    padding: '9px 11px', borderRadius: '8px', border: '1.5px solid #e7e5e4',
                    background: showNewCustomer ? '#f0fdf4' : '#fff', cursor: 'pointer',
                    color: showNewCustomer ? '#16a34a' : '#78716c', fontFamily: 'inherit',
                    fontSize: '16px', lineHeight: 1, flexShrink: 0,
                  }}
                >
                  +
                </button>
              </div>

              {showNewCustomer && (
                <div style={{ marginTop: '10px', padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    New Customer
                  </div>
                  <form ref={newCustomerFormRef} onSubmit={handleAddCustomer} style={{ display: 'grid', gap: '8px' }}>
                    <input name="name" style={{ ...inputStyle, fontSize: '13px', padding: '7px 10px' }} placeholder="Full name *" required autoFocus />
                    <input name="phone" style={{ ...inputStyle, fontSize: '13px', padding: '7px 10px' }} placeholder="Phone (optional)" />
                    <input name="email" style={{ ...inputStyle, fontSize: '13px', padding: '7px 10px' }} placeholder="Email (optional)" />
                    <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                      <button type="submit" disabled={addingCustomer} style={{
                        padding: '7px 14px', background: '#16a34a', color: '#fff',
                        fontSize: '12px', fontWeight: '600', borderRadius: '6px',
                        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                      }}>
                        {addingCustomer ? 'Adding…' : 'Add & Select'}
                      </button>
                      <button type="button" onClick={() => setShowNewCustomer(false)} style={{
                        padding: '7px 10px', background: '#fff', color: '#57534e',
                        fontSize: '12px', fontWeight: '500', borderRadius: '6px',
                        border: '1.5px solid #e7e5e4', cursor: 'pointer', fontFamily: 'inherit',
                      }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Job Address</label>
              <input name="job_address" style={inputStyle} defaultValue={project.job_address ?? ''} placeholder="123 Main St, Minneapolis, MN" />
            </div>
            <div>
              <label style={labelStyle}>Status <span style={{ color: '#dc2626' }}>*</span></label>
              <select name="status" style={inputStyle} defaultValue={project.status} required>
                {['Quote','Approved','Scheduled','In Progress','Completed','Invoiced','Paid'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Financials */}
        <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f4' }}>
          <div style={sectionLabel}>Financials</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Quote Amount ($)</label>
              <input name="quote_amount" type="number" min="0" step="0.01" style={inputStyle} defaultValue={project.quote_amount ?? ''} placeholder="12,500" />
            </div>
            <div>
              <label style={labelStyle}>Final Invoice ($)</label>
              <input name="invoice_amount" type="number" min="0" step="0.01" style={inputStyle} defaultValue={project.final_invoice_amount ?? ''} placeholder="13,250" />
            </div>
            <div>
              <label style={labelStyle}>Deposit ($)</label>
              <input name="deposit_amount" type="number" min="0" step="0.01" style={inputStyle} defaultValue={project.deposit_amount ?? ''} placeholder="2,500" />
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f4' }}>
          <div style={sectionLabel}>Schedule</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Start Date</label>
              <input name="start_date" type="date" style={inputStyle} defaultValue={project.start_date ?? ''} />
            </div>
            <div>
              <label style={labelStyle}>End Date</label>
              <input name="end_date" type="date" style={inputStyle} defaultValue={project.end_date ?? ''} />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f4' }}>
          <div style={sectionLabel}>Notes</div>
          <textarea name="notes" style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
            defaultValue={project.description ?? ''}
            placeholder="Material delivery, schedule notes, customer requests…" />
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', background: '#fafaf9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={isPending} style={{
              padding: '10px 20px', background: isPending ? '#86efac' : '#16a34a', color: '#fff',
              fontSize: '14px', fontWeight: '600', borderRadius: '8px',
              border: 'none', cursor: isPending ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
            }}>
              {isPending ? 'Saving…' : 'Save Changes'}
            </button>
            <a href={`/projects/${project.id}`} style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '10px 20px', background: '#fff', color: '#57534e',
              fontSize: '14px', fontWeight: '500', borderRadius: '8px',
              border: '1.5px solid #e7e5e4', textDecoration: 'none',
            }}>
              Cancel
            </a>
          </div>
          <button type="button" onClick={handleDelete} disabled={isDeleting} style={{
            padding: '10px 16px', background: 'transparent', color: isDeleting ? '#fca5a5' : '#dc2626',
            fontSize: '13px', fontWeight: '600', borderRadius: '8px',
            border: '1.5px solid #fecaca', cursor: isDeleting ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
          }}>
            {isDeleting ? 'Deleting…' : 'Delete Project'}
          </button>
        </div>
      </div>
    </form>
  );
}
