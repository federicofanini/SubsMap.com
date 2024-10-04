import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

interface RevolutSponsorProps {
  position: 'left' | 'right' | 'top' | 'bottom';
}

const RevolutSponsor: React.FC<RevolutSponsorProps> = ({ position }) => {
  const baseClasses = "border border-white p-4 text-center flex items-center justify-center rounded-lg bg-black";
  
  const positionClasses = {
    left: "lg:w-32 lg:h-full w-full h-24",
    right: "lg:w-32 lg:h-full w-full h-24",
    top: "w-full h-32 mb-4",
    bottom: "w-full h-32 mt-4"
  };

  const referralLink = "https://revolut.com/referral/?referral-code=federiddel!OCT1-24-AR-L2";

  return (
    <div className={`${baseClasses} ${positionClasses[position]} flex flex-col items-center justify-center gap-2`}>
      <Image 
        src="/revolut-sponsor.png" 
        alt="Revolut Logo" 
        width={100} 
        height={20} 
        className="mb-2 mt-2"
      />
      <p className="text-white text-xs font-semibold mb-0.5">Buy online with ease. Take care of your privacy ✅</p>
      <div className="flex gap-2 mb-2">
        <Button size="sm" variant="outline" className="text-xs px-2">
          <Link href="/dashboard/revolut">
            Why choose Revolut?
          </Link>
        </Button>
        <Button size="sm" className="text-xs px-2">
          <Link href={referralLink} target="_blank">
            Open an account
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RevolutSponsor;
