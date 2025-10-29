import { getProducts } from '@/lib/db';
import SearchFilter from '@/components/SearchFilter';

// Next.js App Router Server Components fetch data at build time by default (SSG). [cite: 16]
// The data will be static until the next build.
export default async function HomePage() {
  const products = await getProducts(); // Data fetched at build time [cite: 16]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Catalog (SSG)</h1>
      <p className="text-gray-600 mb-4">
        This page uses Static Site Generation (SSG). Data is fast but only updated on a new build.
      </p>
      {/* SearchFilter is a 'use client' component that handles filtering (CSR) */}
      <SearchFilter products={products} /> {/* Client-side filtering  */}
    </div>
  );
}