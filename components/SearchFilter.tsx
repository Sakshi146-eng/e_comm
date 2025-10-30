'use client';

import { useState } from 'react';
import { Search, Filter, PackageX } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface SearchFilterProps {
  products: Product[];
}

export default function SearchFilter({ products }: SearchFilterProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  // Dynamically generate unique categories for the filter dropdown
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Client-side filtering logic
  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-slate-200 rounded-xl pl-12 pr-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder-slate-400 font-medium"
          />
        </div>
        
        {/* Category Filter */}
        <div className="relative sm:w-64">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={20} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-slate-200 rounded-xl pl-12 pr-10 py-3 w-full appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 font-medium bg-white cursor-pointer hover:border-purple-300"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <svg 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Results Count Badge */}
      {search || category !== 'all' ? (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-6 py-3">
          <span className="text-sm font-semibold text-blue-900">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
          </span>
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors underline"
          >
            Clear filters
          </button>
        </div>
      ) : null}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <PackageX className="text-slate-400" size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-600 text-center mb-6 max-w-md">
            We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}