import { NextResponse } from 'next/server';
import { calculateMonthlySpending } from '@/lib/CRUD/subs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get('currency') as 'EUR' | 'USD' | null;

  try {
    const result = await calculateMonthlySpending(currency || 'EUR');

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in monthly expense calculation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
