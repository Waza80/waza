import type { NextConfig } from "next";
import withNextJsObfuscator from 'nextjs-obfuscator';
import withExportImages from 'next-export-optimize-images';

const nextConfig: NextConfig = {
  images: {
    loader: "default"
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