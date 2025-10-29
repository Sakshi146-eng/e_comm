import { getProducts } from '@/lib/db';
import DashboardStats from '@/components/DashboardStats';

// Force Server-Side Rendering (SSR) to ensure fresh data on every request 
export const dynamic = 'force-dynamic'; 

export default async function DashboardPage() {
  const products = await getProducts();

  // Calculate real-time statistics on the server [cite: 29]
  const stats = {
    total: products.length,
    lowStock: products.filter(p => p.inventory < 10).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.inventory), 0),
    categories: [...new Set(products.map(p => p.category))].length
  };

  const lowStockProducts = products.filter(p => p.inventory < 10);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Inventory Dashboard (SSR)</h1>
      <p className="text-gray-600 mb-4">
        This page uses Server-Side Rendering (SSR) - fresh data is guaranteed on every request. 
      </p>
      
      <DashboardStats stats={stats} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Low Stock Alert</h2>
        {/* ... Low stock alert display logic ... */}
      </div>
    </div>
  );
}