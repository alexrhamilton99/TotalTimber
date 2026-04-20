'use client';

import { useState } from 'react';

export function CalendarSubscribe() {
  const [copied, setCopied] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [manualUrl, setManualUrl] = useState('');

  const handleSubscribe = () => {
    const webcal = (window.location.origin + '/api/calendar').replace(/^https?:/, 'webcal:');
    window.location.href = webcal;
  };

  const handleCopy = async () => {
    const url = window.location.origin + '/api/calendar';
    let success = false;

    try {
      await navigator.clipboard.writeText(url);
      success = true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        success = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setManualUrl(url);
      setShowUrl(true);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={handleSubscribe}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', background: '#16a34a', color: '#fff',
            fontSize: '13px', fontWeight: '600', borderRadius: '8px',
            border: 'none', cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
            <line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/>
          </svg>
          Subscribe
        </button>
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', background: '#fff', color: '#57534e',
            border: '1px solid #e7e5e4', fontSize: '13px', fontWeight: '500',
            borderRadius: '8px', cursor: 'pointer',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>

      {showUrl && (
        <div style={{ marginTop: '10px', background: '#f5f5f4', border: '1px solid #e7e5e4', borderRadius: '8px', padding: '10px 12px' }}>
          <div style={{ fontSize: '12px', color: '#78716c', marginBottom: '4px' }}>Copy this URL to subscribe:</div>
          <input
            readOnly
            value={manualUrl}
            onFocus={(e) => e.target.select()}
            style={{
              width: '100%', fontSize: '12px', padding: '6px 8px',
              border: '1px solid #d6d3d1', borderRadius: '6px',
              background: '#fff', color: '#1c1917', fontFamily: 'monospace',
            }}
          />
          <button
            onClick={() => setShowUrl(false)}
            style={{ marginTop: '6px', fontSize: '12px', color: '#78716c', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
