export type ProjectStatus =
  | 'Quote'
  | 'Approved'
  | 'Scheduled'
  | 'In Progress'
  | 'Completed'
  | 'Invoiced'
  | 'Paid';

export type Customer = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  customer_id: string;
  title: string;
  description: string | null;
  job_address: string | null;
  quote_amount: number | null;
  final_invoice_amount: number | null;
  deposit_amount: number | null;
  status: ProjectStatus;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  customers?: Customer;
};
