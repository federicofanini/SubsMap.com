"use client"

import React from 'react';
import { TrendingDown, TrendingUp } from "lucide-react"
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

// Mock data for startups
const mockStartups = [
  { id: 1, name: "TechInnovate", revenue: [10, 20, 15, 25, 30], expenses: [5, 10, 8, 12, 15], mrr: 30 },
  { id: 2, name: "GreenEnergy", revenue: [5, 15, 25, 20, 35], expenses: [3, 8, 12, 10, 18], mrr: 35 },
  { id: 3, name: "HealthTech", revenue: [15, 25, 20, 30, 40], expenses: [8, 12, 10, 15, 20], mrr: 40 },
  { id: 4, name: "AIAssist", revenue: [20, 30, 25, 35, 45], expenses: [10, 15, 12, 18, 22], mrr: 45 },
  { id: 5, name: "FinTech", revenue: [25, 35, 30, 40, 50], expenses: [12, 18, 15, 20, 25], mrr: 50 },
  { id: 6, name: "EduTech", revenue: [8, 18, 28, 23, 38], expenses: [4, 9, 14, 11, 19], mrr: 38 },
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
  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-4 rounded-lg mt-4">
      <h2 className="text-2xl font-bold mb-4">Startup Portfolio</h2>
      <div className="grid grid-cols-2 gap-4">
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
                  <span>{startup.name}</span>
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
              <CardFooter>
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
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessDashboard;
