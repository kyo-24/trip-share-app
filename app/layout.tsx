import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { SideNav } from "@/components/layout/SideNav";
import { MainNav } from "@/components/layout/MainNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Trip Share",
    description: "思い出の旅を、みんなで共有",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <head>
                <title>Trip Share - 思い出の旅を、みんなで共有</title>
                <meta
                    name="description"
                    content="友人や家族と旅行の計画から思い出まで共有できるプラットフォーム"
                />
            </head>
            <body className={inter.className}>
                <div className="flex h-screen overflow-hidden">
                    <SideNav />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <MainNav />
                        <main className="flex-1 overflow-y-auto">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
