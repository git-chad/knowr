/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logowik.com" },
      { protocol: "https", hostname: "www.chocogram.com.au" },
    ],
  },
};

export default nextConfig;
