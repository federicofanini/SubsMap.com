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
import CalendarSkeleton from '@/components/sub/CalendarSkelethon';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Sponsor from '@/components/sub/Sponsor';
import { Separator } from '../ui/separator';

type Subscription = {
  id: string;
  brand: string;
  amount: number;
  currency: string;
  day: number;
  note?: string;
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlySpending, setMonthlySpending] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<'EUR' | 'USD'>('EUR');
  const [brandLogos, setBrandLogos] = useState<{ [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> }>({});

  useEffect(() => {
    fetchSubscriptions();
    fetchMonthlySpending();
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfMonth(currentDate);
    const daysArray = eachDayOfInterval({ start, end });
    while (daysArray.length < 42) {
      daysArray.push(addDays(daysArray[daysArray.length - 1], 1));
    }
    setDays(daysArray);
  }, [currentDate, selectedCurrency]);

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

  const fetchMonthlySpending = async () => {
    try {
      const response = await fetch(`/api/subscriptions/monthlyExp?currency=${selectedCurrency}`);
      if (!response.ok) {
        throw new Error('Failed to fetch monthly spending');
      }
      const data = await response.json();
      setMonthlySpending(data.total);
    } catch (error) {
      console.error('Error fetching monthly spending:', error);
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
                  {BrandIcon && <BrandIcon className="w-4 h-4" />}
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

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  return (
    <div className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"><span className='uppercase'>{format(currentDate, 'MMM')}</span> <span className="text-muted-foreground">{format(currentDate, 'yyyy')}</span></h2>
        <div className="text-right">
          <p className="text-sm text-muted-foreground font-semibold">Monthly spend</p>
          <div className="flex items-center justify-end gap-3">
            <ToggleGroup size="sm" type="single" value={selectedCurrency} onValueChange={(value: 'EUR' | 'USD') => setSelectedCurrency(value)}>
              <ToggleGroupItem value="EUR" aria-label="Toggle EUR">€</ToggleGroupItem>
              <ToggleGroupItem value="USD" aria-label="Toggle USD">$</ToggleGroupItem>
            </ToggleGroup>
            <p className="text-xl font-bold mr-2">{monthlySpending !== null ? monthlySpending.toFixed(2) : '---'}</p>
          </div>
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
      <Sponsor position="bottom" />
    </div>
  );
};

export default Calendar;
