/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { getInitials } from "@/lib/utils";
import { logoutUser } from "@/lib/actions/auth";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useUser } from "@/hooks/use-user";

const UserDropdown = () => {
  const { user, loading }: any = useUser();

  if (loading) return null;

  if (!user) return null;

  const initials = getInitials(user?.username);
  const avatarUrl = `https://avatar.vercel.sh/${encodeURIComponent(
    user.username
  )}.svg?text=${initials}`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={user?.username} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user?.username}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/my-orders" className="flex items-center w-full">
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={async () => {
            await logoutUser();
            window.location.reload();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
