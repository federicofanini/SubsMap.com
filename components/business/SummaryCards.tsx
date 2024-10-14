import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SummaryCardsProps {
  totalRevenue: number;
  totalExpenses: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalRevenue, totalExpenses }) => {
  const mrr = (totalRevenue / 12).toFixed(2);

  return (
    <Card className="bg-gray-900 border-gray-800 rounded-md mb-4">
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-4 sm:gap-44">
          Portfolio Summary
          <Badge variant="secondary">💰 MRR: ${mrr}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm font-semibold text-gray-400">Total Revenue</p>
            <p className="text-2xl font-bold text-green-500">${totalRevenue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400">Total Expenses</p>
            <p className="text-2xl font-bold text-red-500">-${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCards;
