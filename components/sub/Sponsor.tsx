import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface SponsorProps {
  position: 'left' | 'right' | 'top' | 'bottom';
}

const Sponsor: React.FC<SponsorProps> = ({ position }) => {
  const baseClasses = "border border-dotted border-gray-400 p-4 text-center flex items-center justify-center rounded-lg";
  
  const positionClasses = {
    left: "lg:w-32 lg:h-full w-full h-24",
    right: "lg:w-32 lg:h-full w-full h-24",
    top: "w-full h-24 mb-4",
    bottom: "w-full h-24 mt-4"
  };

  return (
    <div className={`${baseClasses} ${positionClasses[position]} flex flex-col items-center justify-center gap-2`}>
      <p className="text-gray-400 text-sm font-medium">Sponsor spot available! Make it yours 🎉</p>
      <Button size="sm" variant="outline">
        <Link href="https://x.com/FedericoFan" target="_blank">
          Reach me out on X
        </Link>
      </Button>
    </div>
  );
};

export default Sponsor;
