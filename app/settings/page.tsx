export default function SettingsPage() {
  const inputStyle: React.CSSProperties = {
    width: '100%', borderRadius: '8px', border: '1.5px solid #e7e5e4',
    background: '#fff', padding: '9px 12px', fontSize: '14px',
    color: '#1c1917', outline: 'none', fontFamily: 'inherit',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '13px', fontWeight: '600', color: '#57534e', marginBottom: '6px',
  };

  const comingSoon = [
    { icon: '📅', title: 'Calendar Sync', desc: 'Export to Apple Calendar & Google Calendar' },
    { icon: '📄', title: 'PDF Invoices', desc: 'Generate and send invoices as PDFs' },
    { icon: '✓', title: 'Task Checklists', desc: 'Per-phase checklists for each project' },
    { icon: '👥', title: 'Team Access', desc: 'Role-based access for staff and crew' },
  ];

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1c1917', letterSpacing: '-0.02em', margin: 0 }}>Settings</h1>
        <p style={{ fontSize: '14px', color: '#78716c', margin: '4px 0 0' }}>Configure your business and app preferences.</p>
      </div>

      {/* Business Info */}
      <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f5f5f4' }}>
          <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917' }}>Business Information</div>
          <div style={{ fontSize: '13px', color: '#78716c', marginTop: '2px' }}>Your company details and contact info</div>
        </div>
        <div style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Business Name</label>
            <input type="text" style={inputStyle} placeholder="BuildFlow Construction" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Business Email</label>
              <input type="email" style={inputStyle} placeholder="hello@example.com" />
            </div>
            <div>
              <label style={labelStyle}>Business Phone</label>
              <input type="tel" style={inputStyle} placeholder="(555) 123-4567" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Business Address</label>
            <input type="text" style={inputStyle} placeholder="123 Main St, Minneapolis, MN" />
          </div>
        </div>
        <div style={{ padding: '14px 24px', background: '#fafaf9', borderTop: '1px solid #f5f5f4' }}>
          <button style={{
            padding: '9px 18px', background: '#16a34a', color: '#fff',
            fontSize: '13px', fontWeight: '600', borderRadius: '8px',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Save Changes
          </button>
        </div>
      </div>

      {/* Coming Soon */}
      <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '20px 24px' }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1c1917', marginBottom: '4px' }}>Coming Soon</div>
        <div style={{ fontSize: '13px', color: '#78716c', marginBottom: '16px' }}>Features planned for future releases</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {comingSoon.map((f) => (
            <div key={f.title} style={{
              padding: '14px 16px', background: '#fafaf9', border: '1px solid #f0eeed',
              borderRadius: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1c1917' }}>{f.title}</div>
                <div style={{ fontSize: '12px', color: '#78716c', marginTop: '2px' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
