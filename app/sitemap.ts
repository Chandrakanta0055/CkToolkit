import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ck-toolkit.vercel.app';

  // Add all static routes
  const routes = [
    '',
    '/guide',
    '/saved',
    '/privacy',
    '/terms',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add all individual tool routes
  const tools = [
    '/tools/image/compressor',
    '/tools/image/converter',
    '/tools/image/resize',
    '/tools/pdf/image-to-pdf',
    '/tools/pdf/merge',
    '/tools/pdf/split',
    '/tools/developer/json-formatter',
    '/tools/developer/base64',
    '/tools/developer/uuid',
    '/tools/developer/diff',
    '/tools/developer/code-to-image',
    '/tools/developer/color-picker',
    '/tools/utilities/qr-generator',
    '/tools/utilities/password-generator',
    '/tools/utilities/unit-converter',
    '/tools/utilities/text-case',
    '/tools/utilities/word-counter',
    '/tools/utilities/data-transformer'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // Tools are the most important pages after the homepage
  }));

  return [...routes, ...tools];
}
