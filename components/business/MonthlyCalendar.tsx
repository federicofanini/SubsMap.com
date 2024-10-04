"use client"

import React, { useState, useEffect } from 'react';
import { format, startOfYear, eachMonthOfInterval, isSameMonth } from 'date-fns';
import { Bar, BarChart, Rectangle, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: Date;
};

const MonthlyCalendar: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Generate mock data
    const mockTransactions: Transaction[] = [];
    for (let i = 0; i < 50; i++) {
      mockTransactions.push({
        id: `transaction-${i}`,
        type: Math.random() > 0.5 ? 'income' : 'expense',
        amount: Math.floor(Math.random() * 1000) + 100,
        description: `Transaction ${i}`,
        date: new Date(currentYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      });
    }
    setTransactions(mockTransactions);
  }, [currentYear]);

  const renderMonth = (month: Date) => {
    const monthTransactions = transactions.filter(t => isSameMonth(t.date, month));
    const totalIncome = monthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = monthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netAmount = totalIncome - totalExpense;

    const dailyData = Array.from({ length: 7 }, (_, i) => ({
      date: format(new Date(month.getFullYear(), month.getMonth(), i + 1), 'yyyy-MM-dd'),
      amount: Math.floor(Math.random() * 1000),
    }));

    return (
      <Card key={month.toString()} className="max-w-xs rounded-md">
        <CardHeader className="p-4 pb-0">
          <CardTitle>{format(month, 'MMMM')}</CardTitle>
          <CardDescription>
            Net amount for the month: ${netAmount.toFixed(2)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
          <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
            {Math.abs(netAmount).toFixed(2)}
            <span className="text-sm font-normal text-muted-foreground">
              {netAmount >= 0 ? 'profit' : 'loss'}
            </span>
          </div>
          <ChartContainer
            config={{
              amount: {
                label: "Amount",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="ml-auto w-[72px]"
          >
            <BarChart
              accessibilityLayer
              margin={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
              data={dailyData}
            >
              <Bar
                dataKey="amount"
                fill="var(--color-amount)"
                radius={2}
                fillOpacity={0.2}
                activeIndex={6}
                activeBar={<Rectangle fillOpacity={0.8} />}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                hide
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  };

  const months = eachMonthOfInterval({
    start: startOfYear(new Date(currentYear, 0, 1)),
    end: new Date(currentYear, 11, 31)
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{currentYear} Business Calendar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        {months.map(renderMonth)}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
