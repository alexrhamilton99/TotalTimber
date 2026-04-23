'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/supabase/server';

export async function createCustomer(formData: FormData) {
  const supabase = await createServerClient();

  const payload = {
    name: String(formData.get('name') || '').trim(),
    phone: String(formData.get('phone') || '').trim() || null,
    email: String(formData.get('email') || '').trim() || null,
  };

  if (!payload.name) throw new Error('Name is required');

  const { data, error } = await supabase.from('customers').insert(payload).select('*').single();
  if (error) throw new Error(error.message);

  revalidatePath('/customers');
  return data;
}

export async function updateCustomer(id: string, formData: FormData) {
  const supabase = await createServerClient();

  const payload = {
    name: String(formData.get('name') || '').trim(),
    phone: String(formData.get('phone') || '').trim() || null,
    email: String(formData.get('email') || '').trim() || null,
  };

  if (!payload.name) throw new Error('Name is required');

  const { error } = await supabase.from('customers').update(payload).eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/customers');
}

export async function deleteCustomer(id: string) {
  const supabase = await createServerClient();
  const { error } = await supabase.from('customers').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/customers');
}

// Used from new project form — creates customer and returns the new ID
export async function createCustomerAndReturn(formData: FormData): Promise<string> {
  const supabase = await createServerClient();

  const payload = {
    name: String(formData.get('name') || '').trim(),
    phone: String(formData.get('phone') || '').trim() || null,
    email: String(formData.get('email') || '').trim() || null,
  };

  if (!payload.name) throw new Error('Name is required');

  const { data, error } = await supabase.from('customers').insert(payload).select('id').single();
  if (error) throw new Error(error.message);

  revalidatePath('/customers');
  return data.id;
}
