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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide">Total Products</p>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <Package className="text-blue-600" size={24} />
          </div>
        </div>
        <p className="text-4xl font-extrabold text-slate-900">{stats.total}</p>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Active inventory items</span>
        </div>
      </div>
      
      {/* Low Stock Card (Highlight based on risk) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide">Low Stock Items</p>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            stats.lowStock > 0 
              ? 'bg-red-50 group-hover:bg-red-100' 
              : 'bg-green-50 group-hover:bg-green-100'
          }`}>
            <AlertTriangle 
              className={stats.lowStock > 0 ? 'text-red-600' : 'text-green-600'} 
              size={24} 
            />
          </div>
        </div>
        <p className={`text-4xl font-extrabold ${
          stats.lowStock > 0 ? 'text-red-600' : 'text-green-600'
        }`}>
          {stats.lowStock}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className={`text-xs font-medium ${
            stats.lowStock > 0 ? 'text-red-600' : 'text-green-600'
          }`}>
            {stats.lowStock > 0 ? 'Needs attention' : 'All stocked well'}
          </span>
        </div>
      </div>
      
      {/* Total Inventory Value Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide">Inventory Value</p>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>
        <p className="text-4xl font-extrabold text-green-700">
          ${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Total investment</span>
        </div>
      </div>
      
      {/* Categories Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide">Categories</p>
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <Layers className="text-purple-600" size={24} />
          </div>
        </div>
        <p className="text-4xl font-extrabold text-slate-900">{stats.categories}</p>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Unique product types</span>
        </div>
      </div>
      
    </div>
  );
}