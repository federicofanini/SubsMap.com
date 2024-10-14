"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Sparkles, ArrowRight, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [remainingUsers, setRemainingUsers] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchRemainingUsers = async () => {
      try {
        const response = await fetch('/api/users/left');
        if (!response.ok) {
          throw new Error('Failed to fetch users left');
        }
        const data = await response.json();
        setRemainingUsers(data.usersLeft);
      } catch (error) {
        console.error("Error fetching remaining users:", error);
      }
    };

    fetchRemainingUsers();
  }, []);

  const onGetStartedClick = () => {
    setIsLoading(true);
    router.push('/dashboard');
  };

  return (
    <section id="hero" className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8 mt-20">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex h-7 items-center justify-between rounded-full border border-white/5 bg-white/70 px-3 text-xs text-white dark:text-black transition-all ease-in hover:cursor-pointer hover:bg-white/90 group gap-1 mb-6"
        >
          <Link href="/dashboard" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            <span>Free for personal use</span>
            <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl"
        >
          Track your finances, easily.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-xl leading-8 text-black/80 dark:text-white/80"
        >
          Keep an eye on your personal subscriptions and business finances.
          Never lose track of your bills, again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center justify-center"
        >
          <Button
            className={cn(
              "group relative w-full max-w-[200px] gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
              "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
            )}
            disabled={isLoading}
            onClick={onGetStartedClick}
          >
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black" />
            {!isLoading && <p>Get Started</p>}
            {isLoading && <p>Processing</p>}
            {isLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={cn(
          "relative mx-auto w-full max-w-[50rem] overflow-hidden rounded-xl border",
          "transform-gpu transition-all duration-300 ease-out hover:shadow-lg"
        )}
      >
        <BorderBeam
          size={200}
          duration={12}
          delay={11}
          colorFrom="var(--color-one)"
          colorTo="var(--color-two)"
        />
        <Image
          src="/hero.png"
          alt="Hero Image"
          width={1336}
          height={768}
          className="w-full h-auto object-cover max-w-[800px] max-h-[600px]"
        />
      </motion.div>
    </section>
  );
}
