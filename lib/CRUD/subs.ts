import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eurToUsd, usdToEur } from "@/lib/eurusd";
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const subSchema = z.object({
  brand: z.string().min(1),
  day: z.number().int().min(1).max(31),
  amount: z.number().positive(),
  currency: z.enum(["EUR", "USD"]),
  note: z.string().optional(),
});

export async function addSubscription(data: z.infer<typeof subSchema>) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }

    const validatedData = subSchema.parse(data);

    const subscription = await prisma.subscription.create({
      data: {
        ...validatedData,
        userId: user.id,
      },
    });

    // Set up real-time subscription
    const realtimeClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const channel = realtimeClient
      .channel('subscriptions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Subscription',
          filter: `userId=eq.${user.id}`,
        },
        (payload) => {
          console.log('New subscription added:', payload);
        }
      )
      .subscribe();

    return { success: true, subscription };
  } catch (error) {
    console.error('❌ Error adding subscription:', error);
    return { success: false, error: '❌ Failed to add subscription' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteSubscription(subscriptionId: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    if (subscription.userId !== user.id) {
      throw new Error('Unauthorized to delete this subscription');
    }

    await prisma.subscription.delete({
      where: { id: subscriptionId },
    });

    // Set up real-time subscription
    const realtimeClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const channel = realtimeClient
      .channel('subscriptions')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'Subscription',
          filter: `id=eq.${subscriptionId}`,
        },
        (payload) => {
          console.log('Subscription deleted:', payload);
        }
      )
      .subscribe();

    return { success: true, message: 'Subscription deleted successfully' };
  } catch (error) {
    console.error('❌ Error deleting subscription:', error);
    return { success: false, error: '❌ Failed to delete subscription' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchUserSubscriptions() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: user.id },
    });

    // Set up real-time subscription
    const realtimeClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const channel = realtimeClient
      .channel('subscriptions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Subscription',
          filter: `userId=eq.${user.id}`,
        },
        (payload) => {
          console.log('Subscription change:', payload);
        }
      )
      .subscribe();

    return { success: true, subscriptions };
  } catch (error) {
    console.error('❌ Error fetching user subscriptions:', error);
    return { success: false, error: '❌ Failed to fetch user subscriptions' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function calculateMonthlySpending(currency: 'EUR' | 'USD' = 'EUR') {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: user.id },
      select: { amount: true, currency: true },
    });

    let totalEUR = 0;
    let totalUSD = 0;

    subscriptions.forEach(sub => {
      if (sub.currency === 'EUR') {
        totalEUR += Number(sub.amount);
      } else if (sub.currency === 'USD') {
        totalUSD += Number(sub.amount);
      }
    });

    let finalTotal: number;

    if (currency === 'EUR') {
      finalTotal = totalEUR + usdToEur(totalUSD);
    } else {
      finalTotal = eurToUsd(totalEUR) + totalUSD;
    }

    // Set up real-time subscription
    const realtimeClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const channel = realtimeClient
      .channel('monthly-spending')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Subscription',
          filter: `userId=eq.${user.id}`,
        },
        (payload) => {
          console.log('Monthly spending change:', payload);
        }
      )
      .subscribe();

    return { success: true, total: Number(finalTotal.toFixed(2)), currency };
  } catch (error) {
    console.error('❌ Error calculating monthly spending:', error);
    return { success: false, error: '❌ Failed to calculate monthly spending' };
  } finally {
    await prisma.$disconnect();
  }
}
