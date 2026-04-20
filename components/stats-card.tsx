import React from 'react';

const iconMap: Record<string, React.ReactElement> = {
  'Active Jobs': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  'Open Quotes': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  'Projects Total': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  'Needs Payment': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
};

const colorMap: Record<string, { bg: string; icon: string; label: string }> = {
  'Active Jobs':    { bg: '#dbeafe', icon: '#2563eb', label: '#1e40af' },
  'Open Quotes':    { bg: '#fef3c7', icon: '#d97706', label: '#92400e' },
  'Projects Total': { bg: '#dcfce7', icon: '#16a34a', label: '#166534' },
  'Needs Payment':  { bg: '#fee2e2', icon: '#dc2626', label: '#991b1b' },
};

export function StatsCard({ title, value, detail }: { title: string; value: string; detail: string }) {
  const colors = colorMap[title] || { bg: '#f5f5f4', icon: '#78716c', label: '#57534e' };
  const icon = iconMap[title];

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e7e5e4',
      borderRadius: '12px',
      padding: '20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {title}
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#1c1917', lineHeight: '1', marginTop: '10px', letterSpacing: '-0.02em' }}>
            {value}
          </div>
          <div style={{ fontSize: '12px', color: '#a8a29e', marginTop: '6px' }}>
            {detail}
          </div>
        </div>
        <div style={{
          width: '42px', height: '42px', borderRadius: '10px',
          background: colors.bg, color: colors.icon,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}
