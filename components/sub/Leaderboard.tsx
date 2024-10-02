"use client"

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface LeaderboardEntry {
  id: string;
  name: string | null;
  surname: string | null;
  image: string | null;
  totalExpenseEUR: number;
  totalExpenseUSD: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscriptions/leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      toast.error('Failed to fetch leaderboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const getMedalEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  return (
    <Card className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
      <h2 className="font-bold text-xs mb-4">👑 Leaderboard</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white text-xs font-semibold">Rank</TableHead>
            <TableHead className="text-white text-xs font-semibold">User</TableHead>
            <TableHead className="text-white text-xs font-semibold text-right">Expense (EUR)</TableHead>
            <TableHead className="text-white text-xs font-semibold text-right">Expense (USD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                <p className="mt-2 text-sm text-gray-400">Loading leaderboard...</p>
              </TableCell>
            </TableRow>
          ) : leaderboardData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-sm text-gray-400">
                No leaderboard data available.
              </TableCell>
            </TableRow>
          ) : (
            leaderboardData.map((entry, index) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium text-xs">
                  {index + 1} {getMedalEmoji(index)}
                </TableCell>
                <TableCell className="text-xs">
                  <div className="flex items-center">
                    {entry.image && (
                      <Image
                        src={entry.image}
                        alt={`${entry.name} ${entry.surname}`}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                    )}
                    {entry.name} {entry.surname}
                  </div>
                </TableCell>
                <TableCell className="text-right text-xs font-semibold">
                  €{entry.totalExpenseEUR.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-xs font-semibold">
                  ${entry.totalExpenseUSD.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default Leaderboard;
