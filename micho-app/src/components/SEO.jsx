import React from 'react'
import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://michoturkishbargrill.co.uk'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

// Shared LocalBusiness + Restaurant JSON-LD – embedded on every page
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'BarOrPub'],
  '@id': `${BASE_URL}/#restaurant`,
  name: 'Micho Turkish Bar & Grill',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  image: DEFAULT_IMAGE,
  description:
    'Authentic Turkish Bar & Grill in Sheffield. Charcoal-grilled meats, fresh meze, and 25 years of culinary heritage. Family-run since 1999.',
  telephone: '+441143492043',
  email: 'info@michoturkishbargrill.co.uk',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '200 Crookes',
    addressLocality: 'Sheffield',
    addressRegion: 'South Yorkshire',
    postalCode: 'S10 1TG',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 53.3826,
    longitude: -1.496,
  },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday'], opens: '16:00', closes: '23:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Wednesday', 'Thursday'], opens: '16:00', closes: '23:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '12:00', closes: '23:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '12:00', closes: '21:00' },
    ],
  servesCuisine: ['Turkish', 'Mediterranean', 'Bar food'],
  priceRange: '££',
  hasMap: 'https://maps.google.com/?q=200+Crookes+Sheffield+S10+1TG',
  sameAs: [
    'https://instagram.com/michoturkishbargrill',
    'https://facebook.com/michoturkishbargrill',
    'https://michoturkishbargrill.co.uk',
  ],
}

/**
 * SEO component – drop into any page
 * @param {string} title         – page <title>
 * @param {string} description   – meta description (~155 chars)
 * @param {string} canonical     – canonical path, e.g. '/menu'
 * @param {object} [pageSchema]  – extra JSON-LD object for this specific page
 */
export default function SEO({ title, description, canonical = '/', pageSchema = null }) {
  const canonicalUrl = `${BASE_URL}${canonical}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      ...(canonical !== '/'
        ? [{ '@type': 'ListItem', position: 2, name: title.split('|')[0].trim(), item: canonicalUrl }]
        : []),
    ],
  }

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Micho Turkish Bar & Grill" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {/* Geo */}
      <meta name="geo.region" content="GB-SYK" />
      <meta name="geo.placename" content="Sheffield" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {pageSchema && <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>}
    </Helmet>
  )
}
