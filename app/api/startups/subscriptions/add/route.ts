import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      brand, 
      day, 
      month, 
      amount, 
      currency, 
      billingCycle,
      note,
      startupId
    } = body;

    const newSubscription = await prisma.startupSubscription.create({
      data: {
        brand,
        day,
        month,
        amount,
        currency,
        monthly: billingCycle === 'monthly',
        annual: billingCycle === 'annual',
        note,
        startupId,
        userId: user.id
      }
    });

    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error) {
    console.error('Error adding startup subscription:', error);
    return NextResponse.json({ error: 'Failed to add startup subscription' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
