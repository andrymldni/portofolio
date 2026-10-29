const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const SITE_URL = (
  configuredUrl ||
  (productionDomain ? `https://${productionDomain}` : "https://andrymldni-portfolio.vercel.app")
).replace(/\/+$/, "");
