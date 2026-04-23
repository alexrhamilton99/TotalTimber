'use client';

import Image from 'next/image';
import { useActionState } from 'react';
import { login } from './actions';

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(login, null);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#1c1917', padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <Image src="/logo.png" alt="Total Timber Restoration" width={120} height={120} style={{ objectFit: 'contain' }} />
          <div style={{ marginTop: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#fafaf9', letterSpacing: '-0.01em' }}>Total Timber</div>
            <div style={{ fontSize: '12px', color: '#78716c', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Restoration · Job Planner</div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '14px', padding: '32px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1c1917', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '13px', color: '#78716c', margin: '0 0 24px' }}>Sign in to manage your projects</p>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px',
              padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#dc2626',
            }}>
              {error}
            </div>
          )}

          <form action={formAction} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#57534e', marginBottom: '6px' }}>
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="kyle"
                required
                autoComplete="username"
                style={{
                  width: '100%', borderRadius: '8px', border: '1.5px solid #e7e5e4',
                  background: '#fff', padding: '10px 12px', fontSize: '14px',
                  color: '#1c1917', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#57534e', marginBottom: '6px' }}>
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                style={{
                  width: '100%', borderRadius: '8px', border: '1.5px solid #e7e5e4',
                  background: '#fff', padding: '10px 12px', fontSize: '14px',
                  color: '#1c1917', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              style={{
                width: '100%', padding: '11px', background: pending ? '#a8a29e' : '#d97706',
                color: '#fff', fontSize: '14px', fontWeight: '700', borderRadius: '8px',
                border: 'none', cursor: pending ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', marginTop: '4px', letterSpacing: '0.01em',
              }}
            >
              {pending ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#57534e', marginTop: '16px' }}>
          Secured by Supabase Authentication
        </p>
      </div>
    </div>
  );
}
