'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Product</h2>
      
      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1 text-gray-700">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              required
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1 text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Inventory */}
          <div>
            <label htmlFor="inventory" className="block text-sm font-medium mb-1 text-gray-700">Inventory</label>
            <input
              type="number"
              id="inventory"
              name="inventory"
              required
              value={formData.inventory}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          <Save size={20} />
          Save Product
        </button>
      </div>
    </form>
  );
}
