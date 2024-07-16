/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.pexels.com",
    //     port: "",
    //     pathname: "/photos/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "via.placeholder.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: [
    //       "indiestreet.s3.ap-south-1.amazonaws.com",
    //       "indiestreet.s3.amazonaws.com",
    //     ],
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
  },
};

export default nextConfig;
