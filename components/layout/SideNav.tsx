"use client";

import { cn } from "@/lib/utils";
import {
  Calendar,
  Compass,
  Home,
  Image,
  LogOut,
  Map,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
// import { usePathname } from "next/navigation";

const navigation = [
  { name: "ダッシュボード", href: "/", icon: Home },
  { name: "旅行プラン", href: "/trips", icon: Compass },
  { name: "カレンダー", href: "/calendar", icon: Calendar },
  { name: "アルバム", href: "/albums", icon: Image },
  { name: "メンバー", href: "/members", icon: Users },
  { name: "スポット", href: "/spots", icon: Map },
];

const bottomNavigation = [
  { name: "設定", href: "/settings", icon: Settings },
  { name: "ログアウト", href: "/logout", icon: LogOut },
];

export function SideNav() {
  // const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r border-border transition-all duration-500 w-64 pt-16 shadow-lg"
      )}
    >
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          // const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 text-sm rounded-md transition-colors hover:bg-primary/10"
                // isActive
                //   ? "bg-blue-500 text-primary-foreground"
                //   : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0 text-primary" />
              <span
                className={cn(
                  "transition-opacity duration-300 text-gray-600 font-bold"
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
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 text-sm text-muted-foreground rounded-md hover:bg-muted transition-colors hover:bg-primary/10"
            >
              <item.icon className="h-5 w-5 shrink-0 text-primary" />
              <h2 className={cn("transition-opacity duration-300 font-bold")}>
                {item.name}
              </h2>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
