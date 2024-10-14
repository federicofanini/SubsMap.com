import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createRouteHandlerClient({ cookies });

  try {
    // Fetch initial data
    const { data: expenses, error } = await supabase
      .from('StartupSubscription')
      .select('amount, monthly, annual')
      .eq('startupId', 'business')
      .eq('userId', user.id);

    if (error) throw error;

    // Calculate initial total
    const initialTotal = expenses.reduce((sum, expense) => {
      let annualAmount = expense.amount;
      if (expense.monthly) {
        annualAmount *= 12;
      } else if (!expense.annual) {
        // If it's neither monthly nor annual, assume it's a one-time expense
        annualAmount = expense.amount;
      }
      return sum + annualAmount;
    }, 0);

    // Set up real-time subscription
    const realtimeClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    let totalExpenses = initialTotal;

    const channel = realtimeClient
      .channel('business-expenses')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'StartupSubscription',
          filter: `startupId=eq.business AND userId=eq.${user.id}`,
        },
        (payload) => {
          const calculateAnnualAmount = (record: any) => {
            return record.monthly ? record.amount * 12 : (record.annual ? record.amount : record.amount);
          };

          if (payload.eventType === 'INSERT') {
            totalExpenses += calculateAnnualAmount(payload.new);
          } else if (payload.eventType === 'DELETE') {
            totalExpenses -= calculateAnnualAmount(payload.old);
          } else if (payload.eventType === 'UPDATE') {
            totalExpenses = totalExpenses - calculateAnnualAmount(payload.old) + calculateAnnualAmount(payload.new);
          }
          // You can emit this updated total to the client using a WebSocket or Server-Sent Events
          console.log('Updated total expenses:', totalExpenses);
        }
      )
      .subscribe();

    return NextResponse.json({ totalExpenses: initialTotal });
  } catch (error) {
    console.error('Error fetching business expenses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
