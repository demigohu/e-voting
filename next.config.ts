import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "salmon-faithful-duck-739.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
