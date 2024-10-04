"use client"

import * as React from "react"
import { TrendingUp, Loader2 } from "lucide-react"
import { Label, Pie, PieChart, Cell } from "recharts"

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
import { toast } from 'sonner'

type Subscription = {
  id: string;
  brand: string;
  amount: string;
  currency: string;
  day: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  note: string | null;
};

const SubPie: React.FC = () => {
  const [subscriptions, setSubscriptions] = React.useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscriptions/getSubs');
      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }
      const data = await response.json();
      setSubscriptions(data);
      console.log('Subscriptions fetched:', data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to fetch subscriptions');
    } finally {
      setIsLoading(false);
    }
  };

  const chartColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
  ];

  const chartData = React.useMemo(() => {
    return subscriptions.map((sub, index) => ({
      brand: sub.brand,
      amount: parseFloat(sub.amount),
      fill: chartColors[index % chartColors.length]
    }));
  }, [subscriptions]);

  const chartConfig: ChartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      amount: { label: "Amount" },
    };
    subscriptions.forEach((sub, index) => {
      config[sub.brand] = {
        label: sub.brand,
        color: chartColors[index % chartColors.length],
      };
    });
    return config;
  }, [subscriptions]);

  const totalSpending = React.useMemo(() => {
    return subscriptions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  }, [subscriptions]);

  if (isLoading) {
    return (
      <Card className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="mt-2 text-sm text-gray-400">Loading subscriptions...</p>
      </Card>
    );
  }

  if (subscriptions.length === 0) {
    return <Card className="flex items-center justify-center h-64"><p>No subscriptions found.</p></Card>;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Subscriptions</CardTitle>
        <CardDescription>Distribution of your subscriptions</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="brand"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          €{totalSpending.toFixed(2)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Monthly
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {subscriptions.length} active subscriptions <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total monthly spending
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubPie;
