"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

import { usePathname } from 'next/navigation'
import {
  Atom,
  Bird,
  BookOpen,
  Bot,
  Code2,
  Eclipse,
  Frame,
  History,
  LifeBuoy,
  Map,
  PieChart,
  Rabbit,
  Send,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
  Gauge,
  ShieldCheck,
  Router,
  User,
  Settings,
  Rss
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { CQCard } from "@/components/storage-card"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar"

export const data = {
  teams: [
    {
      name: "AstroPort",
      logo: Rss,
      plan: "Enterprise",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Gauge,
      items: [
        {
          title: "Link 1",
          url: "#",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Link 2",
          url: "#",
          icon: History,
          description: "View your recent prompts",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "/dashboard/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/dashboard/feedback",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Demo",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  searchResults: [
    {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    },
  ],
}

export function AppSidebar() {
  const pathname = usePathname()
  

  const [userProfile, setUserProfile] = useState({
    name: 'User',
    email: '',
    avatar: '',
  });

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: (user.given_name && user.family_name) ? `${user.given_name} ${user.family_name}` : (user.given_name || 'User'),
        email: user.email || '',
        avatar: user.picture || '',
      });
    }
  }, [user]);

  const navMainWithActiveState = data.navMain.map(item => ({
    ...item,
    isActive: pathname.startsWith(item.url),
    className: pathname.startsWith(item.url) ? 'bg-blue-500' : '',
  }))

  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel className="text-primary">Analisi</SidebarLabel>
          <NavMain items={navMainWithActiveState} />
        </SidebarItem>
        <SidebarItem>
          <SidebarLabel className="text-primary">Formazione</SidebarLabel>
          <NavProjects projects={data.projects} />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          <SidebarLabel className="text-primary">Assistenza</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
        <SidebarItem>
          <CQCard />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userProfile} />
      </SidebarFooter>
    </Sidebar>
  )
}
