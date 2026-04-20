import { mockCustomers, mockProjects } from '@/lib/mock-data';
import type { Customer, Project } from '@/lib/types';
import { createServerClient } from '@/supabase/server';

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*, customers(*)')
      .order('start_date', { ascending: true });

    if (error) throw error;
    return (data as Project[]) ?? mockProjects;
  } catch {
    return mockProjects;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*, customers(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Project;
  } catch {
    return mockProjects.find((project) => project.id === id) ?? null;
  }
}

export async function getCustomers(): Promise<Customer[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return (data as Customer[]) ?? mockCustomers;
  } catch {
    return mockCustomers;
  }
}
