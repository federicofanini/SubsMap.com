"use client"

import Image from "next/image"
import * as React from "react"

export function TeamSwitcher() {
  return (
    <div className="flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm">
      <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-primary-foreground">
        <Image src="/SubsMap.svg" alt="SubsMap" width={16} height={16} />
      </div>
      <div className="line-clamp-1 flex-1 pr-2 font-bold">
        SubsMap
      </div>
    </div>
  )
}
