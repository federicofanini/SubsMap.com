"use client"

import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { Card } from "@/components/ui/card"
import { BrandIcons } from '@/components/sub/BrandIcons';

type Subscription = {
  name: string;
  color: string;
  icon: keyof typeof BrandIcons;
  date: number;
};

const subscriptions: Subscription[] = [
  { name: 'Netflix', color: 'bg-red-600', icon: 'Netflix', date: 7 },
  { name: 'Spotify', color: 'bg-green-500', icon: 'Spotify', date: 15 },
  { name: 'LinkedIn', color: 'bg-blue-600', icon: 'LinkedIn', date: 24 },
  { name: 'Amazon', color: 'bg-yellow-500', icon: 'Amazon', date: 30 },
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    setDays(eachDayOfInterval({ start, end }));
  }, [currentDate]);

  const getDayContent = (day: number) => {
    const sub = subscriptions.find(s => s.date === day);
    if (!sub) return null;

    const Icon = BrandIcons[sub.icon];

    return (
      <>
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
          <Icon width={24} height={24} />
        </div>
        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${sub.color}`}></div>
      </>
    );
  };

  return (
    <div className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">LN {format(currentDate, 'yyyy')}</h2>
        <div className="text-right">
          <p className="text-sm">Monthly spend</p>
          <p className="text-xl font-bold">€43.72</p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-400">
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
            } ${isToday(day) ? 'ring-2 ring-white' : ''}`}
          >
            <div className="w-full h-full flex flex-col items-center justify-between">
              {getDayContent(parseInt(format(day, 'd')))}
              <span className="text-sm font-medium mt-auto">
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
