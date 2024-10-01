"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { BrandIcons } from "@/components/sub/BrandIcons";
import { useEffect, useRef, useState } from "react";

interface Subscription {
  name: keyof typeof BrandIcons;
  price: string;
  renewalDate: string;
}

const subscriptions: Subscription[] = [
  { name: "Netflix", price: "$15.99", renewalDate: "5 days" },
  { name: "Spotify", price: "$9.99", renewalDate: "12 days" },
  { name: "Amazon", price: "$14.99", renewalDate: "18 days" },
  { name: "LinkedIn", price: "$29.99", renewalDate: "23 days" },
];

const SubscriptionItem = ({ name, price, renewalDate }: Subscription) => {
  const { icon: Icon, color } = BrandIcons[name];
  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[400px] cursor-pointer rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white shadow-lg dark:bg-transparent dark:backdrop-blur-md dark:border dark:border-white/10",
      )}
    >
      <div className="flex items-center gap-3">
        <div className={`flex size-10 items-center justify-center rounded-2xl bg-${color}`}>
          <Icon className="size-6" />
        </div>
        <div className="flex flex-col">
          <figcaption className="flex items-center text-lg font-medium dark:text-white">
            <span>{name}</span>
            <span className="mx-1 text-gray-400">·</span>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{price}</span>
          </figcaption>
          <p className="text-sm text-gray-500 dark:text-white/60">
            Renews in {renewalDate}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function SubscriptionsList({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 p-6 rounded-lg bg-background md:shadow-xl min-h-[500px] md:h-[400px] h-[700px] md:max-h-none", className)}>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Simplify Your Subscriptions</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Track, manage, and optimize your subscriptions effortlessly. 
          Get reminders, visualize costs, and never miss a payment again.
        </p>
      </div>
      <div className="w-full md:w-1/2 h-full overflow-y-auto">
        <AnimatedList className="space-y-4">
          {subscriptions.map((sub, idx) => (
            <SubscriptionItem {...sub} key={idx} />
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
