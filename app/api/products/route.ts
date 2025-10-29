import { NextRequest, NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/lib/db';
import { Product } from '@/types/product';

// GET /api/products - Fetch all products
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Add a new product (Protected)
export async function POST(request: NextRequest) {
  try {
    // 1. Mock Authentication Check 
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Process Data
    const body = await request.json();
    const newProduct: Product = {
      id: Date.now().toString(), // Simple unique ID
      name: body.name,
      slug: body.name.toLowerCase().replace(/\s+/g, '-'),
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      inventory: parseInt(body.inventory),
      lastUpdated: new Date().toISOString()
    };

    // 3. Save to DB
    const product = await addProduct(newProduct);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}