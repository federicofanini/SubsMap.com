import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const count = await prisma.user.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Error counting users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
