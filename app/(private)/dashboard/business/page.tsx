"use client"

import React from 'react';
import { TrendingDown, TrendingUp, ArrowRight, Globe, Twitter, Github, Plus, Edit } from "lucide-react"
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

// Mock data for startups
const mockStartups = [
  { id: 1, name: "TechInnovate", revenue: [10, 20, 15, 25, 30], expenses: [5, 10, 8, 12, 15], mrr: 30, websiteUrl: "https://techinnovate.com", twitterUrl: "https://twitter.com/techinnovate", githubUrl: "https://github.com/techinnovate" },
  { id: 2, name: "GreenEnergy", revenue: [5, 15, 25, 20, 35], expenses: [3, 8, 12, 10, 18], mrr: 35, websiteUrl: "https://greenenergy.com", twitterUrl: null, githubUrl: "https://github.com/greenenergy" },
  { id: 3, name: "HealthTech", revenue: [15, 25, 20, 30, 40], expenses: [8, 12, 10, 15, 20], mrr: 40, websiteUrl: null, twitterUrl: "https://twitter.com/healthtech", githubUrl: null },
  { id: 4, name: "AIAssist", revenue: [20, 30, 25, 35, 45], expenses: [10, 15, 12, 18, 22], mrr: 45, websiteUrl: "https://aiassist.com", twitterUrl: "https://twitter.com/aiassist", githubUrl: "https://github.com/aiassist" },
  { id: 5, name: "FinTech", revenue: [25, 35, 30, 40, 50], expenses: [12, 18, 15, 20, 25], mrr: 50, websiteUrl: "https://fintech.com", twitterUrl: null, githubUrl: null },
  { id: 6, name: "EduTech", revenue: [8, 18, 28, 23, 38], expenses: [4, 9, 14, 11, 19], mrr: 38, websiteUrl: "https://edutech.com", twitterUrl: "https://twitter.com/edutech", githubUrl: "https://github.com/edutech" },
];

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
  // Calculate aggregate data
  const aggregateData = months.map((_, index) => ({
    month: months[index],
    revenue: mockStartups.reduce((sum, startup) => sum + startup.revenue[index], 0),
    expenses: mockStartups.reduce((sum, startup) => sum + startup.expenses[index], 0),
  }));

  const totalMRR = mockStartups.reduce((sum, startup) => sum + startup.mrr, 0);
  const lastMonthTotalRevenue = aggregateData[aggregateData.length - 1].revenue;
  const lastMonthTotalExpenses = aggregateData[aggregateData.length - 1].expenses;

  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Startup Portfolio</h2>
        <div className="space-x-2">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Startup</span>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Edit className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Edit Startups</span>
          </Button>
          <Button variant="outline" size="sm" className="sm:hidden">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="sm:hidden">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Aggregate Summary Card 
      <Card className="bg-gray-900 border-gray-800 rounded-md relative mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center text-sm">
            <span className="font-bold">Portfolio Summary</span>
            <Badge variant="outline" className="font-bold">
              💰 Total MRR: ${totalMRR}k
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <ChartContainer config={chartConfig} className="h-32">
            <AreaChart
              accessibilityLayer
              data={aggregateData}
              margin={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="expenses"
                type="monotone"
                fill={chartConfig.expenses.color}
                fillOpacity={0.4}
                stroke={chartConfig.expenses.color}
                strokeWidth={2}
              />
              <Area
                dataKey="revenue"
                type="monotone"
                fill={chartConfig.revenue.color}
                fillOpacity={0.4}
                stroke={chartConfig.revenue.color}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex w-full justify-between items-start text-xs font-bold">
            <div className="flex items-center gap-2 font-medium text-green-500">
              <TrendingUp className="h-4 w-4 text-green-400" />
              Revenue: ${lastMonthTotalRevenue}k
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <TrendingDown className="h-4 w-4 text-red-400" />
              Expenses: ${lastMonthTotalExpenses}k
            </div>
          </div>
        </CardFooter>
      </Card>
      */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockStartups.map((startup) => {
          const chartData = startup.revenue.map((r, i) => ({
            month: months[i],
            revenue: r,
            expenses: startup.expenses[i],
          }));

          const lastMonthRevenue = startup.revenue[startup.revenue.length - 1];
          const lastMonthExpenses = startup.expenses[startup.expenses.length - 1];

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
                    💰 MRR: ${startup.mrr}k
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Financial overview for the last 5 months
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
        })}
      </div>
    </div>
  );
};

export default BusinessDashboard;
