import React from 'react';
import Link from 'next/link';
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import { Globe, Twitter, Github, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface StartupCardProps {
  startup: {
    id: string;
    name: string;
    description: string;
    imageUrl: string | null;
    websiteUrl: string | null;
    twitterUrl: string | null;
    githubUrl: string | null;
  };
  stripeData: {
    sales: {
      total: number;
      currency: string;
    };
    monthlySales: {
      month: string;
      sales: number;
    }[];
  } | null;
  expenseData: {
    [key: string]: number;
  } | null;
  calculateMRR: (startupId: string) => number;
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

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const StartupCard: React.FC<StartupCardProps> = ({ startup, stripeData, expenseData, calculateMRR }) => {
  const mrr = calculateMRR(startup.id);

  const chartData = months.map((month) => ({
    month,
    sales: stripeData?.monthlySales?.find(s => s.month.includes(month))?.sales || 0,
    expenses: expenseData?.[month] || 0,
  }));

  return (
    <Card className="bg-gray-900 border-gray-800 rounded-md relative">
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
                ${stripeData?.sales?.total || 0} {stripeData?.sales?.currency}
              </p>
            </CardContent>
          </Card>
          <Card className="p-2 bg-gray-800 rounded-md">
            <CardHeader className="p-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-1">
              <p className="text-sm font-bold">
                -${expenseData ? Object.values(expenseData).reduce((a, b) => a + b, 0) : 0}
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
};

export default StartupCard;
