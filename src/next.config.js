/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  swcMinify: true,
  compress: true,
  
  // Image optimization
  images: {
    domains: ['aegis.health', 'demo.odoo.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  
  // Rewrites for Odoo proxy (production would use nginx)
  async rewrites() {
    return [
      {
        source: '/odoo/:path*',
        destination: `${process.env.ODOO_URL || 'https://demo.odoo.com'}/:path*`
      }
    ];
  },
  
  // Webpack config for Three.js and performance
  webpack: (config, { dev, isServer }) => {
    // Three.js optimization
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: 'raw-loader',
    });
    
    // Bundle analyzer in development
    if (dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          three: {
            name: 'three',
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }
    
    return config;
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Environment variables (production should use proper secrets management)
  env: {
    ODOO_URL: process.env.ODOO_URL,
    AEGIS_VERSION: '2024.1.0',
  }
};

module.exports = nextConfig;