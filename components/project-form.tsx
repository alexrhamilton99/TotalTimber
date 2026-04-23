'use client';

import { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/app/projects/new/actions';
import { createCustomerAndReturn } from '@/app/customers/actions';
import type { Customer } from '@/lib/types';

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

export function ProjectForm({ customers: initialCustomers }: { customers: Customer[] }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [addingCustomer, startAddCustomer] = useTransition();
  const [submitting, startSubmit] = useTransition();
  const [customerError, setCustomerError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const newCustomerFormRef = useRef<HTMLFormElement>(null);
  const mainFormRef = useRef<HTMLFormElement>(null);

  function handleAddCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setCustomerError(null);
    startAddCustomer(async () => {
      try {
        const newId = await createCustomerAndReturn(fd);
        const name = String(fd.get('name') || '');
        const phone = String(fd.get('phone') || '') || null;
        const email = String(fd.get('email') || '') || null;
        setCustomers(prev => [...prev, { id: newId, name, phone, email, created_at: new Date().toISOString() }].sort((a,b) => a.name.localeCompare(b.name)));
        setSelectedCustomerId(newId);
        setShowNewCustomer(false);
        newCustomerFormRef.current?.reset();
      } catch (err) {
        setCustomerError(err instanceof Error ? err.message : 'Failed to add customer');
      }
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitError(null);
    startSubmit(async () => {
      try {
        await createProject(fd);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Failed to save project');
      }
    });
  }

  return (
    <form ref={mainFormRef} onSubmit={handleSubmit}>
      <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', overflow: 'hidden' }}>

        {/* Project Details */}
        <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f4' }}>
          <div style={sectionLabel}>Project Details</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Project Name <span style={{ color: '#dc2626' }}>*</span></label>
              <input name="title" style={inputStyle} placeholder="Garage Build — Johnson" required />
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
                  onClick={() => { setShowNewCustomer(v => !v); setSelectedCustomerId(''); }}
                  title="Add new customer"
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

              {/* Inline new customer */}
              {showNewCustomer && (
                <div style={{ marginTop: '10px', padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    New Customer
                  </div>
                  {customerError && (
                    <div style={{ fontSize: '12px', color: '#dc2626', marginBottom: '6px' }}>Error: {customerError}</div>
                  )}
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
              <input name="job_address" style={inputStyle} placeholder="123 Main St, Minneapolis, MN" />
            </div>
            <div>
              <label style={labelStyle}>Status <span style={{ color: '#dc2626' }}>*</span></label>
              <select name="status" style={inputStyle} defaultValue="Quote" required>
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
              <input name="quote_amount" type="number" min="0" step="0.01" style={inputStyle} placeholder="12,500" />
            </div>
            <div>
              <label style={labelStyle}>Final Invoice ($)</label>
              <input name="invoice_amount" type="number" min="0" step="0.01" style={inputStyle} placeholder="13,250" />
            </div>
            <div>
              <label style={labelStyle}>Deposit ($)</label>
              <input name="deposit_amount" type="number" min="0" step="0.01" style={inputStyle} placeholder="2,500" />
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f4' }}>
          <div style={sectionLabel}>Schedule</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Start Date</label>
              <input name="start_date" type="date" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>End Date</label>
              <input name="end_date" type="date" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f4' }}>
          <div style={sectionLabel}>Notes</div>
          <textarea name="notes" style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
            placeholder="Material delivery, schedule notes, customer requests…" />
        </div>

        {/* Footer */}
        {submitError && (
          <div style={{ padding: '10px 24px', background: '#fef2f2', borderTop: '1px solid #fecaca' }}>
            <span style={{ fontSize: '13px', color: '#dc2626' }}>Error: {submitError}</span>
          </div>
        )}
        <div style={{ padding: '16px 24px', background: '#fafaf9', display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={submitting} style={{
            padding: '10px 20px', background: submitting ? '#86efac' : '#16a34a', color: '#fff',
            fontSize: '14px', fontWeight: '600', borderRadius: '8px',
            border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
          }}>
            {submitting ? 'Saving…' : 'Save Project'}
          </button>
          <a href="/projects" style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '10px 20px', background: '#fff', color: '#57534e',
            fontSize: '14px', fontWeight: '500', borderRadius: '8px',
            border: '1.5px solid #e7e5e4', textDecoration: 'none',
          }}>
            Cancel
          </a>
        </div>
      </div>
    </form>
  );
}
