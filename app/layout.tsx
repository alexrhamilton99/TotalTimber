import './globals.css';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/sidebar';
import { MobileNav } from '@/components/mobile-nav';

export const metadata: Metadata = {
  title: 'Total Timber Restoration',
  description: 'Job planner for Total Timber Restoration',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Total Timber',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Total Timber" />
        <meta name="theme-color" content="#1c1917" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <style dangerouslySetInnerHTML={{ __html: `
          .sidebar-wrapper { display: flex; flex-shrink: 0; }
          .mobile-bottom-nav {
            display: none;
            position: fixed;
            bottom: 0; left: 0; right: 0;
            background: #1c1917;
            border-top: 1px solid #292524;
            z-index: 100;
            padding-top: 8px;
            padding-bottom: env(safe-area-inset-bottom, 0px);
          }
          @media (max-width: 768px) {
            .sidebar-wrapper { display: none; }
            .app-main { padding: 20px 16px 84px !important; }
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .mobile-bottom-nav { display: flex; }
          }
        ` }} />
      </head>
      <body>
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f4' }}>
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
          <main className="app-main" style={{ flex: 1, padding: '32px', overflowX: 'hidden', minWidth: 0 }}>
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
