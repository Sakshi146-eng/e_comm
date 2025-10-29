import { Product } from '@/types/product';
import fs from 'fs';
import path from 'path';

// Define the path to the mock database file
const dataPath = path.join(process.cwd(), 'data', 'products.json');

/**
 * Reads and parses the product data from the JSON file.
 */
export async function getProducts(): Promise<Product[]> {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Writes the product array back to the JSON file.
 */
export async function saveProducts(products: Product[]): Promise<void> {
  // Use a prettier format (null, 2) for human-readable JSON
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug) || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function addProduct(newProduct: Product): Promise<Product> {
  const products = await getProducts();
  products.push(newProduct);
  await saveProducts(products);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  // Apply updates and set the new lastUpdated time
  products[index] = { ...products[index], ...updates, lastUpdated: new Date().toISOString() };
  await saveProducts(products);
  return products[index];
}