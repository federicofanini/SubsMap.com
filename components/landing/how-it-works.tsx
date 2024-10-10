"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, CreditCard, DollarSign, Users, PiggyBank, Bell } from "lucide-react";
import Image from "next/image";
import { BrandIcons } from "../sub/BrandIcons";

export function HowItWorksSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const personalSteps = [
    {
      icon: <Calendar className="h-6 w-6 text-[var(--color-one)]" />,
      title: "Track Subscriptions",
      description: "Never miss a bill again. Our calendar integration allows you to effortlessly track all your personal subscriptions.",
      imagePlaceholder: "/personal.jpeg",
    },
    {
      icon: <PiggyBank className="h-6 w-6 text-[var(--color-two)]" />,
      title: "Set Savings Goals",
      description: "Easily set and track your personal savings goals. Visualize your progress and stay motivated to reach your financial targets.",
      imagePlaceholder: "/savings.jpeg",
    },
    {
      icon: <Bell className="h-6 w-6 text-[var(--color-three)]" />,
      title: "Smart Notifications",
      description: "Receive timely reminders for upcoming bills and get personalized insights to optimize your spending habits.",
      imagePlaceholder: "/notifications.jpeg",
    },
  ];

  const businessSteps = [
    {
      icon: <BrandIcons.Stripe.icon className="h-6 w-6 text-[var(--color-two)]" />,
      title: "Connect with Stripe",
      description: "Seamlessly integrate with Stripe to monitor your startup's revenue streams. Get real-time insights into your income.",
      imagePlaceholder: "/stripe.png",
    },
    {
      icon: <DollarSign className="h-6 w-6 text-[var(--color-three)]" />,
      title: "Monitor Expenses",
      description: "Keep a close eye on your startup's expenses. Our platform helps you categorize and track all business-related costs.",
      imagePlaceholder: "/images/business-expenses-placeholder.jpg",
    },
    {
      icon: <Users className="h-6 w-6 text-[var(--color-one)]" />,
      title: "Manage Shared Expenses",
      description: "Efficiently track and manage shared business expenses across your organization. Simplify cost allocation among team members.",
      imagePlaceholder: "/images/shared-expenses-placeholder.jpg",
    },
  ];

  return (
    <section id="how-it-works" className="mx-auto flex max-w-screen-xl flex-col gap-12 px-4 py-14 md:px-8 mt-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          How It Works
        </h2>

        <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white/80">
          Take control of your personal and business finances with these simple steps.
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <h3 className="text-3xl font-bold mb-6 text-black dark:text-white">Personal Use</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {personalSteps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className={cn(
                "flex flex-col gap-4 rounded-2xl border p-6 text-black dark:text-white overflow-hidden",
                "transform-gpu transition-all duration-300 ease-out hover:shadow-lg"
              )}
            >
              <div className="flex items-center gap-3">
                {step.icon}
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-sm leading-6 text-black/70 dark:text-white/70">
                {step.description}
              </p>
              <div className="relative w-full aspect-video overflow-hidden rounded-xl mt-4">
                <Image
                  src={step.imagePlaceholder}
                  alt={`Step: ${step.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out hover:scale-105 rounded-xl"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="text-3xl font-bold mb-6 text-black dark:text-white">Business Use</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businessSteps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className={cn(
                "flex flex-col gap-4 rounded-2xl border p-6 text-black dark:text-white overflow-hidden",
                "transform-gpu transition-all duration-300 ease-out hover:shadow-lg"
              )}
            >
              <div className="flex items-center gap-3">
                {step.icon}
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-sm leading-6 text-black/70 dark:text-white/70">
                {step.description}
              </p>
              <div className="relative w-full aspect-video overflow-hidden rounded-xl mt-4">
                <Image
                  src={step.imagePlaceholder}
                  alt={`Step: ${step.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out hover:scale-105 rounded-xl"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
