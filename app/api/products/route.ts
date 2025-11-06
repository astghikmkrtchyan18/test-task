import { NextResponse } from 'next/server';

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
};

let products: Product[] = [
  { id: 1, name: 'Laptop', description: 'A cool laptop', category: 'Electronics', price: 1200 },
  { id: 2, name: 'Phone', description: 'Smartphone', category: 'Electronics', price: 800 },
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, category, price } = body;

    if (!name || !description || !category || typeof price !== 'number') {
      return NextResponse.json({ message: 'Missing or invalid fields' }, { status: 400 });
    }

    const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct: Product = { id, name, description, category, price };
    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error('POST /api/products error', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, category, price } = body;
    if (!id) return NextResponse.json({ message: 'Missing id' }, { status: 400 });

    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    products[idx] = { id, name, description, category, price };
    return NextResponse.json(products[idx]);
  } catch (err) {
    console.error('PUT /api/products error', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
