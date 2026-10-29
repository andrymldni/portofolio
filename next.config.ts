import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 writes AGENTS.md / CLAUDE.md into the project on `next dev`;
  // README.md is meant to stay the only markdown doc here.
  agentRules: false,
  // This public hostname also keeps shared SITE_URL imports consistent on the client.
  env: {
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "",
  },
};

export default nextConfig;
