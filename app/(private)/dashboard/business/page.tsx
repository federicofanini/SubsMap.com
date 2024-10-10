"use client"

import React, { useState, useEffect } from 'react';
import TopBarMenu from '@/components/business/TopBarMenu';
import SummaryCards from '@/components/business/SummaryCards';
import StartupCard from '@/components/business/StartupCard';

interface Startup {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  websiteUrl: string | null;
  twitterUrl: string | null;
  githubUrl: string | null;
}

interface StripeData {
  sales: {
    total: number;
    currency: string;
    period: string;
  };
  monthlySales: {
    month: string;
    sales: number;
  }[];
}

interface ExpenseData {
  [key: string]: number;
}

const BusinessDashboard: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [stripeData, setStripeData] = useState<{ [key: string]: StripeData | null }>({});
  const [expenseData, setExpenseData] = useState<{ [key: string]: ExpenseData }>({});
  const [businessExpenses, setBusinessExpenses] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/startups/startupList');
        if (!response.ok) {
          throw new Error('Failed to fetch startups');
        }
        const data = await response.json();
        setStartups(data);

        // Fetch Stripe data and expenses for each startup
        const dataPromises = data.map(async (startup: Startup) => {
          const stripeResponse = await fetch(`/api/startups/statsCard/stripe`, {
            headers: {
              'X-Startup-Id': startup.id
            }
          });
          const expenseResponse = await fetch(`/api/startups/subscriptions/expensesChart`, {
            headers: {
              'X-Startup-Id': startup.id
            }
          });
          
          if (!stripeResponse.ok || !expenseResponse.ok) {
            console.error(`Failed to fetch data for startup ${startup.id}`);
            return [startup.id, null, null];
          }
          
          const stripeData = await stripeResponse.json();
          const expenseData = await expenseResponse.json();
          console.log(stripeData, expenseData)
          
          return [startup.id, stripeData, expenseData];
        });

        const results = await Promise.all(dataPromises);
        const stripeDataMap = Object.fromEntries(results.map(([id, stripe]) => [id, stripe]));
        const expenseDataMap = Object.fromEntries(results.map(([id, , expense]) => [id, expense]));
        
        setStripeData(stripeDataMap);
        setExpenseData(expenseDataMap);

        // Fetch business expenses
        const businessExpensesResponse = await fetch('/api/business/expenses/list');
        if (businessExpensesResponse.ok) {
          const businessExpensesData = await businessExpensesResponse.json();
          setBusinessExpenses(businessExpensesData.totalExpenses);
        } else {
          console.error('Failed to fetch business expenses');
        }
      } catch (error) {
        console.error('Error fetching startups:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStartups();
  }, []);

  const calculateMRR = (startupId: string) => {
    const stripe = stripeData[startupId];
    if (!stripe || !stripe.sales || !stripe.sales.total) return 0;

    const totalRevenue = stripe.sales.total;
    const mrr = totalRevenue / 12;
    return parseFloat(mrr.toFixed(2));
  };

  // Calculate aggregate data
  const aggregateData = {
    totalRevenue: startups.reduce((sum, startup) => {
      const stripe = stripeData[startup.id];
      return sum + (stripe?.sales?.total || 0);
    }, 0),
    totalExpenses: startups.reduce((sum, startup) => {
      const expense = expenseData[startup.id];
      return sum + (expense ? Object.values(expense).reduce((a, b) => a + b, 0) : 0);
    }, 0) + businessExpenses,
  };

  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-4 rounded-lg mt-4">
      {/* Top Bar menu */}
      <TopBarMenu />

      {/* Aggregate Summary Card */}
      <SummaryCards totalRevenue={aggregateData.totalRevenue} totalExpenses={aggregateData.totalExpenses} />

      {/* Startup Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {startups.map((startup) => (
          <StartupCard
            key={startup.id}
            startup={startup}
            stripeData={stripeData[startup.id]}
            expenseData={expenseData[startup.id]}
            calculateMRR={calculateMRR}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessDashboard;
