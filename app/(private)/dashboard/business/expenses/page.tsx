"use client"

import React from 'react'
import { StartupSub } from '@/components/business/StartupSub'
import { Card } from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import BusinessSubTable from '@/components/business/BusinessSubTable'

export default function BusinessExpensesPage() {
  const [refreshKey, setRefreshKey] = React.useState(0)

  const handleNewSubscription = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  return (
    <div className="max-w-4xl mx-auto bg-black text-white p-4 rounded-lg mt-4">
      <h1 className="text-2xl font-bold mb-4">Business Expenses</h1>
      <Separator className="my-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-900 border-gray-800 p-4">
          <StartupSub onNewSubscription={handleNewSubscription} startupId="business" />
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 p-4">
          <h2 className="text-xl font-semibold mb-4">Expense List</h2>
          <BusinessSubTable 
            onDelete={handleNewSubscription} 
            newSubscriptionAdded={refreshKey > 0} 
          />
        </Card>
      </div>
    </div>
  )
}
