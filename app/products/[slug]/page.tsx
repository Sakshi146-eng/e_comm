import { getProducts, getProductBySlug } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Package, Tag, Clock, Zap } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 group transition-all"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to products
      </Link>
      
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        {/* Product Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Price Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <p className="text-sm font-semibold text-green-900 uppercase tracking-wide">Price</p>
            </div>
            <p className="text-4xl font-extrabold text-green-700">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Stock Card */}
          <div className={`border-2 rounded-xl p-6 hover:shadow-md transition-all ${
            product.inventory > 10 
              ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' 
              : product.inventory > 0 
              ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200' 
              : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                product.inventory > 10 
                  ? 'bg-blue-100' 
                  : product.inventory > 0 
                  ? 'bg-yellow-100' 
                  : 'bg-red-100'
              }`}>
                <Package className={
                  product.inventory > 10 
                    ? 'text-blue-600' 
                    : product.inventory > 0 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
                } size={20} />
              </div>
              <p className={`text-sm font-semibold uppercase tracking-wide ${
                product.inventory > 10 
                  ? 'text-blue-900' 
                  : product.inventory > 0 
                  ? 'text-yellow-900' 
                  : 'text-red-900'
              }`}>In Stock</p>
            </div>
            <p className={`text-4xl font-extrabold ${
              product.inventory > 10 
                ? 'text-blue-700' 
                : product.inventory > 0 
                ? 'text-yellow-700' 
                : 'text-red-700'
            }`}>
              {product.inventory}
            </p>
            <p className={`text-sm font-medium mt-2 ${
              product.inventory > 10 
                ? 'text-blue-600' 
                : product.inventory > 0 
                ? 'text-yellow-600' 
                : 'text-red-600'
            }`}>
              {product.inventory > 10 ? 'Well stocked' : product.inventory > 0 ? 'Low stock' : 'Out of stock'}
            </p>
          </div>
        </div>
        
        {/* Metadata Section */}
        <div className="space-y-4 pt-6 border-t-2 border-slate-100">
          {/* Category */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Tag className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</p>
              <p className="text-lg font-bold text-slate-900">{product.category}</p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Clock className="text-slate-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Last Updated</p>
              <p className="text-sm font-medium text-slate-700">
                {new Date(product.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* ISR Info Banner */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Zap className="text-blue-600" size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900 mb-1">Incremental Static Regeneration</p>
            <p className="text-sm text-blue-700">
              This page uses ISR - automatically revalidates every 60 seconds to ensure fresh data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}