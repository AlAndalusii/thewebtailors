/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-dialog',
      'sonner',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-toast',
    ],
    forceSwcTransforms: true,
    allowedDevOrigins: ['192.168.1.162:3000'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  compress: true,
}

export default nextConfig
