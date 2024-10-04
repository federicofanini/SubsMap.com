"use client"

import React, { useState, useEffect } from 'react';
import { format, startOfYear, eachMonthOfInterval, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { Card } from "@/components/ui/card"
import { BrandIcons } from '@/components/sub/BrandIcons';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from '@/components/ui/separator';

type Subscription = {
  id: string;
  brand: string;
  amount: number;
  currency: string;
  day: number;
  note?: string;
};

const MonthlyCalendar: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [brandLogos, setBrandLogos] = useState<{ [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> }>({});

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
      
      // Map brand logos
      const logos: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {};
      data.forEach((sub: Subscription) => {
        const brandKey = sub.brand.charAt(0).toUpperCase() + sub.brand.slice(1) as keyof typeof BrandIcons;
        if (BrandIcons[brandKey]) {
          logos[sub.brand] = BrandIcons[brandKey].icon;
        }
      });
      setBrandLogos(logos);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDayContent = (day: number) => {
    const subs = subscriptions.filter(s => s.day === day);
    if (subs.length === 0) return null;

    return (
      <div className="w-full h-full relative flex items-center justify-center">
        {subs.map((sub) => {
          const BrandIcon = brandLogos[sub.brand];
          const brandKey = sub.brand.charAt(0).toUpperCase() + sub.brand.slice(1) as keyof typeof BrandIcons;
          const brandInfo = BrandIcons[brandKey];
          if (!brandInfo) return null;
          const { name, color } = brandInfo;
          return (
            <HoverCard key={sub.id}>
              <HoverCardTrigger asChild>
                <div className="flex items-center justify-center">
                  {BrandIcon && <BrandIcon className="w-3 h-3" />}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className={`w-64 p-4 bg-black border border-${color} rounded-lg`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    {BrandIcon && <BrandIcon className="mr-3 w-8 h-8" />}
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                  </div>
                  <span className="text-white font-semibold text-lg">{sub.amount} {sub.currency}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400 text-xs font-semibold">
                    <span>Every {sub.day}th</span>
                    <span>Next payment</span>
                  </div>
                  <Separator className="my-2" />
                  {sub.note && (
                    <div className="text-gray-400 text-xs mt-2 text-left">
                      <span className="font-semibold">Note:</span> {sub.note}
                    </div>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
    );
  };

  const renderMonth = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const days = eachDayOfInterval({ start, end });

    return (
      <Card key={month.toString()} className="p-2 bg-black text-white">
        <h3 className="text-lg font-bold mb-2">{format(month, 'MMMM')}</h3>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-400">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={day.toString()}
              className={`aspect-square p-1 text-center text-xs ${
                !isSameMonth(day, month) ? 'text-gray-600' : ''
              } ${isToday(day) ? 'bg-white text-black rounded-full' : ''}`}
            >
              <div className="w-full h-full flex flex-col items-center justify-between">
                {getDayContent(parseInt(format(day, 'd')))}
                <span>{format(day, 'd')}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const months = eachMonthOfInterval({
    start: startOfYear(new Date(currentYear, 0, 1)),
    end: new Date(currentYear, 11, 31)
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{currentYear} Calendar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {months.map(renderMonth)}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
