import { NextResponse } from 'next/server';
import { deleteSubscription } from '@/lib/CRUD/subs';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get('id');

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }

    const result = await deleteSubscription(subscriptionId);

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in DELETE /api/subscriptions/delete:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
