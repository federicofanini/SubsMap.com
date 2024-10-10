import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data: expenses, error } = await supabase
      .from('StartupSubscription')
      .select('*')
      .eq('startupId', 'business')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) throw error;

    // Set up real-time subscription
    const realtimeClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const channel = realtimeClient
      .channel('business-expenses')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'StartupSubscription',
          filter: `startupId=eq.business AND userId=eq.${userId}`,
        },
        (payload) => {
          console.log('Change received!', payload);
        }
      )
      .subscribe();

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching business expenses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
