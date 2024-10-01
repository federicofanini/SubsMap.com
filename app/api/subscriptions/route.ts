import { NextResponse } from 'next/server';
import { addSubscription } from '@/lib/CRUD/subs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await addSubscription(body);

    if (result.success) {
      return NextResponse.json(result.subscription, { status: 201 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in POST /api/subscription:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
