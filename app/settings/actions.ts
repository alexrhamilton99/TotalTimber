'use server';

import { createServerClient } from '@/supabase/server';

type Result = { error: string } | { success: string } | null;

export async function changePassword(_: Result, formData: FormData): Promise<Result> {
  const newPassword = String(formData.get('newPassword') || '').trim();
  const confirm = String(formData.get('confirmPassword') || '').trim();

  if (newPassword.length < 6) return { error: 'Password must be at least 6 characters' };
  if (newPassword !== confirm) return { error: 'Passwords do not match' };

  const supabase = await createServerClient();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };

  return { success: 'Password updated successfully' };
}
