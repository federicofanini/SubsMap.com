"use client"

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { BrandIcons } from '@/components/sub/BrandIcons';
import { Trash2, PieChart } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Subscription = {
  name: keyof typeof BrandIcons;
  amount: number;
  currency: string;
  nextPaymentDay: number;
};

const subscriptions: Subscription[] = [
  { name: 'Netflix', amount: 14.99, currency: 'EUR', nextPaymentDay: 7 },
  { name: 'Spotify', amount: 9.99, currency: 'EUR', nextPaymentDay: 15 },
  { name: 'LinkedIn', amount: 29.99, currency: 'EUR', nextPaymentDay: 24 },
  { name: 'Amazon', amount: 7.99, currency: 'EUR', nextPaymentDay: 29 },
];

const SubTable: React.FC = () => {
  const handleDelete = (name: string) => {
    console.log(`Delete subscription: ${name}`);
    // Implement delete logic here
  };

  const handlePieChart = () => {
    console.log(`Show pie chart for all subscriptions`);
    // Implement pie chart logic here
  };

  return (
    <Card className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xs">Active Subscriptions</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePieChart}
          className="h-8 w-8 p-0 hover:bg-gray-800/90"
        >
          <PieChart className="h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white text-xs font-semibold">Brand</TableHead>
            <TableHead className="text-white text-xs font-semibold text-right">Amount</TableHead>
            <TableHead className="text-white text-xs font-semibold text-right">Next Payment</TableHead>
            <TableHead className="text-white text-xs font-semibold text-right sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((sub) => {
            const Icon = BrandIcons[sub.name];
            return (
              <TableRow key={sub.name}>
                <TableCell className="font-medium text-xs">
                  <div className="flex items-center">
                    <Icon className="mr-2" width={24} height={24} />
                    {sub.name}
                  </div>
                </TableCell>
                <TableCell className="text-right text-xs font-semibold">{`${sub.amount} ${sub.currency}`}</TableCell>
                <TableCell className="text-right text-xs font-semibold">{`Every ${sub.nextPaymentDay}${getDayOfMonthSuffix(sub.nextPaymentDay)}`}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(sub.name)}
                      className="h-8 w-8 p-0 hover:bg-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

function getDayOfMonthSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:  return 'st';
    case 2:  return 'nd';
    case 3:  return 'rd';
    default: return 'th';
  }
}

export default SubTable;
