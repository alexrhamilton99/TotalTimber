'use client';

import { useEffect, useState } from 'react';

export function DashboardDate() {
  const [date, setDate] = useState('');
  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
  }, []);
  if (!date) return null;
  return (
    <p style={{ fontSize: '14px', color: '#78716c', margin: '4px 0 0' }}>{date}</p>
  );
}
