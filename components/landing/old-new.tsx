"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Rocket } from "lucide-react";

export function OldNewComparison() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cards = [
    {
      title: "Traditional Method",
      description: "Manual financial tracking with spreadsheets",
      points: [
        "Time-intensive data entry",
        "Susceptible to errors",
        "Complex reporting process",
        "Delayed financial insights",
      ],
    },
    {
      title: "Effortlessly Method",
      description: "Streamlined financial management solution",
      points: [
        "Automatic expense categorization",
        "Live revenue updates",
        "One-click report creation",
        "AI-powered financial analysis",
      ],
    },
  ];

  return (
    <section className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8 mt-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          Simplify your financial management
        </h2>

        <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white/80">
          Experience the difference between traditional methods and our innovative approach.
        </p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
            className={`rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-102 ${
              index === 0
                ? "bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 shadow-sm"
                : "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-gray-800 dark:text-gray-200 relative overflow-hidden"
            }`}
          >
            {index === 1 && (
              <BorderBeam
                duration={2000}
                className="absolute inset-0 opacity-10"
              />
            )}
            <div className="flex items-center mb-3">
              {index === 1 && (
                <Rocket className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
              )}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {card.title}
              </h3>
            </div>
            <p className={`mb-4 text-sm ${index === 0 ? "text-red-700 dark:text-red-300" : "text-gray-700 dark:text-gray-300"}`}>
              {card.description}
            </p>
            <ul className="space-y-2 text-sm">
              {card.points.map((point, pointIndex) => (
                <li key={pointIndex} className={`flex items-center ${
                  index === 0 ? "text-red-700 dark:text-red-300" : "text-gray-700 dark:text-gray-300"
                }`}>
                  <svg
                    className={`w-4 h-4 mr-2 ${
                      index === 0 ? "text-red-500 dark:text-red-400" : "text-green-600 dark:text-green-400"
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {index === 0 ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M5 13l4 4L19 7" />
                    )}
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}