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
        {/* PWA / iOS home screen */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Total Timber" />
        <meta name="theme-color" content="#1c1917" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f4' }}>
          <Sidebar />
          <main className="app-main" style={{ flex: 1, padding: '32px', overflowX: 'hidden', minWidth: 0 }}>
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
