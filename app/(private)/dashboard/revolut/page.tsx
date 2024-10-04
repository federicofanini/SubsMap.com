"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Lock, Fingerprint, DollarSignIcon, UserPlus, CreditCard as CreditCardIcon, ShoppingCart, Gift, GiftIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { BrandIcons } from '@/components/sub/BrandIcons';

export default function RevolutPage() {
  const referralLink = "https://revolut.com/referral/?referral-code=federiddel!OCT1-24-AR-L2";

  const features = [
    { title: "Virtual Cards", description: "Disposable virtual cards for secure online shopping.", icon: CreditCard },
    { title: "Enhanced Privacy", description: "Advanced security features to protect your financial data.", icon: Lock },
    { title: "Biometric Auth", description: "Use your fingerprint or face ID for added security.", icon: Fingerprint },
    { title: "Currency Exchange", description: "Exchange between 30+ currencies without hidden fees.", icon: DollarSignIcon },
  ];

  const steps = [
    { title: "Sign up for free", description: "5-mins onboarding process.", icon: UserPlus },
    { title: "Top up funds", description: "Instant top-up via credit/debit card, Apple Pay, or Google Pay.", icon: CreditCardIcon },
    { title: "Order a physical card", description: "Get a free physical card delivered to you.", icon: Gift },
    { title: "Start buying securely", description: "Make 3 purchases of at least €5 each.", icon: ShoppingCart },
  ];

  return (
    <div className="relative">
      <Card className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">Your benefits</h2>
          <Image 
            src="/revolut-sponsor.png" 
            alt="Revolut Logo" 
            width={100} 
            height={20}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800 rounded-md">
              <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                <feature.icon className="size-4" />
                <CardTitle className="text-sm font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="font-bold text-2xl mb-4 flex items-center space-x-2">
          <GiftIcon className="size-5 animate-pulse text-green-500" />
          <span>Get started for Free</span>
        </div>
        <div className="space-y-4 mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">{index + 1}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full font-bold " variant="secondary" asChild>
          <Link href={referralLink} target="_blank" className="flex items-center justify-center font-bold">
            <BrandIcons.Revolut.icon className="mr-2 size-4" />
            Start Now
          </Link>
        </Button>
      </Card>
    </div>
  );
}
