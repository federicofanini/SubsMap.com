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

type Subscription = {
  name: string;
  color: string;
  borderColor: string;
  icon: keyof typeof BrandIcons;
  date: number;
  amount: number;
  nextPayment: string;
  totalSince: string;
};

const subscriptions: Subscription[] = [
  { name: 'Netflix', color: 'bg-red-600', borderColor: 'border-red-600', icon: 'Netflix', date: 7, amount: 14.99, nextPayment: '2024-02-07', totalSince: '€89.94' },
  { name: 'Spotify', color: 'bg-green-500', borderColor: 'border-green-500', icon: 'Spotify', date: 15, amount: 2.99, nextPayment: '2024-02-15', totalSince: '€35.88' },
  { name: 'LinkedIn', color: 'bg-blue-600', borderColor: 'border-blue-600', icon: 'LinkedIn', date: 24, amount: 9.99, nextPayment: '2024-02-24', totalSince: '€119.88' },
  { name: 'Amazon', color: 'bg-yellow-500', borderColor: 'border-yellow-500', icon: 'Amazon', date: 30, amount: 15.75, nextPayment: '2024-02-29', totalSince: '€189.00' },
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfMonth(currentDate);
    const daysArray = eachDayOfInterval({ start, end });
    // Add days from the next month to complete the grid
    while (daysArray.length < 42) {
      daysArray.push(addDays(daysArray[daysArray.length - 1], 1));
    }
    setDays(daysArray);
  }, [currentDate]);

  const getDayContent = (day: number) => {
    const sub = subscriptions.find(s => s.date === day);
    if (!sub) return null;

    const Icon = BrandIcons[sub.icon];

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="w-full h-full relative">
            <Icon width={24} height={24} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden sm:block" />
            <div className={`absolute top-0 right-0 w-2 h-2 rounded-full ${sub.color}`}></div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className={`w-64 p-4 bg-black border ${sub.borderColor} rounded-lg`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Icon width={32} height={32} className="mr-3" />
              <h3 className="text-xl font-bold text-white">{sub.name}</h3>
            </div>
            <span className="text-white font-semibold text-lg">€{sub.amount.toFixed(2)}</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400 text-xs font-semibold">
              <span>Every {sub.date}th</span>
              <span>Next payment</span>
            </div>
            <div className="mt-4 pt-2 border-t border-gray-700">
              <div className="flex justify-between text-gray-400">
                <span className='text-xs font-semibold'>Total since 2023-01-01</span>
                <span className="text-white font-semibold">{sub.totalSince}</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <div className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"><span className='uppercase'>{format(currentDate, 'MMM')}</span> <span className="text-muted-foreground">{format(currentDate, 'yyyy')}</span></h2>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Monthly spend</p>
          <p className="text-xl font-bold">€43.72</p>
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
