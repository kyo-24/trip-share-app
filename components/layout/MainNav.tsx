"use client";

import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function MainNav() {
  return (
    <header className="border-b border-gray-300 bg-card">
      <div className="flex h-16 items-center px-4 gap-4">
        <Link href={"/"}>
          <div className="flex items-center gap-2 mr-8 cursor-pointer">
            <h1 className="text-xl font-bold text-primary">Trip Share</h1>
            <p className="text-sm text-muted-foreground hidden md:block">
              思い出の旅を、みんなで
            </p>
          </div>
        </Link>
        <div className="flex-1">
          <div className="relative max-w-md ml-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="旅行プランを検索..."
              className="pl-8 bg-muted/50"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
