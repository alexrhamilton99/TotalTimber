'use client';

import { useActionState } from 'react';
import { changePassword } from '@/app/settings/actions';

const inputStyle: React.CSSProperties = {
  width: '100%', borderRadius: '8px', border: '1.5px solid #e7e5e4',
  background: '#fff', padding: '9px 12px', fontSize: '14px',
  color: '#1c1917', outline: 'none', fontFamily: 'inherit',
};

export function ChangePasswordForm() {
  const [result, formAction, pending] = useActionState(changePassword, null);

  return (
    <form action={formAction}>
      {result && 'error' in result && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#dc2626' }}>
          {result.error}
        </div>
      )}
      {result && 'success' in result && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#16a34a' }}>
          {result.success}
        </div>
      )}
      <div style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#57534e', marginBottom: '6px' }}>New Password</label>
          <input name="newPassword" type="password" style={inputStyle} placeholder="Min. 6 characters" required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#57534e', marginBottom: '6px' }}>Confirm New Password</label>
          <input name="confirmPassword" type="password" style={inputStyle} placeholder="Repeat new password" required />
        </div>
      </div>
      <div style={{ padding: '14px 0 0' }}>
        <button type="submit" disabled={pending} style={{
          padding: '9px 18px', background: pending ? '#a8a29e' : '#16a34a', color: '#fff',
          fontSize: '13px', fontWeight: '600', borderRadius: '8px',
          border: 'none', cursor: pending ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
        }}>
          {pending ? 'Updating…' : 'Update Password'}
        </button>
      </div>
    </form>
  );
}
