import { getProducts, getProductBySlug } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Configure Incremental Static Regeneration (ISR)
export const revalidate = 60; // Revalidate every 60 seconds 

// Pre-render paths (sligs) at build time
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug, // Use slug for dynamic routing [cite: 21]
  }));
}

export default async function ProductPage(props: { 
  params: { slug: string } 
}) {
  // FIX: Explicitly await the destructuring of params to satisfy the Next.js runtime.
  // This bypasses the "params is a Promise" error often seen in the compiler output.
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">
        ← Back to products
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">In Stock</p>
            <p className="text-2xl font-bold">{product.inventory}</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Category: {product.category}
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Last updated: {new Date(product.lastUpdated).toLocaleString()}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-800">
          This page uses ISR (Incremental Static Regeneration) - revalidates every 60 seconds. 
        </div>
      </div>
    </div>
  );
}