'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

interface Startup {
  id: string;
  name: string;
  description: string;
}

export default function StartupDetailsPage() {
  const { startupId } = useParams();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStartup = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/startups/startupList');
        if (!response.ok) {
          throw new Error('Failed to fetch startups');
        }
        const startups: Startup[] = await response.json();
        const foundStartup = startups.find(s => s.id === startupId);
        setStartup(foundStartup || null);
      } catch (error) {
        console.error('Error fetching startup:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (startupId) {
      fetchStartup();
    }
  }, [startupId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">Startup not found</h2>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-black text-white p-4 rounded-lg mt-4">
      <CardHeader>
        <CardTitle>{startup.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{startup.description}</p>
      </CardContent>
    </Card>
  );
}
