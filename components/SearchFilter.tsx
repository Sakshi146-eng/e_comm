'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-lg">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full sm:w-auto appearance-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-12 text-lg">
            No products match your search criteria.
        </p>
      )}
    </div>
  );
}
