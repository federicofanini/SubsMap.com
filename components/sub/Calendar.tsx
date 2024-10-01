"use client"

import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addDays, startOfWeek } from 'date-fns';
import { Card } from "@/components/ui/card"
import { BrandIcons } from '@/components/sub/BrandIcons';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Loader2 } from 'lucide-react';

type Subscription = {
  id: string;
  brand: string;
  amount: number;
  currency: string;
  day: number;
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfMonth(currentDate);
    const daysArray = eachDayOfInterval({ start, end });
    while (daysArray.length < 42) {
      daysArray.push(addDays(daysArray[daysArray.length - 1], 1));
    }
    setDays(daysArray);
  }, [currentDate]);

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
    } finally {
      setIsLoading(false);
    }
  };

  const mapBrandName = (brand: string): keyof typeof BrandIcons => {
    const brandMap: { [key: string]: keyof typeof BrandIcons } = {
      'spotify': 'Spotify',
      'amazon': 'Amazon',
      'linkedin': 'LinkedIn',
      'netflix': 'Netflix',
    };
    return brandMap[brand.toLowerCase()] || 'Default' as keyof typeof BrandIcons;
  };

  const getDayContent = (day: number) => {
    const subs = subscriptions.filter(s => s.day === day);
    if (subs.length === 0) return null;

    return (
      <div className="w-full h-full relative">
        <div className="absolute top-1 right-1 flex flex-wrap justify-end gap-1">
          {subs.map((sub) => {
            const mappedBrand = mapBrandName(sub.brand);
            const brandColor = BrandIcons[mappedBrand].color;
            return (
              <div key={sub.id} className={`w-2 h-2 rounded-full bg-${brandColor}`}></div>
            );
          })}
        </div>
        {subs.map((sub) => {
          const mappedBrand = mapBrandName(sub.brand);
          const BrandIcon = BrandIcons[mappedBrand].icon;
          const brandColor = BrandIcons[mappedBrand].color;
          return (
            <HoverCard key={sub.id}>
              <HoverCardTrigger asChild>
                <div className="absolute inset-0 flex flex-col items-center">
                  <BrandIcon className="mt-1 w-4 h-4 hidden sm:block" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className={`w-64 p-4 bg-black border border-${brandColor} rounded-lg`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <BrandIcon className="mr-3 w-8 h-8" />
                    <h3 className="text-xl font-bold text-white">{BrandIcons[mappedBrand].name}</h3>
                  </div>
                  <span className="text-white font-semibold text-lg">{sub.amount} {sub.currency}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400 text-xs font-semibold">
                    <span>Every {sub.day}th</span>
                    <span>Next payment</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const totalSpend = subscriptions.reduce((total, sub) => total + sub.amount, 0);

  return (
    <div className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"><span className='uppercase'>{format(currentDate, 'MMM')}</span> <span className="text-muted-foreground">{format(currentDate, 'yyyy')}</span></h2>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Monthly spend</p>
          <p className="text-xl font-bold">11</p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-400 bg-gray-800/90 rounded-full items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <Card
            key={index}
            className={`aspect-square p-1 text-center relative ${
              !isSameMonth(day, currentDate) ? 'bg-gray-800' : 'bg-gray-900'
            } ${isToday(day) ? 'border border-white' : ''}`}
          >
            <div className="w-full h-full flex flex-col items-center justify-between">
              {getDayContent(parseInt(format(day, 'd')))}
              <span className={`text-sm font-medium mt-auto ${!isSameMonth(day, currentDate) ? 'text-gray-500' : ''}`}>
                {format(day, 'd').padStart(2, '0')}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
