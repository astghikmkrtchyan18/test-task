import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email === 'manager@example.com' && password === '1234') {
    return NextResponse.json({
      token: 'fake-manager-token',
      role: 'Manager',
    });
  }

  if (email === 'store@example.com' && password === '1234') {
    return NextResponse.json({
      token: 'fake-storekeeper-token',
      role: 'StoreKeeper',
    });
  }

  return NextResponse.json(
    { message: 'Invalid email or password' },
    { status: 401 }
  );
}
