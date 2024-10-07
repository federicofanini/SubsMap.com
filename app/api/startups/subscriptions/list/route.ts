import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startupId = searchParams.get('startupId');

    if (!startupId) {
      return NextResponse.json({ error: 'Startup ID is required' }, { status: 400 });
    }

    const startupSubscriptions = await prisma.startupSubscription.findMany({
      where: {
        userId: user.id,
        startupId: startupId
      }
    });

    const startup = await prisma.startup.findUnique({
      where: { id: startupId },
      select: { name: true }
    });

    if (!startup) {
      return NextResponse.json({ error: 'Startup not found' }, { status: 404 });
    }

    const formattedSubscriptions = startupSubscriptions.map(sub => ({
      id: sub.id,
      startupName: startup.name,
      amount: sub.amount,
      brand: sub.brand,
      currency: sub.currency,
      day: sub.day,
      month: sub.month,
      isMonthly: sub.monthly,
      isAnnual: sub.annual
    }));

    return NextResponse.json(formattedSubscriptions);
  } catch (error) {
    console.error('Error fetching startup subscriptions:', error);
    return NextResponse.json({ error: 'Failed to fetch startup subscriptions' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

