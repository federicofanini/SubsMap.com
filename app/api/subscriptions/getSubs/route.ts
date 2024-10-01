import { NextResponse } from 'next/server';
import { fetchUserSubscriptions } from '@/lib/CRUD/subs';

export async function GET() {
  try {
    const result = await fetchUserSubscriptions();

    if (result.success) {
      return NextResponse.json(result.subscriptions, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in GET /api/subscriptions/getSubs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
