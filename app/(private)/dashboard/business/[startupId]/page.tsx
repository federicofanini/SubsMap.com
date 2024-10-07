'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { TrendingUp, Globe, Twitter, Github, Trash2, Edit } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";
import { StartupSub } from "@/components/business/StartupSub";
import StartupSubTable from "@/components/business/StartupSubTable";
import { Separator } from "@/components/ui/separator";
import { BrandIcons } from "@/components/sub/BrandIcons";

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
  balance: {
    available: { amount: number; currency: string }[];
    pending: { amount: number; currency: string }[];
  };
  connectedAccounts: {
    id: string;
    business_profile: { name: string };
  }[];
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

interface Subscription {
  amount: number;
  currency: string;
  isMonthly: boolean;
}

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#22c55e", // green-500
  },
  expenses: {
    label: "Expenses",
    color: "#fa4343d9",
  },
} satisfies ChartConfig;

export default function StartupDetailsPage() {
  const { startupId } = useParams();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [stripeData, setStripeData] = useState<StripeData | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const startupResponse = await fetch('/api/startups/startupList');
        if (!startupResponse.ok) {
          throw new Error('Failed to fetch startups');
        }
        const startups: Startup[] = await startupResponse.json();
        const foundStartup = startups.find(s => s.id === startupId);
        setStartup(foundStartup || null);

        const stripeResponse = await fetch(`/api/startups/statsCard/stripe`, {
          headers: {
            'X-Startup-Id': startupId as string
          }
        });
        if (stripeResponse.ok) {
          const data: StripeData = await stripeResponse.json();
          setStripeData(data);
        }

        const subscriptionsResponse = await fetch(`/api/startups/subscriptions/list?startupId=${startupId}`);
        if (subscriptionsResponse.ok) {
          const subscriptionsData: Subscription[] = await subscriptionsResponse.json();
          setSubscriptions(subscriptionsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (startupId) {
      fetchData();
    }
  }, [startupId]);

  const generateLast12MonthsData = () => {
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push({
        month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
        sales: 0,
        expenses: 0
      });
    }
    return months;
  };

  const calculateMonthlyExpenses = () => {
    return subscriptions.reduce((total, sub) => {
      return total + sub.amount;
    }, 0);
  };

  const chartData = stripeData?.monthlySales?.slice(-12).map(data => ({
    ...data,
    expenses: calculateMonthlyExpenses()
  })) || generateLast12MonthsData();

  const formatMonth = (value: string) => {
    const date = new Date(value);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[date.getMonth()];
  };

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg mt-4">
        <Skeleton className="h-8 w-1/3 bg-gray-700 mb-4" />
        <Card className="bg-gray-900 border-gray-800 rounded-md relative">
          <CardHeader>
            <Skeleton className="h-6 w-2/3 bg-gray-700" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full bg-gray-700" />
            <Skeleton className="h-[300px] w-full bg-gray-700 mt-4" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
              <Skeleton className="h-4 w-2/3 bg-gray-700" />
              <Skeleton className="h-4 w-1/3 bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">Startup not found</h2>
      </div>
    );
  }

  return (
    <div className="mt-4">      
      <Card className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="size-5">
                <AvatarImage src={startup.imageUrl || undefined} alt={startup.name} />
                <AvatarFallback>{startup.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-bold text-sm">{startup.name}</span>
              {startup.websiteUrl && (
                <a href={startup.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 text-slate-400" />
                </a>
              )}
              {startup.twitterUrl && (
                <a href={startup.twitterUrl} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 text-slate-400" />
                </a>
              )}
              {startup.githubUrl && (
                <a href={startup.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 text-slate-400" />
                </a>
              )}
            </div>
            <Badge variant="outline" className="font-bold">
              MRR:
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs font-semibold">{startup.description}</CardDescription>
          <Separator className="mb-2 mt-2" />
        </CardHeader>
        <CardContent>
          
          <h3 className="text-xs font-semibold mb-2 text-muted-foreground flex items-center gap-1">
            <BrandIcons.Stripe.icon className="size-5" />
            Financials
          </h3>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={chartData}
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => formatMonth(value)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="expenses"
                  fill={chartConfig.expenses.color}
                  radius={4}
                />
                <Bar
                  dataKey="sales"
                  fill={chartConfig.sales.color}
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          {stripeData && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Card className="p-2 bg-gray-800 rounded-md">
                <CardHeader className="p-0">
                  <CardTitle className="text-xs font-semibold text-muted-foreground">Available Balance</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-1">
                  <p className="text-sm font-bold">
                    {stripeData.balance.available.map(b => `${b.amount / 100} ${b.currency.toUpperCase()}`).join(', ')}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-2 bg-gray-800 rounded-md">
                <CardHeader className="p-0">
                  <CardTitle className="text-xs font-semibold text-muted-foreground">Pending Balance</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-1">
                  <p className="text-sm font-bold">
                    {stripeData.balance.pending.map(b => `${b.amount / 100} ${b.currency.toUpperCase()}`).join(', ')}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-2 bg-gray-800 rounded-md">
                <CardHeader className="p-0">
                  <CardTitle className="text-xs font-semibold text-muted-foreground">Total Sales</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-1">
                  <p className="text-sm font-bold">
                    {stripeData.sales.total} {stripeData.sales.currency}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-2 bg-gray-800 rounded-md">
                <CardHeader className="p-0">
                  <CardTitle className="text-xs font-semibold text-muted-foreground">Sales Period</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-1">
                  <p className="text-sm font-bold">
                    {stripeData.sales.period}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <StartupSub onNewSubscription={() => {}} startupId={startupId as string} />

    </div>
  );
}
