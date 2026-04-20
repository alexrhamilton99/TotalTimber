# Total Timber Restoration — Job Planner

A Next.js job planner app for Total Timber Restoration, backed by Supabase.

## Deploying to Cloudflare Pages

**Build settings:**
- Build command: `npx @opennextjs/cloudflare build`
- Output directory: `.open-next/assets`

**Environment variables (add in Cloudflare dashboard):**
```
NEXT_PUBLIC_SUPABASE_URL=https://qmmbekszqmcphjatzcoy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NODE_VERSION=20
```

## Local Development

```bash
npm install
npm run dev
```

Add a `.env.local` file with your Supabase credentials.

## Database

Run `supabase-schema.sql` in your Supabase SQL editor to create the required tables.
