import React from 'react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CalendarSkeleton: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-24" />
        <div className="text-right">
          <Skeleton className="h-4 w-20 mb-1" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {[...Array(7)].map((_, index) => (
          <Skeleton key={index} className="h-6 w-full rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(42)].map((_, index) => (
          <Card key={index} className="aspect-square p-1">
            <div className="w-full h-full flex flex-col items-center justify-between">
              <div className="w-full flex justify-end">
                <Skeleton className="h-2 w-2 rounded-full mr-1" />
                <Skeleton className="h-2 w-2 rounded-full" />
              </div>
              <Skeleton className="h-4 w-4 rounded-full mt-1" />
              <Skeleton className="h-4 w-6 mt-auto" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalendarSkeleton;
