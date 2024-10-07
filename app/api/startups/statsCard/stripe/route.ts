import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export async function GET(request: Request) {
  try {
    // Get the user ID from Kinde Auth
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the startupId from the request headers
    const startupId = request.headers.get('X-Startup-Id');

    if (!startupId) {
      return NextResponse.json({ error: 'Startup ID is required' }, { status: 400 });
    }

    // Fetch the Stripe API key from the database
    const startup = await prisma.startup.findFirst({
      where: {
        id: startupId,
        userId: user.id,
      },
      select: {
        apiKey: true,
      },
    });

    if (!startup || !startup.apiKey) {
      return NextResponse.json({ error: 'Stripe API key not found' }, { status: 404 });
    }

    // Initialize Stripe with the fetched API key
    const stripe = new Stripe(startup.apiKey, {
      apiVersion: '2024-09-30.acacia', // Use a valid API version
    });

    // Fetch connected accounts (the API key is restricted to read-only "All Connect resources")
    const connectedAccounts = await stripe.accounts.list();

    // Fetch balance
    const balance = await stripe.balance.retrieve();

    // Fetch monthly sales for the last 6 months
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 5); // Go back 5 months to get 6 months of data

    const monthlySales = [];
    for (let i = 0; i < 6; i++) {
      const month = new Date(startDate);
      month.setMonth(month.getMonth() + i);
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const charges = await stripe.charges.list({
        created: {
          gte: Math.floor(startOfMonth.getTime() / 1000),
          lte: Math.floor(endOfMonth.getTime() / 1000),
        },
      });

      const totalSales = charges.data.reduce((sum, charge) => {
        if (charge.status === 'succeeded') {
          return sum + charge.amount;
        }
        return sum;
      }, 0);

      monthlySales.push({
        month: month.toLocaleString('default', { month: 'short', year: 'numeric' }),
        sales: totalSales / 100, // Convert from cents to dollars
      });
    }

    // Prepare the response
    const response = {
      connectedAccounts: connectedAccounts.data,
      balance: {
        available: balance.available,
        pending: balance.pending,
      },
      sales: {
        total: monthlySales.reduce((sum, month) => sum + month.sales, 0),
        currency: 'USD', // Assuming USD as default currency
        period: 'All time',
      },
      monthlySales: monthlySales,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching Stripe data:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
