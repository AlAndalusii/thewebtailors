import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    forceSwcTransforms: true,
    webVitalsAttribution: ['CLS', 'LCP'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    allowedDevOrigins: [
      '192.168.1.162:3000',
      '192.168.1.162:3001', 
      '192.168.1.162:3002',
      '192.168.1.162:3003',
      'localhost:3000',
      'localhost:3001',
      'localhost:3002', 
      'localhost:3003'
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    emotion: false,
    styledComponents: false,
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  trailingSlash: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle size optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Framework chunk (React, Next.js)
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // UI libraries chunk
          ui: {
            name: 'ui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@radix-ui|framer-motion|lucide-react)[\\/]/,
            priority: 30,
          },
        },
      };
    }

    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };

    return config;
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/(.*)\\.(png|jpg|jpeg|gif|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

export default nextConfig
