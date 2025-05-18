import type { NextConfig } from "next";
import withNextJsObfuscator from 'nextjs-obfuscator';
import withExportImages from 'next-export-optimize-images';

const nextConfig: NextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.discordapp.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
    ]
  }
};

export default withNextJsObfuscator({
  debugProtection: true,
}, {
  enabled: "detect",
  obfuscateFiles: {
    buildManifest: true,
    ssgManifest: true,
    webpack: true
  }
})(withExportImages(nextConfig));