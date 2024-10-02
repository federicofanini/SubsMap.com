"use client"

import * as React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { TeamSwitcher } from "../team-switcher"
import { data } from "../app-sidebar"
import { UserMenu } from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarIcon, TrophyIcon } from "lucide-react"

export const SIDEBAR_STATE_COOKIE = "sidebar:state"

type SidebarContext = {
  state: "open" | "closed"
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContext>({
  state: "open",
  open: true,
  onOpenChange: () => {},
})

function useSidebar() {
  return React.useContext(SidebarContext)
}

const SidebarLayout = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
  }
>(({ defaultOpen, className, ...props }, ref) => {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setOpen(defaultOpen ?? true)
  }, [defaultOpen])

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open)
    document.cookie = `${SIDEBAR_STATE_COOKIE}=${open}; path=/; max-age=${
      60 * 60 * 24 * 7
    }`
  }, [])

  const state = open ? "open" : "closed"

  if (!mounted) {
    return null
  }

  return (
    <SidebarContext.Provider value={{ state, open, onOpenChange }}>
      <div
        ref={ref}
        data-sidebar={state}
        style={
          {
            "--sidebar-width": "16rem",
          } as React.CSSProperties
        }
        className={cn(
          "flex min-h-screen bg-accent/50 pl-0 transition-all duration-300 ease-in-out data-[sidebar=closed]:pl-0 sm:pl-[--sidebar-width]",
          className
        )}
        {...props}
      />
    </SidebarContext.Provider>
  )
})
SidebarLayout.displayName = "SidebarLayout"

const routeNames: { [key: string]: string } = {
  
  // Add more route mappings as needed
}

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <TeamSwitcher teams={data.teams} />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Link href="/dashboard" className="flex items-center gap-2">
            <CalendarIcon className="size-3" />
            Calendar 
          </Link>
        </Button>
        <Button variant="outline" size="sm">
          <Link href="/dashboard/leaderboard" className="flex items-center gap-2">
            <TrophyIcon className="size-3" />
            Leaderboard
          </Link>
        </Button>
        <UserMenu />
      </div>
    </div>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const Sidebar = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children }, ref) => {
    const isMobile = useIsMobile()
    const { open, onOpenChange } = useSidebar()

    const sidebar = (
      <div
        ref={ref}
        className={cn("flex h-full flex-col border-r bg-background", className)}
      >
        {children}
      </div>
    )

    if (isMobile) {
      return (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent
            className="w-[260px] p-0 md:w-[--sidebar-width] [&>button]:hidden"
            side="left"
          >
            {sidebar}
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[--sidebar-width] transition-all duration-300 ease-in-out md:block [[data-sidebar=closed]_&]:left-[calc(var(--sidebar-width)*-1)]">
        {sidebar}
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center border-b px-2.5 py-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center border-t px-2.5 py-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-1 flex-col gap-5 overflow-auto py-4", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("grid gap-1 px-2.5", className)} {...props} />
  )
})
SidebarItem.displayName = "SidebarItem"

const SidebarLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "px-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarLabel.displayName = "SidebarLabel"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarLayout,
  SidebarTrigger,
  useSidebar,
}
