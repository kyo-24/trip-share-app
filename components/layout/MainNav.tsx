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

export function MainNav() {
    return (
        <header className="border-b border-border bg-white shadow-lg">
            <div className="flex justify-between h-16 items-center px-8 gap-4">
                <div>
                    <div className="relative max-w-md ml-auto flex items-center gap-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="旅行プランを検索..."
                            className="pl-8 bg-white w-90"
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
