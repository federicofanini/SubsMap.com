"use client"

import React, { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, ArrowRight, Globe, Twitter, Github, Plus, Edit, Trash2, Calendar, DollarSign, CoinsIcon } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";
import MonthlyCalendar from '@/components/business/MonthlyCalendar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

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

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#22c55e", // green-500
  },
  expenses: {
    label: "Expenses",
    color: "#fa4343d9",
  },
} satisfies ChartConfig

const BusinessDashboard: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [stripeData, setStripeData] = useState<{ [key: string]: StripeData | null }>({});
  const [expenseData, setExpenseData] = useState<{ [key: string]: ExpenseData }>({});
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
    }, 0),
  };

  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Startup Portfolio</h2>
        <div className="space-x-2">
          <Link href="/dashboard/business/add">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Startup</span>
            </Button>
          </Link>
          <Link href="/dashboard/business/delete">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Trash2 className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Delete Startup</span>
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="sm:hidden">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="sm:hidden">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Aggregate Summary Card */}
      <Card className="bg-gray-900 border-gray-800 rounded-md mb-4">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-4 sm:gap-44">
            Portfolio Summary
            <Badge variant="secondary">💰 MRR: ${(aggregateData.totalRevenue / 12).toFixed(2)}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm font-semibold text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-green-500">${aggregateData.totalRevenue.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-red-500">-${aggregateData.totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 rounded-md relative">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-1/4" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-full" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full" />
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <div className="flex w-full justify-between items-start">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </CardFooter>
              <div className="flex justify-end pl-5 pr-5 pb-2">
                <Skeleton className="h-8 w-full" />
              </div>
            </Card>
          ))
        ) : startups.length === 0 ? (
          <Card className="col-span-full bg-gray-900 border-gray-800 border-dashed rounded-md relative p-8 flex flex-col items-center justify-center">
            <Plus className="h-12 w-12 text-gray-500 mb-4" />
            <CardTitle className="text-xl font-bold text-gray-500 mb-2">No startups yet</CardTitle>
            <CardDescription className="text-gray-400 text-center mb-4">
              Add your first startup to get started
            </CardDescription>
            <Link href="/dashboard/business/add">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Startup
              </Button>
            </Link>
          </Card>
        ) : (
          startups.map((startup) => {
            const stripe = stripeData[startup.id];
            const expense = expenseData[startup.id];
            const mrr = calculateMRR(startup.id);

            const chartData = months.map((month) => ({
              month,
              sales: stripe?.monthlySales?.find(s => s.month.includes(month))?.sales || 0,
              expenses: expense?.[month] || 0,
            }));

            return (
              <Card key={startup.id} className="bg-gray-900 border-gray-800 rounded-md relative">
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
                      MRR: ${mrr}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs font-semibold">
                    {startup.description}
                  </CardDescription>
                  <Separator className="mb-2 mt-2" />
                </CardHeader>
                <CardContent>
                  <h3 className="text-xs font-semibold mb-2 text-muted-foreground">
                    Revenues & Expenses
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
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Card className="p-2 bg-gray-800 rounded-md">
                      <CardHeader className="p-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground">Total Revenue</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 pt-1">
                        <p className="text-sm font-bold">
                          ${stripe?.sales?.total || 0} {stripe?.sales?.currency}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="p-2 bg-gray-800 rounded-md">
                      <CardHeader className="p-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground">Total Expenses</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 pt-1">
                        <p className="text-sm font-bold">
                          -${expense ? Object.values(expense).reduce((a, b) => a + b, 0) : 0}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link href={`/dashboard/business/${startup.id}`} className="flex items-center gap-2">
                      Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
