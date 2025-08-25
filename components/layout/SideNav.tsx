"use client";

import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import {
    Calendar,
    Home,
    Image,
    LogOut,
    Map,
    Settings,
    Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../ui/button";
// import { usePathname } from "next/navigation";

const navigation = [
    { name: "ホーム", href: "/", icon: Home },
    { name: "カレンダー", href: "/calendar", icon: Calendar },
    { name: "アルバム", href: "/albums", icon: Image },
    { name: "メンバー", href: "/members", icon: Users },
    { name: "スポット", href: "/spots", icon: Map },
];

// const bottomNavigation = [
//     { name: "設定", href: "/settings", icon: Settings },
//     { name: "サインアウト", href: "/logout", icon: LogOut },
// ];

export function SideNav() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <div
            className={cn(
                "flex flex-col bg-white border-r border-border transition-all duration-500 w-64 pt-3 shadow-lg"
            )}
        >
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
            <nav className="flex-1 px-4 py-10 space-y-1">
                {navigation.map((item) => {
                    // const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 pl-8 py-3 text-sm rounded-md transition-colors hover:bg-primary/10"
                                // isActive
                                //   ? "bg-blue-500 text-primary-foreground"
                                //   : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <item.icon className="h-5 w-5 shrink-0 text-primary" />
                            <span
                                className={cn(
                                    "transition-opacity duration-300 text-gray-600 font-bold pl-1"
                                )}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-300">
                <nav className="space-y-1">
                    <Link
                        href={"/settings"}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-muted-foreground rounded-md hover:bg-muted transition-colors hover:bg-primary/10"
                    >
                        <Settings className="h-5 w-5 shrink-0 text-primary" />
                        <h2
                            className={cn(
                                "transition-opacity duration-300 font-bold"
                            )}
                        >
                            設定
                        </h2>
                    </Link>
                    <Modal
                        title="サインアウト"
                        isOpen={isOpenModal}
                        trigger={
                            <div
                                className="flex items-center gap-3 px-3 py-3 text-sm text-muted-foreground rounded-md hover:bg-muted transition-colors hover:bg-primary/10 cursor-pointer"
                                onClick={() => setIsOpenModal(true)}
                            >
                                <LogOut className="h-5 w-5 shrink-0 text-primary" />
                                <h2
                                    className={cn(
                                        "transition-opacity duration-300 font-bold"
                                    )}
                                >
                                    サインアウト
                                </h2>
                            </div>
                        }
                        onOpenChange={setIsOpenModal}
                    >
                        <div>
                            <p className="mb-4">本当にサインアウトしますか？</p>
                            <div className="flex justify-end space-x-3">
                                <Button
                                    variant={"secondary"}
                                    className="bg-gray-100 hover:bg-gray-200"
                                    onClick={() => {
                                        setIsOpenModal(false);
                                    }}
                                >
                                    キャンセル
                                </Button>
                                <SignOutButton>
                                    <Button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
                                        サインアウト
                                    </Button>
                                </SignOutButton>
                            </div>
                        </div>
                    </Modal>
                </nav>
            </div>
        </div>
    );
}
