"use client"

import { useState, useCallback } from "react";
import Calendar from "@/components/sub/Calendar";
import { InsertSubForm } from "@/components/sub/InsertSub";
import SubTable from "@/components/sub/SubTable";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataChange = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return (
    <>
      <Calendar key={`calendar-${refreshKey}`} />
      <InsertSubForm onNewSubscription={handleDataChange} />
      <SubTable key={`subtable-${refreshKey}`} onDelete={handleDataChange} />
    </>
  )
}
