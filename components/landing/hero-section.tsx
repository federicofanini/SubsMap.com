"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import TextShimmer from "@/components/magicui/text-shimmer";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Sponsor from "@/components/sub/Sponsor";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [remainingUsers, setRemainingUsers] = useState<number | null>(null);

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

  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8"
    >
      {/* <div className="max-w-lg mx-auto mb-8">
        <Sponsor position="bottom" />
      </div> */}
      <div className="backdrop-filter-[12px] inline-flex h-7 items-center justify-between rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white dark:text-black transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem] animate-fade-in opacity-0">
        <TextShimmer className="inline-flex items-center justify-center">
          <Link href="/dashboard" className="flex items-center gap-1">
            <span>✨ Free for the beta version</span>{" "}
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </Link>
        </TextShimmer>
      </div>
      <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        Track your monthly subscriptions, 
        <br className="hidden md:block" /> easily.
      </h1>
      <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        One place to track all your subscriptions,
        <br className="hidden md:block" /> and never lose track of your bills.
      </p>
      <Button className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg text-white dark:text-black opacity-0 ease-in-out [--animation-delay:600ms]">
        <Sparkles className="mr-2 h-4 w-4" />
        <Link href="/dashboard">Get Started for FREE </Link>
        <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </Button>
      <div className="max-w-lg mx-auto">
        <Link href="https://litlyx.com/?via=subsmap.com" target="_blank">
          <Image
            src="/home-lit.svg"
            alt="SubsMap Banner"
            width={1200}
            height={630}
            className="w-full h-auto rounded-sm mt-4"
          />
        </Link>
      </div>
      <div
        ref={ref}
        className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
      >
        <div
          className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] ${
            inView ? "before:animate-image-glow" : ""
          }`}
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
          />
          <Image
            src="/app.png"
            alt="Hero Image"
            width={1336}
            height={768}
            className="relative w-full h-full rounded-[inherit] border object-contain hidden md:block"
          />
          <Image
            src="/calendar.png"
            alt="Calendar Image"
            width={1336}
            height={768}
            className="relative w-full h-full rounded-[inherit] border object-contain md:hidden"
          />
        </div>
      </div>
      <div className="max-w-lg mx-auto mt-8">
        <Sponsor position="bottom" />
      </div>
      <div className="max-w-lg mx-auto mt-8">
        <Sponsor position="bottom" />
      </div>
    </section>
  );
}
