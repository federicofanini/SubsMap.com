"use client"

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Trash2, PieChart, TableIcon, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { BrandIcons } from '@/components/sub/BrandIcons';

type StartupSubscription = {
  id: string;
  startupName: string;
  brand: string;
  amount: number;
  currency: string;
  day: number;
  month?: number;
  isMonthly: boolean;
  isAnnual: boolean;
};

interface StartupSubTableProps {
  startupId: string;
  onDelete: () => void;
  newSubscriptionAdded: boolean;
}

const StartupSubTable: React.FC<StartupSubTableProps> = ({ startupId, onDelete, newSubscriptionAdded }) => {
  const [subscriptions, setSubscriptions] = useState<StartupSubscription[]>([]);
  const [showTable, setShowTable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscriptions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/startups/subscriptions/list?startupId=${startupId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [startupId, newSubscriptionAdded]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/startups/subscriptions/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete subscription');
      }

      toast.success('Subscription deleted successfully');
      fetchSubscriptions(); // Refresh the list after deletion
      onDelete(); // Call the onDelete prop to update the parent component
    } catch (error) {
      console.error('Error deleting subscription:', error);
      toast.error('Failed to delete subscription');
    }
  };

  const toggleView = () => {
    setShowTable(!showTable);
  };

  const getNextPaymentText = (sub: StartupSubscription) => {
    if (sub.isMonthly) return `Every ${sub.day}${getDayOfMonthSuffix(sub.day)}`;
    if (sub.isAnnual) return `Annually on ${sub.day}${getDayOfMonthSuffix(sub.day)} ${sub.month ? `of ${getMonthName(sub.month)}` : ''}`;
    return `${sub.day}${getDayOfMonthSuffix(sub.day)} ${sub.month ? `of ${getMonthName(sub.month)}` : ''}`;
  };

  return (
    <Card className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xs">Startup Subscriptions</h2>
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
                  <p className="mt-2 text-sm text-gray-400">Loading subscriptions...</p>
                </TableCell>
              </TableRow>
            ) : subscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-sm text-gray-400">
                  No active subscriptions found.
                </TableCell>
              </TableRow>
            ) : (
              subscriptions.map((sub) => {
                const brandKey = sub.brand.charAt(0).toUpperCase() + sub.brand.slice(1) as keyof typeof BrandIcons;
                const BrandIcon = BrandIcons[brandKey]?.icon;
                const brandColor = BrandIcons[brandKey]?.color || 'gray-500';
                const brandName = BrandIcons[brandKey]?.name || sub.brand;
                return (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium text-xs">
                      <div className="flex items-center">
                        {BrandIcon ? (
                          <BrandIcon className={`mr-2 text-${brandColor} size-4`} width={24} height={24} />
                        ) : (
                          <div className={`mr-2 text-${brandColor} size-4 flex items-center justify-center bg-gray-800 rounded-full`}>
                            {sub.brand.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {brandName}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs font-semibold">{`${sub.amount} ${sub.currency}`}</TableCell>
                    <TableCell className="text-right text-xs font-semibold">{getNextPaymentText(sub)}</TableCell>
                    <TableCell className="text-right text-xs font-semibold">{sub.isAnnual ? 'Annual' : 'Monthly'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(sub.id)}
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

export default StartupSubTable;
