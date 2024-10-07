import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from '@/lib/db';

export async function DELETE(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get('id');

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }

    const subscription = await prisma.startupSubscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    if (subscription.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized to delete this subscription' }, { status: 403 });
    }

    await prisma.startupSubscription.delete({
      where: { id: subscriptionId },
    });

    return NextResponse.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting startup subscription:', error);
    return NextResponse.json({ error: 'Failed to delete startup subscription' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
