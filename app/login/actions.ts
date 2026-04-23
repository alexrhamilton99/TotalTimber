'use server';

import { redirect } from 'next/navigation';
import { createServerClient } from '@/supabase/server';

const USERNAME_TO_EMAIL: Record<string, string> = {
  kyle: 'kyle@totaltimber.app',
};

export async function login(_: string | null, formData: FormData): Promise<string | null> {
  const username = String(formData.get('username') || '').toLowerCase().trim();
  const password = String(formData.get('password') || '');

  const email = USERNAME_TO_EMAIL[username];
  if (!email) return 'Invalid username or password';

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return 'Invalid username or password';

  redirect('/dashboard');
}

export async function signOut() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect('/login');
}
