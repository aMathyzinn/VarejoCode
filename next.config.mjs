/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  trailingSlash: true,
  reactStrictMode: true,
  
  // Otimização de imagens
  images: {
    unoptimized: true, // Necessário para exportação estática
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96],
    minimumCacheTTL: 31536000, // 1 ano de cache
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compressão automática
  compress: true,

  // Otimização de bundle

  // Performance Optimizations
  poweredByHeader: false,
  generateEtags: false,
  
  // Optimize output
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },

};

export default nextConfig;
