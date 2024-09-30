"use client"

import * as React from "react"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const activeTeam = teams[0]

  return (
    <div className="flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm">
      <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-primary-foreground">
        <activeTeam.logo className="h-3.5 w-3.5 shrink-0" />
      </div>
      <div className="line-clamp-1 flex-1 pr-2 font-semibold">
        {activeTeam.name}
      </div>
    </div>
  )
}
