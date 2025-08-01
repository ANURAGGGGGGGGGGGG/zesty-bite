/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ✅ disables ESLint for next build & deploy
  },
  images: {
    domains: [
      "b.zmtcdn.com",
      "static.toiimg.com",
      "media-assets.swiggy.com",
      "s7d1.scene7.com",
      "www.inspiredtaste.net",
      "ichef.bbci.co.uk",
      "images-prod.healthline.com",
      "cdn.loveandlemons.com"
    ]
  }
};

export default nextConfig;
