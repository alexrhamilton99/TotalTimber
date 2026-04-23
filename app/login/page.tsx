import Image from 'next/image';

export default function LoginPage() {
  const inputStyle: React.CSSProperties = {
    width: '100%', borderRadius: '8px', border: '1.5px solid #e7e5e4',
    background: '#fff', padding: '10px 12px', fontSize: '14px',
    color: '#1c1917', outline: 'none', fontFamily: 'inherit',
  };

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

          <form style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#57534e', marginBottom: '6px' }}>
                Email Address
              </label>
              <input type="email" style={inputStyle} placeholder="you@example.com" required />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#57534e' }}>Password</label>
                <a href="#" style={{ fontSize: '12px', color: '#d97706', fontWeight: '500', textDecoration: 'none' }}>Forgot?</a>
              </div>
              <input type="password" style={inputStyle} placeholder="••••••••" required />
            </div>
            <button type="submit" style={{
              width: '100%', padding: '11px', background: '#d97706', color: '#fff',
              fontSize: '14px', fontWeight: '700', borderRadius: '8px',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginTop: '4px',
              letterSpacing: '0.01em',
            }}>
              Sign In
            </button>
          </form>

          <p style={{ fontSize: '13px', color: '#78716c', textAlign: 'center', margin: '20px 0 0' }}>
            Don&apos;t have an account?{' '}
            <a href="#" style={{ color: '#d97706', fontWeight: '600', textDecoration: 'none' }}>Create one</a>
          </p>
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#57534e', marginTop: '16px' }}>
          Secured by Supabase Authentication
        </p>
      </div>
    </div>
  );
}
