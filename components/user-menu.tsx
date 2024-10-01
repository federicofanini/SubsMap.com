"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export function UserMenu() {
  const { user } = useKindeBrowserClient();
  const [userProfile, setUserProfile] = useState({
    picture: "",
    given_name: "",
    family_name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setUserProfile({
        picture: user.picture || "",
        given_name: user.given_name || "",
        family_name: user.family_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const fullName = `${userProfile.given_name} ${userProfile.family_name}`.trim() || "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={userProfile.picture} alt={userProfile.given_name} />
          <AvatarFallback>{userProfile.given_name?.[0] || userProfile.family_name?.[0] || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="font-semibold text-sm">{fullName}</div>
          <div className="text-xs text-muted-foreground">{userProfile.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button variant="ghost" size="sm" className="w-full justify-start text-rose-500" asChild>
            <LogoutLink>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </LogoutLink>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
