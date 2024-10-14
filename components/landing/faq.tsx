"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FAQSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const faqItems = [
    {
      question: "How does the subscription tracking work?",
      answer: "You can track your subscriptions by adding them on the calendar. You can view and track monthly recurring costs."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, we take security very seriously. We don't share your data with anyone."
    },
    {
      question: "Can I use this for both personal and business finances?",
      answer: "Absolutely! SubsMap is designed to handle both personal and business financial tracking. You can easily separate and manage different financial profiles."
    },
    {
      question: "How does the Stripe integration work for businesses?",
      answer: "Once you connect your Stripe account, we automatically import your revenue data. This allows you to see real-time insights into your business income alongside your expenses."
    },
    {
      question: "Which payment providers are supported?",
      answer: "You can connect your revenue data from Stripe for now."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="mx-auto flex max-w-screen-xl flex-col gap-12 px-4 py-14 md:px-8 mt-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          Frequently Asked Questions
        </h2>

        <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white/80">
          Got questions? We&apos;ve got answers. If you don&apos;t see your question here, feel free to contact us.
        </p>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        {faqItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * idx }}
            className={cn(
              "mb-4 overflow-hidden rounded-2xl border",
              "transform-gpu transition-all duration-300 ease-out hover:shadow-md"
            )}
          >
            <button
              onClick={() => toggleQuestion(idx)}
              className="flex w-full items-center justify-between p-4 text-left text-lg font-semibold text-black dark:text-white"
            >
              {item.question}
              {openIndex === idx ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openIndex === idx && (
              <div className="p-4 text-sm text-black/70 dark:text-white/70">
                {item.answer}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
