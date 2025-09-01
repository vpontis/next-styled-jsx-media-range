/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledJsx: {
      useLightningcss: true,
    },
  },
};

export default nextConfig;
