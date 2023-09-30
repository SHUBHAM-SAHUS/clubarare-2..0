/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs')

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options
module.exports = withSentryConfig(
  // next.js configuration
  {
    reactStrictMode: true,
    redirects: async () => {
      const IsDashboardEnabled = process.env.NEXT_PUBLIC_ENABLE_DASHBOARD === 'true'
      const dashboardRoute = IsDashboardEnabled ? [] : ['/dashboard']
  
      const forbiddenPaths = [...dashboardRoute]
  
      return forbiddenPaths.map(path => ({
        source: `/${path}/:path*`,
        destination: '/',
        permanent: true,
      }))
    },
    webpack: (config, _) => {
      config.experiments = { ...config.experiments, ...{ topLevelAwait: true } }
      config.resolve.fallback = { fs: false }
      config.module.rules.push({
        test: /\.(pdf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              outputPath: 'static/images',
              name: '[name].[hash].[ext]',
            },
          },
        ],
      })
      return config
    },
    compiler: {
      removeConsole: process.env.NEXT_PUBLIC_DISABLE_CONSOLE === 'true',
    },
    images: {
      domains: [
        'i.seadn.io',
        'd1gqvtt7oelrdv.cloudfront.net',
        'ipfs.io',
        'storage.googleapis.com',
        'nft-preview-media.s3.us-east-1.amazonaws.com',
        'clubrare-nft-storage.s3.amazonaws.com',
        'clubrare2.mypinata.cloud',
      ],
      formats: ['image/avif', 'image/webp'],
    },
  },
  {
    // Suppresses source map uploading logs during build
    silent: true,
    org: 'vital-hint',
    project: 'marketplace-v2',
  },
  {
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,
    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',
    // Hides source maps from generated client bundles
    hideSourceMaps: true,
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
)
