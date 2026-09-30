import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 writes AGENTS.md / CLAUDE.md into the project on `next dev`;
  // README.md is meant to stay the only markdown doc here.
  agentRules: false,
};

export default nextConfig;
