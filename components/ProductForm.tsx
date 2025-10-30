'use client';

import { useState } from 'react';
import { Save, Package, DollarSign, Layers, Archive } from 'lucide-react';

// Define the shape of the form data
interface FormData {
  name: string;
  description: string;
  price: string;
  category: string;
  inventory: string;
}

// Define props for the component
interface ProductFormProps {
  onSubmit: (data: Omit<FormData, 'price' | 'inventory'> & { price: number; inventory: number }) => void;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  price: '',
  category: '',
  inventory: ''
};

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Data validation and type conversion before submission
    const dataToSend = {
      ...formData,
      price: parseFloat(formData.price),
      inventory: parseInt(formData.inventory)
    };
    
    onSubmit(dataToSend);
    setFormData(initialFormData); // Reset form after successful submission
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
          <Package className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Add New Product</h2>
      </div>
      
      <div className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2 text-slate-700 uppercase tracking-wide">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="border-2 border-slate-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder-slate-400"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold mb-2 text-slate-700 uppercase tracking-wide">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product..."
            className="border-2 border-slate-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder-slate-400 resize-none"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-semibold mb-2 text-slate-700 uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-green-600" />
                Price
              </div>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="border-2 border-slate-200 rounded-xl pl-8 pr-4 py-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold mb-2 text-slate-700 uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-purple-600" />
                Category
              </div>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Electronics"
              className="border-2 border-slate-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 placeholder-slate-400"
            />
          </div>

          {/* Inventory */}
          <div>
            <label htmlFor="inventory" className="block text-sm font-semibold mb-2 text-slate-700 uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <Archive size={16} className="text-blue-600" />
                Inventory
              </div>
            </label>
            <input
              type="number"
              id="inventory"
              name="inventory"
              required
              value={formData.inventory}
              onChange={handleChange}
              placeholder="0"
              className="border-2 border-slate-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder-slate-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Save size={22} />
          Save Product
        </button>
      </div>
    </form>
  );
}