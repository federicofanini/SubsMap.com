import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from '@/lib/db';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const startupId = req.headers.get('X-Startup-Id');
    if (!startupId) {
      return NextResponse.json({ error: 'Startup ID is required' }, { status: 400 });
    }

    const subscriptions = await prisma.startupSubscription.findMany({
      where: {
        startupId: startupId,
        userId: user.id,
      },
    });

    const monthlyExpenses: { [key: string]: number } = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
    };

    subscriptions.forEach(sub => {
      const amount = Number(sub.amount);
      if (sub.monthly) {
        // Add monthly amount to all months
        Object.keys(monthlyExpenses).forEach(month => {
          monthlyExpenses[month] += amount;
        });
      } else if (sub.annual) {
        // Add annual amount to the renewal month
        const renewalMonth = sub.month ? sub.month - 1 : 0; // Adjust for 0-based index
        const monthName = Object.keys(monthlyExpenses)[renewalMonth];
        monthlyExpenses[monthName] += amount;
      }
    });

    // Set up real-time subscription
    const realtimeClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const channel = realtimeClient
      .channel('expenses-chart')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'StartupSubscription',
          filter: `startupId=eq.${startupId} AND userId=eq.${user.id}`,
        },
        (payload) => {
          console.log('Change received in expenses chart!', payload);
        }
      )
      .subscribe();

    return NextResponse.json(monthlyExpenses);
  } catch (error) {
    console.error('Error fetching expenses chart data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
