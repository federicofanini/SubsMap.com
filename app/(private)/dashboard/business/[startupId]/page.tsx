'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Globe, Twitter, Github,} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StartupSub } from "@/components/business/StartupSub";
import { Separator } from "@/components/ui/separator";
import { BrandIcons } from "@/components/sub/BrandIcons";
import StartupSubTable from "@/components/business/StartupSubTable";

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

interface MonthlyExpenses {
  [key: string]: number;
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
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpenses | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newSubscriptionAdded, setNewSubscriptionAdded] = useState(false);

  const fetchData = useCallback(async () => {
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

      const expensesResponse = await fetch(`/api/startups/subscriptions/expensesChart`, {
        headers: {
          'X-Startup-Id': startupId as string
        }
      });
      if (expensesResponse.ok) {
        const expensesData: MonthlyExpenses = await expensesResponse.json();
        setMonthlyExpenses(expensesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [startupId]);

  useEffect(() => {
    if (startupId) {
      fetchData();
    }
  }, [startupId, fetchData]);

  const generateChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      sales: stripeData?.monthlySales?.find(s => s.month.includes(month))?.sales || 0,
      expenses: monthlyExpenses?.[month] || 0
    }));
  };

  const chartData = generateChartData();

  const handleNewSubscription = () => {
    setNewSubscriptionAdded(prev => !prev);
    fetchData();
  };

  const handleSubscriptionDelete = () => {
    fetchData();
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
            <Badge variant="outline" className="font-bold gap-2">
              MRR: {stripeData?.sales.total ? (stripeData.sales.total / 12).toFixed(2) : 0} {stripeData?.sales.currency}
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs font-semibold">{startup.description}</CardDescription>
          <Separator className="mb-2 mt-2" />
        </CardHeader>
        <CardContent>
          
          <h3 className="text-xs font-semibold mb-2 text-muted-foreground flex items-center gap-1">
            
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
        <CardFooter className="flex justify-center items-center gap-2 text-[9px] font-semibold text-muted-foreground">
          Powered by <BrandIcons.Stripe.icon className="size-6" />
        </CardFooter>
      </Card>

      <StartupSub onNewSubscription={handleNewSubscription} startupId={startupId as string} />
      <StartupSubTable startupId={startupId as string} onDelete={handleSubscriptionDelete} newSubscriptionAdded={newSubscriptionAdded} />

    </div>
  );
}
