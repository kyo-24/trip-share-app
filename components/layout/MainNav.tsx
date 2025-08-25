"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchTripsAction } from "@/lib/actions/trips";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type TripSuggestion = { id: number; title: string; createdAt: string };

export function MainNav() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [items, setItems] = useState<TripSuggestion[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const lastReqIdRef = useRef(0);

    const search = useMemo(() => {
        let timer: NodeJS.Timeout | null = null;
        return (q: string) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(async () => {
                const trimmed = q.trim();
                if (!trimmed) {
                    setItems([]);
                    setOpen(false);
                    return;
                }
                setLoading(true);
                const reqId = ++lastReqIdRef.current;
                try {
                    const results = await searchTripsAction(trimmed, 8);
                    // 最新リクエストのみ反映
                    if (reqId === lastReqIdRef.current) {
                        setItems(results || []);
                        setOpen(true);
                    }
                } finally {
                    if (reqId === lastReqIdRef.current) setLoading(false);
                }
            }, 250);
        };
    }, []);

    useEffect(() => {
        search(query);
    }, [query, search]);

    const onSelect = (id: number) => {
        setOpen(false);
        setQuery("");
        router.push(`/trip/${id}`);
    };
    return (
        <header className="border-b border-border bg-white shadow-lg">
            <div className="flex justify-between h-16 items-center px-8 gap-4">
                <div>
                    <div className="relative max-w-md ml-auto flex items-center gap-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="旅行プランを検索..."
                            className="pl-8 bg-white w-100"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => items.length > 0 && setOpen(true)}
                        />
                        {open && (
                            <div className="absolute top-[100%] z-50 w-100 bg-white border-2 rounded-md shadow-lg">
                                <div className="max-h-80 overflow-auto divide-y-1 divide-gray/20">
                                    {loading && (
                                        <div className="px-3 py-2 text-sm text-muted-foreground">
                                            検索中...
                                        </div>
                                    )}
                                    {!loading && items.length === 0 && (
                                        <div className="px-3 py-2 text-sm text-muted-foreground">
                                            候補がありません
                                        </div>
                                    )}
                                    {!loading &&
                                        items.map((t) => (
                                            <button
                                                key={t.id}
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                onClick={() => onSelect(t.id)}
                                                className="w-full text-left px-3 py-2 hover:bg-gray/10 cursor-pointer"
                                            >
                                                <div className="font-medium text-sm">
                                                    {t.title}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    作成日:{" "}
                                                    {new Date(
                                                        t.createdAt
                                                    ).toLocaleDateString(
                                                        "ja-JP"
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
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
