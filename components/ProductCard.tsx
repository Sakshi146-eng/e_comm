import Link from 'next/link';
import { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
  return (
    // Link uses the slug for the ISR product detail page
    <Link href={`/products/${product.slug}`}> 
      <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">In Stock: {product.inventory}</span>
        </div>
      </div>
    </Link>
  );
}