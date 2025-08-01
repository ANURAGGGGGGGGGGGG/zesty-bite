/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ✅ disables ESLint for next build & deploy
  },
};

export default nextConfig;
