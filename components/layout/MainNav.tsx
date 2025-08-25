"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";
import Link from "next/link";

export function MainNav() {
    return (
        <header className="border-b border-border bg-white shadow-lg">
            <div className="flex h-16 items-center px-4 gap-4">
                <Link href={"/"}>
                    <div className="flex flex-col items-center mr-8 cursor-pointer">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                            Trip Share
                        </h1>
                        <p className="text-xs hidden md:block">
                            思い出の旅を、みんなで
                        </p>
                    </div>
                </Link>
                <div className="flex-1">
                    <div className="relative max-w-md ml-auto flex items-center gap-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="旅行プランを検索..."
                            className="pl-8 bg-white"
                        />
                        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                            検索
                        </Button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
