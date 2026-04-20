'use client';

export function DashboardDate() {
  return (
    <p style={{ fontSize: '14px', color: '#78716c', margin: '4px 0 0' }}>
      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
    </p>
  );
}
