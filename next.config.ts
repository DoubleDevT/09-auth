import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "ac.goit.global",
            },
            {
                protocol: "https",
                hostname: "notehub-api.goit.study",
            },
        ],
    },
    experimental: {
        typedRoutes: false,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
