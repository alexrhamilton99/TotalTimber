'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/supabase/server';

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createServerClient();

  const startDate = String(formData.get('start_date') || '').trim();
  const endDate = String(formData.get('end_date') || '').trim();
  const invoiceAmount = String(formData.get('invoice_amount') || '').trim();
  const depositAmount = String(formData.get('deposit_amount') || '').trim();
  const quoteAmount = String(formData.get('quote_amount') || '').trim();

  const payload = {
    customer_id: String(formData.get('customer_id') || ''),
    title: String(formData.get('title') || ''),
    description: String(formData.get('notes') || '') || null,
    job_address: String(formData.get('job_address') || '') || null,
    quote_amount: quoteAmount ? Number(quoteAmount) : null,
    final_invoice_amount: invoiceAmount ? Number(invoiceAmount) : null,
    deposit_amount: depositAmount ? Number(depositAmount) : null,
    status: String(formData.get('status') || 'Quote'),
    start_date: startDate || null,
    end_date: endDate || null,
  };

  const { error } = await supabase.from('projects').update(payload).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/projects');
  revalidatePath(`/projects/${id}`);
  redirect(`/projects/${id}`);
}

export async function deleteProject(id: string) {
  const supabase = await createServerClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/projects');
  redirect('/projects');
}
