import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Coins } from "lucide-react";

const TopBarMenu: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Startup Portfolio</h2>
      <div className="space-x-2">
        <Link href="/dashboard/business/expenses">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Coins className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Business Expenses</span>
          </Button>
        </Link>
        <Link href="/dashboard/business/add">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Startup</span>
          </Button>
        </Link>
        <Link href="/dashboard/business/delete">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Trash2 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Delete Startup</span>
          </Button>
        </Link>
        <Button variant="outline" size="sm" className="sm:hidden">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="sm:hidden">
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopBarMenu;
