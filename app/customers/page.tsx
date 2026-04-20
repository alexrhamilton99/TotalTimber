import { getCustomers } from '@/lib/queries';
import { CustomerTable } from '@/components/customer-table';

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1c1917', letterSpacing: '-0.02em', margin: 0 }}>Customers</h1>
        <p style={{ fontSize: '14px', color: '#78716c', margin: '4px 0 0' }}>Manage your customer list</p>
      </div>
      <CustomerTable customers={customers} />
    </div>
  );
}
