import Link from 'next/link';
import { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
  return (
    // Link uses the slug for the ISR product detail page
    <Link href={`/products/${product.slug}`}> 
      <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer group">
        <div className="mb-4">
          <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
              Price
            </span>
            <span className="text-2xl font-extrabold text-green-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
              Stock
            </span>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              product.inventory > 10 
                ? 'bg-green-50 text-green-700' 
                : product.inventory > 0 
                ? 'bg-yellow-50 text-yellow-700' 
                : 'bg-red-50 text-red-700'
            }`}>
              {product.inventory} units
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}