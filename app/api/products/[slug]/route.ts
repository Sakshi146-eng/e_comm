import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug, updateProduct } from '@/lib/db';
import { Product } from '@/types/product';

// --- GET /api/products/[slug] (Fetch Single Product) ---
export async function GET(
  request: Request,
  context: { params: { slug: string } } 
) {
  try {
    // FIX (Final Attempt): Explicitly await context.params to ensure sync access in all runtimes.
    const { slug } = await context.params;
    
    const product = await getProductBySlug(slug);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// --- PUT /api/products/[slug] (Update Product by ID via Slug) ---
export async function PUT(
  request: NextRequest,
  context: { params: { slug: string } } 
) {
  try {
    // FIX (Final Attempt): Explicitly await context.params to ensure sync access in all runtimes.
    // This addresses the error message: "params is a Promise and must be unwrapped with await"
    const { slug } = await context.params;

    // 1. Mock Authentication Check
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      // You must resolve the 401 error by setting ADMIN_API_KEY in .env.local
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch the existing product to get its ID using the slug from the URL
    const existingProduct = await getProductBySlug(slug);

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const body = await request.json();

    // Ensure numeric fields are parsed if they exist in the body
    const updates: Partial<Product> = {
      ...body,
      inventory: body.inventory !== undefined ? parseInt(body.inventory) : undefined,
    };
    
    // 3. Update using the Product ID (since the slug might not be unique/ideal for updates)
    const product = await updateProduct(existingProduct.id, updates);

    if (!product) {
      return NextResponse.json({ error: 'Product update failed' }, { status: 500 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('API PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
