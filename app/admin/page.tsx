'use client';

import { useState, useEffect } from 'react';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types/product';
import { RefreshCcw } from 'lucide-react';

// NOTE: We use window.prompt for simplicity, but a custom modal is recommended for production apps.

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // State to hold the API Key needed for authenticated POST/PUT requests
  const [apiKey, setApiKey] = useState(''); 
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Simple custom message display handler
  const displayMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  /**
   * Fetches the current list of products from the Next.js API route.
   */
  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        console.error('API Error:', data.error);
        displayMessage('Failed to fetch products for display.', 'error');
        setProducts([]);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      displayMessage('Network error while fetching products.', 'error');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handles adding a new product via a protected API route (POST /api/products).
   */
  async function handleAddProduct(formData: any) {
    if (!apiKey) {
      displayMessage('Please enter the Admin API Key to add a product.', 'error');
      return;
    }
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey // Authentication header
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        displayMessage('Product added successfully!');
        fetchProducts(); // Refresh the list
      } else if (res.status === 401) {
        displayMessage('Unauthorized: Invalid Admin API Key.', 'error');
      } else {
        displayMessage('Failed to add product.', 'error');
      }
    } catch (error) {
      displayMessage('Error connecting to the server.', 'error');
    }
  }

  /**
   * Handles updating an existing product's inventory via a protected API route (PUT /api/products/[slug]).
   * It uses the product's SLUG in the URL, as required by the consolidated API route structure.
   */
  async function handleUpdateInventory(product: Product) {
    if (!apiKey) {
      displayMessage('Please enter the Admin API Key to update inventory.', 'error');
      return;
    }

    // Custom non-blocking input prompt substitute
    const newInventoryString = window.prompt(`Enter new inventory count for ${product.name}:`);

    if (newInventoryString === null || newInventoryString.trim() === '') {
      return; // User cancelled or entered nothing
    }

    const newInventory = parseInt(newInventoryString.trim());
    if (isNaN(newInventory) || newInventory < 0) {
      displayMessage('Invalid inventory number.', 'error');
      return;
    }

    try {
      // FIX: Use product.slug in the URL for the PUT request
      const res = await fetch(`/api/products/${product.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey // Authentication header
        },
        body: JSON.stringify({ inventory: newInventory }) // Only sending the inventory update
      });

      if (res.ok) {
        displayMessage(`Inventory for ${product.name} updated successfully!`);
        fetchProducts(); // Refresh the list (and the SSR/ISR pages will eventually follow)
      } else if (res.status === 401) {
        displayMessage('Unauthorized: Invalid Admin API Key.', 'error');
      } else {
        displayMessage('Failed to update product.', 'error');
      }
    } catch (error) {
      displayMessage('Error connecting to the server.', 'error');
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Panel (CSR)</h1>
      <p className="text-gray-600">
        This page uses Client-Side Rendering (CSR) for interactive product management.
        **POST** and **PUT** requests require the Admin API Key.
      </p>

      {/* Message Alert */}
      {message && (
        <div className={`p-4 rounded-lg font-medium ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* API Key Input */}
      <div className="bg-white border rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Admin Authentication</h2>
        <label className="block text-sm font-medium mb-2 text-gray-700">Admin API Key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter secret ADMIN_API_KEY from .env.local"
        />
        <p className="text-xs text-gray-500 mt-2">
            **Required for adding/updating products.**
        </p>
      </div>


      {/* Add New Product Form */}
      <ProductForm onSubmit={handleAddProduct} />

      {/* Existing Products List */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Existing Products ({products.length})</h2>
            <button 
                onClick={fetchProducts}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                disabled={loading}
            >
                <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh List
            </button>
        </div>
        
        {loading ? (
          <p className="text-gray-500">Loading product list...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map(product => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                <p className={`text-sm font-bold ${product.inventory < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    Inventory: {product.inventory}
                </p>
                <button
                  onClick={() => handleUpdateInventory(product)}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                >
                  Update Inventory
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
