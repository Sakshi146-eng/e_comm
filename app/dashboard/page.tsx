import { getProducts } from '@/lib/db';
import DashboardStats from '@/components/DashboardStats';
import { Activity, RefreshCw, AlertTriangle, Package } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <Activity className="text-white" size={24} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900">Inventory Dashboard</h1>
        </div>
        
        {/* SSR Info Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <RefreshCw className="text-green-600" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-2">Server-Side Rendering (SSR)</h3>
              <p className="text-sm text-green-800 leading-relaxed">
                This page uses SSR - fresh data is guaranteed on every request. All statistics 
                are calculated in real-time on the server for maximum accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Stats Component */}
      <DashboardStats stats={stats} />

      {/* Low Stock Alert Section */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
            lowStockProducts.length > 0 
              ? 'bg-gradient-to-br from-red-500 to-rose-500' 
              : 'bg-gradient-to-br from-green-500 to-emerald-500'
          }`}>
            <AlertTriangle className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Low Stock Alert</h2>
        </div>

        {lowStockProducts.length > 0 ? (
          <div className="space-y-4">
            <p className="text-slate-600 mb-6">
              The following products need restocking attention:
            </p>
            <div className="grid gap-4">
              {lowStockProducts.map(product => (
                <div 
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-xl hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Package className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-sm text-slate-600">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Remaining Stock
                    </p>
                    <p className="text-2xl font-extrabold text-red-600">
                      {product.inventory}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Package className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">All Products Well Stocked!</h3>
            <p className="text-slate-600 text-center max-w-md">
              Great job! All inventory levels are healthy and no products need immediate restocking.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}