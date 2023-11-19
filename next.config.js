/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         { hostname: "assets.myntassets.com" },
         { hostname: "**" },
      ],
   },
}

module.exports = nextConfig
