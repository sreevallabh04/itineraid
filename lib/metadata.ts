import { Metadata } from 'next'

type MetadataProps = {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
}

/**
 * Base application metadata, used as defaults for all pages
 */
export const siteConfig = {
  name: 'ItinerAid',
  description: 'Your cinematic travel planning platform',
  url: 'https://itineraid.vercel.app',
  ogImage: 'https://itineraid.vercel.app/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/itineraid',
    github: 'https://github.com/itineraid',
  },
  creator: 'ItinerAid Team',
  keywords: [
    'travel',
    'itinerary',
    'trip planner',
    'vacation',
    'journey',
    'destination',
    'travel planning',
    'travel app',
  ],
  authors: [
    {
      name: 'ItinerAid Team',
      url: 'https://itineraid.vercel.app',
    },
  ],
}

/**
 * Generate metadata for a page
 */
export function generateMetadata({
  title,
  description,
  image,
  keywords = [],
  noIndex = false,
}: MetadataProps): Metadata {
  // Create page title with site name
  const pageTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : siteConfig.name

  // Use custom description or default site description
  const pageDescription = description || siteConfig.description

  // Use custom image or default OG image
  const ogImage = image || siteConfig.ogImage

  // Combine default and custom keywords
  const combinedKeywords = [...siteConfig.keywords, ...keywords]

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: combinedKeywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
      creator: '@itineraid',
    },
    icons: {
      icon: [
        {
          url: '/favicon.ico',
          sizes: '32x32',
          type: 'image/x-icon',
        },
        {
          url: '/icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
      apple: {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    },
    manifest: '/manifest.json',
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },
    verification: {
      google: 'google-site-verification',
    },
  }
}

/**
 * Generate structured data for a page (JSON-LD)
 */
export function generateStructuredData(type: 'website' | 'article' | 'product', data: any): string {
  let structuredData = {}

  switch (type) {
    case 'website':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        ...data,
      }
      break
    case 'article':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        image: data.image || siteConfig.ogImage,
        author: {
          '@type': 'Person',
          name: data.author || siteConfig.creator,
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/logo.png`,
          }
        },
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate || data.publishedDate,
        ...data,
      }
      break
    case 'product':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        image: data.image,
        description: data.description,
        ...data,
      }
      break
    default:
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        ...data,
      }
  }

  return JSON.stringify(structuredData)
}