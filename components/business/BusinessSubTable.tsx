"use client"

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Trash2, PieChart, TableIcon, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { BrandIcons } from '@/components/sub/BrandIcons';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type BusinessExpense = {
  id: string;
  brand: string;
  amount: number;
  currency: string;
  day: number;
  month?: number;
  isMonthly: boolean;
  isAnnual: boolean;
};

interface BusinessSubTableProps {
  onDelete: () => void;
  newSubscriptionAdded: boolean;
}

const BusinessSubTable: React.FC<BusinessSubTableProps> = ({ onDelete, newSubscriptionAdded }) => {
  const [expenses, setExpenses] = useState<BusinessExpense[]>([]);
  const [showTable, setShowTable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useKindeBrowserClient();

  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }
      const response = await fetch(`/api/business/expenses?userId=${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch business expenses');
      }
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching business expenses:', error);
      toast.error('Failed to load business expenses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user, newSubscriptionAdded]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/startups/subscriptions/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      toast.success('Expense deleted successfully');
      fetchExpenses(); // Refresh the list after deletion
      onDelete(); // Call the onDelete prop to update the parent component
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    }
  };

  const toggleView = () => {
    setShowTable(!showTable);
  };

  const getNextPaymentText = (expense: BusinessExpense) => {
    if (expense.isMonthly) return `Every ${expense.day}${getDayOfMonthSuffix(expense.day)}`;
    if (expense.isAnnual) return `Annually on ${expense.day}${getDayOfMonthSuffix(expense.day)} ${expense.month ? `of ${getMonthName(expense.month)}` : ''}`;
    return `${expense.day}${getDayOfMonthSuffix(expense.day)} ${expense.month ? `of ${getMonthName(expense.month)}` : ''}`;
  };

  return (
    <Card className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xs">Business Expenses</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleView}
          className="h-8 w-8 p-0 hover:bg-gray-800/90"
        >
          {showTable ? <PieChart className="h-4 w-4" /> : <TableIcon className="h-4 w-4" />}
        </Button>
      </div>
      {showTable ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white text-xs font-semibold">Brand</TableHead>
              <TableHead className="text-white text-xs font-semibold text-right">Amount</TableHead>
              <TableHead className="text-white text-xs font-semibold text-right">Next Payment</TableHead>
              <TableHead className="text-white text-xs font-semibold text-right">Cycle</TableHead>
              <TableHead className="text-white text-xs font-semibold text-right sr-only">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  <p className="mt-2 text-sm text-gray-400">Loading expenses...</p>
                </TableCell>
              </TableRow>
            ) : expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-sm text-gray-400">
                  No business expenses found.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => {
                const brandKey = expense.brand.charAt(0).toUpperCase() + expense.brand.slice(1) as keyof typeof BrandIcons;
                const BrandIcon = BrandIcons[brandKey]?.icon;
                const brandColor = BrandIcons[brandKey]?.color || 'gray-500';
                const brandName = BrandIcons[brandKey]?.name || expense.brand;
                return (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium text-xs">
                      <div className="flex items-center">
                        {BrandIcon ? (
                          <BrandIcon className={`mr-2 text-${brandColor} size-4`} width={24} height={24} />
                        ) : (
                          <div className={`mr-2 text-${brandColor} size-4 flex items-center justify-center bg-gray-800 rounded-full`}>
                            {expense.brand.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {brandName}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs font-semibold">{`${expense.amount} ${expense.currency}`}</TableCell>
                    <TableCell className="text-right text-xs font-semibold">{getNextPaymentText(expense)}</TableCell>
                    <TableCell className="text-right text-xs font-semibold">{expense.isAnnual ? 'Annual' : 'Monthly'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(expense.id)}
                          className="h-8 w-8 p-0 hover:bg-rose-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-gray-400">Pie chart view not implemented</p>
        </div>
      )}
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

function getMonthName(month: number): string {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[month - 1];
}

export default BusinessSubTable;
