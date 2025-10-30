import { getProducts } from '@/lib/db';
import AddToWishlist from '@/components/AddToWishlist';
import { Product } from '@/types/product';
import { Sparkles, Server, MonitorSmartphone } from 'lucide-react';

// This is a Server Component. Data fetching happens securely on the server.

export default async function RecommendationsPage() {
  const products: Product[] = await getProducts();
  
  // Simple logic to get the first three products as "recommended"
  const recommended = products.slice(0, 3); 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900">Recommended Products</h1>
        </div>
        
        {/* Architecture Info Banner */}
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Server className="text-indigo-600" size={20} />
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MonitorSmartphone className="text-purple-600" size={20} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Hybrid Architecture</h3>
              <p className="text-sm text-indigo-800 leading-relaxed">
                Data is fetched on the server (Server Component), but the "Add to Wishlist" button 
                is a client-side interactive component. This combines the best of both worlds for 
                performance and interactivity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommended.map(product => (
          <div 
            key={product.id} 
            className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-purple-300 transition-all duration-300 group"
          >
            {/* Recommended Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-full">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">
                  ⭐ Recommended
                </span>
              </div>
            </div>

            {/* Product Info */}
            <h3 className="font-bold text-2xl mb-3 text-slate-900 group-hover:text-purple-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            
            {/* Price Section */}
            <div className="mb-6 pb-6 border-b-2 border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Special Price
              </p>
              <p className="text-3xl font-extrabold text-green-600">
                ${product.price}
              </p>
            </div>
            
            {/* AddToWishlist is a Client Component imported by this Server Component */}
            <AddToWishlist productId={product.id} productName={product.name} />
          </div>
        ))}
      </div>

      {/* Empty State (if no recommendations) */}
      {recommended.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="text-slate-400" size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No recommendations available</h3>
          <p className="text-slate-600 text-center max-w-md">
            Check back later for personalized product recommendations.
          </p>
        </div>
      )}
    </div>
  );
}