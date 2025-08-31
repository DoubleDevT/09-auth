import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
    },
};

const NextConfig = {
    experimental: {
        typedRoutes: false,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};
export default nextConfig;
