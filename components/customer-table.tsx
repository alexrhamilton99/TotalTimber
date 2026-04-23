'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Customer } from '@/lib/types';
import { createCustomer, updateCustomer, deleteCustomer } from '@/app/customers/actions';

const inputStyle: React.CSSProperties = {
  width: '100%', borderRadius: '7px', border: '1.5px solid #e7e5e4',
  background: '#fff', padding: '7px 10px', fontSize: '13px',
  color: '#1c1917', outline: 'none', fontFamily: 'inherit',
};

function Avatar({ name }: { name: string }) {
  return (
    <div style={{
      width: '32px', height: '32px', borderRadius: '50%',
      background: '#f5f5f4', border: '1px solid #e7e5e4',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '13px', fontWeight: '700', color: '#78716c', flexShrink: 0,
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function AddRow({ onDone, onAdded }: { onDone: () => void; onAdded: (c: Customer) => void }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  function handleAdd() {
    if (!name.trim()) return;
    setError(null);
    const fd = new FormData();
    fd.set('name', name.trim());
    fd.set('phone', phone.trim());
    fd.set('email', email.trim());
    startTransition(async () => {
      try {
        const customer = await createCustomer(fd);
        onAdded(customer);
        onDone();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add customer');
      }
    });
  }

  return (
    <>
    {error && (
      <tr>
        <td colSpan={4} style={{ padding: '6px 16px', background: '#fef2f2' }}>
          <span style={{ fontSize: '12px', color: '#dc2626' }}>Error: {error}</span>
          <button onClick={() => setError(null)} style={{ marginLeft: '8px', fontSize: '11px', color: '#78716c', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </td>
      </tr>
    )}
    <tr style={{ background: '#f0fdf4', borderBottom: '1px solid #bbf7d0' }}>
      <td style={{ padding: '10px 16px' }}>
        <input
          value={name} onChange={e => setName(e.target.value)}
          style={inputStyle} placeholder="Full name *" autoFocus
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
      </td>
      <td style={{ padding: '10px 16px' }}>
        <input
          value={phone} onChange={e => setPhone(e.target.value)}
          style={inputStyle} placeholder="(555) 123-4567"
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
      </td>
      <td style={{ padding: '10px 16px' }}>
        <input
          value={email} onChange={e => setEmail(e.target.value)}
          style={inputStyle} placeholder="email@example.com"
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
      </td>
      <td style={{ padding: '10px 16px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button type="button" onClick={handleAdd} disabled={pending || !name.trim()} style={{
            padding: '6px 12px', background: '#16a34a', color: '#fff',
            fontSize: '12px', fontWeight: '600', borderRadius: '6px',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            opacity: !name.trim() ? 0.5 : 1,
          }}>
            {pending ? '…' : 'Add'}
          </button>
          <button type="button" onClick={onDone} style={{
            padding: '6px 10px', background: '#fff', color: '#78716c',
            fontSize: '12px', fontWeight: '500', borderRadius: '6px',
            border: '1.5px solid #e7e5e4', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Cancel
          </button>
        </div>
      </td>
    </tr>
    </>
  );
}

function CustomerRow({ customer, onUpdate, onDelete }: {
  customer: Customer;
  onUpdate: (c: Customer) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [saving, startSave] = useTransition();
  const [deleting, startDelete] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startSave(async () => {
      try {
        await updateCustomer(customer.id, fd);
        const updated: Customer = {
          ...customer,
          name: String(fd.get('name') || '').trim(),
          phone: String(fd.get('phone') || '').trim() || null,
          email: String(fd.get('email') || '').trim() || null,
        };
        onUpdate(updated);
        setEditing(false);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Save failed');
      }
    });
  }

  function handleDelete() {
    if (!window.confirm(`Remove "${customer.name}"? This will fail if they have projects attached.`)) return;
    setError(null);
    startDelete(async () => {
      try {
        await deleteCustomer(customer.id);
        onDelete(customer.id);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Delete failed');
      }
    });
  }

  if (editing) {
    return (
      <tr style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a' }}>
        <td style={{ padding: '10px 16px' }}>
          <form id={`edit-${customer.id}`} onSubmit={handleSave} style={{ display: 'contents' }}>
            <input name="name" style={inputStyle} defaultValue={customer.name} required autoFocus />
          </form>
        </td>
        <td style={{ padding: '10px 16px' }}>
          <input form={`edit-${customer.id}`} name="phone" style={inputStyle} defaultValue={customer.phone ?? ''} placeholder="(555) 123-4567" />
        </td>
        <td style={{ padding: '10px 16px' }}>
          <input form={`edit-${customer.id}`} name="email" style={inputStyle} defaultValue={customer.email ?? ''} placeholder="email@example.com" />
        </td>
        <td style={{ padding: '10px 16px' }}>
          {error && <div style={{ fontSize: '12px', color: '#dc2626', marginBottom: '6px' }}>{error}</div>}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button form={`edit-${customer.id}`} type="submit" disabled={saving} style={{
              padding: '6px 12px', background: '#16a34a', color: '#fff',
              fontSize: '12px', fontWeight: '600', borderRadius: '6px',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {saving ? '…' : 'Save'}
            </button>
            <button type="button" onClick={() => setEditing(false)} style={{
              padding: '6px 10px', background: '#fff', color: '#78716c',
              fontSize: '12px', fontWeight: '500', borderRadius: '6px',
              border: '1.5px solid #e7e5e4', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
    {error && (
      <tr>
        <td colSpan={4} style={{ padding: '6px 16px', background: '#fef2f2' }}>
          <span style={{ fontSize: '12px', color: '#dc2626' }}>{error}</span>
          <button onClick={() => setError(null)} style={{ marginLeft: '8px', fontSize: '11px', color: '#78716c', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </td>
      </tr>
    )}
    <tr style={{ borderBottom: '1px solid #f5f5f4', opacity: deleting ? 0.4 : 1, transition: 'opacity 0.2s' }}>
      <td style={{ padding: '13px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar name={customer.name} />
          <span style={{ fontWeight: '600', color: '#1c1917', fontSize: '14px' }}>{customer.name}</span>
        </div>
      </td>
      <td style={{ padding: '13px 16px', color: '#57534e', fontSize: '13px' }}>{customer.phone ?? '—'}</td>
      <td style={{ padding: '13px 16px', color: '#57534e', fontSize: '13px' }}>{customer.email ?? '—'}</td>
      <td style={{ padding: '13px 16px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => setEditing(true)} style={{
            padding: '5px 11px', background: '#fff', color: '#57534e',
            fontSize: '12px', fontWeight: '500', borderRadius: '6px',
            border: '1.5px solid #e7e5e4', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Edit
          </button>
          <button onClick={handleDelete} disabled={deleting} style={{
            padding: '5px 11px', background: '#fff', color: '#dc2626',
            fontSize: '12px', fontWeight: '500', borderRadius: '6px',
            border: '1.5px solid #fecaca', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {deleting ? '…' : 'Remove'}
          </button>
        </div>
      </td>
    </tr>
    </>
  );
}

export function CustomerTable({ customers: initial }: { customers: Customer[] }) {
  const [customers, setCustomers] = useState(initial);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setCustomers(initial);
  }, [initial]);

  function handleUpdate(updated: Customer) {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
  }

  function handleDelete(id: string) {
    setCustomers(prev => prev.filter(c => c.id !== id));
  }

  function handleAdded(customer: Customer) {
    setCustomers(prev => [...prev, customer].sort((a, b) => a.name.localeCompare(b.name)));
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #f0eeed', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', color: '#78716c' }}>
          {customers.length > 0 ? `${customers.length} customer${customers.length !== 1 ? 's' : ''}` : 'No customers yet'}
        </span>
        {!adding && (
          <button onClick={() => setAdding(true)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '6px 12px', background: '#16a34a', color: '#fff',
            fontSize: '12px', fontWeight: '600', borderRadius: '7px',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            + Add Customer
          </button>
        )}
      </div>

      {customers.length === 0 && !adding ? (
        <div style={{ padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
          <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917', marginBottom: '4px' }}>No customers yet</div>
          <div style={{ fontSize: '13px', color: '#78716c' }}>Add your first customer above.</div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0eeed', background: '#fafaf9' }}>
                {['Name', 'Phone', 'Email', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adding && <AddRow onDone={() => setAdding(false)} onAdded={handleAdded} />}
              {customers.map((c) => (
                <CustomerRow key={c.id} customer={c} onUpdate={handleUpdate} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
