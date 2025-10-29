import { Package, AlertTriangle, DollarSign, Layers } from 'lucide-react';

interface DashboardStatsProps {
  stats: { 
    total: number; 
    lowStock: number; 
    totalValue: number; 
    categories: number 
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Total Products Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm font-medium">Total Products</p>
            <Package className="text-blue-500" size={20} />
        </div>
        <p className="text-4xl font-extrabold mt-2 text-gray-900">{stats.total}</p>
      </div>
      
      {/* Low Stock Card (Highlight based on risk) */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm font-medium">Low Stock Items</p>
            <AlertTriangle className={`text-${stats.lowStock > 0 ? 'red-500' : 'green-500'}`} size={20} />
        </div>
        <p className={`text-4xl font-extrabold mt-2 ${stats.lowStock > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {stats.lowStock}
        </p>
      </div>
      
      {/* Total Inventory Value Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm font-medium">Total Inventory Value</p>
            <DollarSign className="text-green-500" size={20} />
        </div>
        <p className="text-4xl font-extrabold mt-2 text-green-700">
          ${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
      
      {/* Categories Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm font-medium">Unique Categories</p>
            <Layers className="text-purple-500" size={20} />
        </div>
        <p className="text-4xl font-extrabold mt-2 text-gray-900">{stats.categories}</p>
      </div>
      
    </div>
  );
}
