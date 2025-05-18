import type { NextConfig } from "next";
import withNextJsObfuscator from 'nextjs-obfuscator';
import withExportImages from 'next-export-optimize-images';

const nextConfig: NextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      new URL("https://cdn.discordapp.com/**"),
      new URL("https://media.discordapp.net/**"),
      new URL("https://i.scdn.co/**"),
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