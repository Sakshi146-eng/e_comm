import { getProducts } from '@/lib/db';
import AddToWishlist from '@/components/AddToWishlist';
import { Product } from '@/types/product';

// This is a Server Component. Data fetching happens securely on the server.

export default async function RecommendationsPage() {
  const products: Product[] = await getProducts();
  
  // Simple logic to get the first three products as "recommended"
  const recommended = products.slice(0, 3); 

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-2">Recommended Products (Bonus)</h1>
      <p className="text-gray-600 mb-6 border-l-4 border-indigo-400 pl-3 py-1 bg-indigo-50">
        **Hybrid Architecture:** Data is fetched on the server (Server Component), 
        but the "Add to Wishlist" button is a client-side interactive component.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommended.map(product => (
          <div key={product.id} className="bg-white border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="font-semibold text-xl mb-2 text-blue-800">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            
            <p className="text-2xl font-extrabold text-green-600 mb-4">
              ${product.price}
            </p>
            
            {/* AddToWishlist is a Client Component imported by this Server Component */}
            <AddToWishlist productId={product.id} productName={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
