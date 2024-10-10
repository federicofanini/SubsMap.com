"use client"

import React from 'react'
import { StartupSub } from '@/components/business/StartupSub'
import { Card } from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import BusinessSubTable from '@/components/business/BusinessSubTable'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function BusinessExpensesPage() {
  const [refreshKey, setRefreshKey] = React.useState(0)
  const router = useRouter()

  const handleNewSubscription = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  return (
    <div className="max-w-4xl mx-auto bg-black text-white p-4 rounded-lg mt-4">
      <div className="flex items-center mb-4">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="mr-4">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Business Expenses</h1>
      </div>
      <Separator className="my-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StartupSub onNewSubscription={handleNewSubscription} startupId="business" />
        
        <BusinessSubTable 
          onDelete={handleNewSubscription} 
          newSubscriptionAdded={refreshKey > 0} 
        />
      </div>
    </div>
  )
}
