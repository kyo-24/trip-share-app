import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            process.env.NEXT_PUBLIC_SUPABASE_DOMAIN!, // Supabase Storage画像の表示許可
        ],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "54321",
                pathname: "/storage/**",
            },
            {
                protocol: "https",
                hostname: "your-supabase-project.supabase.co",
                pathname: "/storage/**",
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb",
        },
    },
};

export default nextConfig;
