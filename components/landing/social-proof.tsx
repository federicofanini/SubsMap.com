"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Users, DollarSign, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function SocialProof() {
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    expenses: 0,
    revenue: 0,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userCountResponse = await fetch('/api/users/count');
        const userCountData = await userCountResponse.json();
        
        setStats({
          users: userCountData.count,
          expenses: 5468,
          revenue: 3487,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    {
      icon: <Users className="h-6 w-6 text-[var(--color-one)]" />,
      title: "Active Users",
      value: stats.users.toLocaleString(),
      description: "Trusted by individuals and businesses worldwide.",
    },
    {
      icon: <DollarSign className="h-6 w-6 text-[var(--color-two)]" />,
      title: "Expenses Tracked",
      value: `$${stats.expenses.toLocaleString()}`,
      description: "Comprehensive expense tracking for better financial management.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[var(--color-three)]" />,
      title: "Revenue Monitored",
      value: `$${stats.revenue.toLocaleString()}`,
      description: "Real-time revenue monitoring for informed decision-making.",
    },
  ];

  return (
    <section id="social-proof" className="mx-auto flex max-w-screen-lg flex-col gap-8 px-4 py-14 md:px-8 mt-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          Simplifies financial tracking
        </h2>

        <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white/80">
          Built for normal people, entrepreneurs, and small businesses to track their finances.
        </p>
      </div>

      <div className={cn(
        "mx-auto grid w-full justify-center gap-4 lg:max-w-6xl",
        isMobile ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"
      )}>
        {statItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
            className={cn(
              "relative flex max-w-[400px] flex-col gap-4 rounded-2xl border p-6 text-black dark:text-white overflow-hidden",
              "transform-gpu transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.02]"
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-2xl font-bold text-black dark:text-white">{item.value}</p>
            <p className="text-sm leading-6 text-black/70 dark:text-white/70">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
