"use client"

import React, { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, ArrowRight, Globe, Twitter, Github, Plus, Edit, Trash2 } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

interface Startup {
  id: string;
  name: string;
  description: string;
  websiteUrl: string | null;
  twitterUrl: string | null;
  githubUrl: string | null;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May"];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Expenses",
    color: "#fa4343d9",
  },
} satisfies ChartConfig

const BusinessDashboard: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
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
      } catch (error) {
        console.error('Error fetching startups:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStartups();
  }, []);

  // Mock data for financial information
  const mockFinancialData = (id: string) => ({
    revenue: [10, 20, 15, 25, 30],
    expenses: [5, 10, 8, 12, 15],
    mrr: 30,
  });

  // Calculate aggregate data
  const aggregateData = months.map((_, index) => ({
    month: months[index],
    revenue: startups.reduce((sum, startup) => sum + mockFinancialData(startup.id).revenue[index], 0),
    expenses: startups.reduce((sum, startup) => sum + mockFinancialData(startup.id).expenses[index], 0),
  }));

  const totalMRR = startups.reduce((sum, startup) => sum + mockFinancialData(startup.id).mrr, 0);
  const lastMonthTotalRevenue = aggregateData[aggregateData.length - 1].revenue;
  const lastMonthTotalExpenses = aggregateData[aggregateData.length - 1].expenses;

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
      {/* ... (keep the existing aggregate summary card code) ... */}

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
        ) : (
          startups.map((startup) => {
            const mockData = mockFinancialData(startup.id);
            const chartData = mockData.revenue.map((r, i) => ({
              month: months[i],
              revenue: r,
              expenses: mockData.expenses[i],
            }));

            const lastMonthRevenue = mockData.revenue[mockData.revenue.length - 1];
            const lastMonthExpenses = mockData.expenses[mockData.expenses.length - 1];

            return (
              <Card key={startup.id} className="bg-gray-900 border-gray-800 rounded-md relative">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
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
                      💰 MRR: ${mockData.mrr}k
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {startup.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <AreaChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Area
                        dataKey="expenses"
                        type="natural"
                        fill={chartConfig.expenses.color}
                        fillOpacity={0.4}
                        stroke={chartConfig.expenses.color}
                        stackId="a"
                      />
                      <Area
                        dataKey="revenue"
                        type="natural"
                        fill={chartConfig.revenue.color}
                        fillOpacity={0.4}
                        stroke={chartConfig.revenue.color}
                        stackId="a"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <div className="flex w-full justify-between items-start text-xs font-bold">
                    <div className="flex items-center gap-2 font-medium text-green-500">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      Revenue: ${lastMonthRevenue}k
                    </div>
                    <div className="flex items-center gap-2 text-red-400">
                      <TrendingDown className="h-4 w-4 text-red-400" />
                      Expenses: ${lastMonthExpenses}k
                    </div>
                  </div>
                  
                </CardFooter>
                <div className="flex justify-end pl-5 pr-5 pb-2">
                  <Button variant="outline" className="w-full">
                    <Link href={`/dashboard/business/${startup.id}`} className="flex items-center gap-2">
                      Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
