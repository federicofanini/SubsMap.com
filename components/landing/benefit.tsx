"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { DollarSign, BarChart, Bell, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function BenefitSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6 text-[var(--color-one)]" />,
      title: "Effortless Tracking",
      description: "Automatically categorize and track all your expenses and revenues in real-time.",
    },
    {
      icon: <BarChart className="h-6 w-6 text-[var(--color-two)]" />,
      title: "Insightful Analytics",
      description: "Gain valuable insights with AI-powered analytics to optimize your financial decisions.",
    },
    {
      icon: <Bell className="h-6 w-6 text-[var(--color-three)]" />,
      title: "Smart Reminders",
      description: "Never miss a payment with intelligent reminders for upcoming bills and subscriptions.",
      badge: "soon"
    },
    {
      icon: <Zap className="h-6 w-6 text-[var(--color-one)]" />,
      title: "Business Growth",
      description: "Accelerate your business growth with comprehensive financial management tools.",
    },
  ];

  return (
    <section id="benefits" className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8 mt-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          4 steps to financial success
        </h2>

        <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white/80">
          Discover how our platform can transform your financial management and drive your success.
        </p>
      </div>

      <div className={cn(
        "mx-auto grid w-full justify-center gap-4 lg:max-w-6xl",
        isMobile ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-4"
      )}>
        {benefits.map((benefit, idx) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
            className={cn(
              "relative flex max-w-[400px] flex-col gap-4 rounded-2xl border p-6 text-black dark:text-white overflow-hidden",
              "transform-gpu transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.02]"
            )}
          >

            <div className="relative flex items-center gap-3">
              {benefit.icon}
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
              {benefit.badge && (
                <Badge variant="outline" className="text-xs absolute top-[-15px] right-[-15px]">
                  {benefit.badge}
                </Badge>
              )}
            </div>
            <p className="text-sm leading-6 text-black/70 dark:text-white/70">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
