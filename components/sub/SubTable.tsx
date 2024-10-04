"use client"

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { BrandIcons } from '@/components/sub/BrandIcons';
import { Trash2, PieChart, Loader2, TableIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import SubPie from '@/components/sub/SubPie';

type Subscription = {
  id: string;
  brand: string;
  amount: number;
  currency: string;
  day: number;
};

interface SubTableProps {
  onDelete: () => void;
}

const SubTable: React.FC<SubTableProps> = ({ onDelete }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPieChart, setShowPieChart] = useState(false);

  useEffect(() => {
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
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to fetch subscriptions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/subscriptions/delete?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete subscription');
      }
      toast.success('Subscription deleted successfully');
      fetchSubscriptions(); // Refresh the list after deletion
      onDelete(); // Call the onDelete prop to update the Calendar component
    } catch (error) {
      console.error('Error deleting subscription:', error);
      toast.error('Failed to delete subscription');
    }
  };

  const handlePieChart = () => {
    setShowPieChart(!showPieChart);
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
          {showPieChart ? <TableIcon className="h-4 w-4" /> : <PieChart className="h-4 w-4" />}
        </Button>
      </div>
      {showPieChart ? (
        <SubPie />
      ) : (
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  <p className="mt-2 text-sm text-gray-400">Loading subscriptions...</p>
                </TableCell>
              </TableRow>
            ) : subscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-sm text-gray-400">
                  No active subscriptions found.
                </TableCell>
              </TableRow>
            ) : (
              subscriptions.map((sub) => {
                const brandKey = sub.brand.charAt(0).toUpperCase() + sub.brand.slice(1) as keyof typeof BrandIcons;
                const BrandIcon = BrandIcons[brandKey]?.icon || BrandIcons.Twitter.icon; // Fallback to Twitter if brand not found
                const brandColor = BrandIcons[brandKey]?.color || BrandIcons.Twitter.color;
                const brandName = BrandIcons[brandKey]?.name || sub.brand;
                return (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium text-xs">
                      <div className="flex items-center">
                        <BrandIcon className={`mr-2 text-${brandColor}`} width={24} height={24} />
                        {brandName}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs font-semibold">{`${sub.amount} ${sub.currency}`}</TableCell>
                    <TableCell className="text-right text-xs font-semibold">{`Every ${sub.day}${getDayOfMonthSuffix(sub.day)}`}</TableCell>
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

export default SubTable;
