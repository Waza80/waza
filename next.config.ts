import type { NextConfig } from "next";
import withNextJsObfuscator from 'nextjs-obfuscator';
import withExportImages from 'next-export-optimize-images';

const nextConfig: NextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/*',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '*.discordapp.*',
        port: '',
        pathname: '/*',
        search: '',
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