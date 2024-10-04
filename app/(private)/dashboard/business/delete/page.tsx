'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface Startup {
  id: string;
  name: string;
  description: string;
}

export default function DeleteStartupPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/startups/startupList');
      if (!response.ok) {
        throw new Error('Failed to fetch startups');
      }
      const data = await response.json();
      setStartups(data);
    } catch (error) {
      console.error('Error fetching startups:', error);
      toast.error('Failed to fetch startups');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (startupId: string) => {
    try {
      const response = await fetch('/api/startups/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startupId }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete startup');
      }
      toast.success('Startup deleted successfully');
      fetchStartups(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting startup:', error);
      toast.error('Failed to delete startup');
    }
  };

  return (
    <Card className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xs">Your Startups</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white text-xs font-semibold">Name</TableHead>
            <TableHead className="text-white text-xs font-semibold">Description</TableHead>
            <TableHead className="text-white text-xs font-semibold text-right sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                <p className="mt-2 text-sm text-gray-400">Loading startups...</p>
              </TableCell>
            </TableRow>
          ) : startups.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center text-sm text-gray-400">
                No startups found.
              </TableCell>
            </TableRow>
          ) : (
            startups.map((startup) => (
              <TableRow key={startup.id}>
                <TableCell className="font-medium text-xs">{startup.name}</TableCell>
                <TableCell className="text-xs">{startup.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(startup.id)}
                      className="h-8 w-8 p-0 hover:bg-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
