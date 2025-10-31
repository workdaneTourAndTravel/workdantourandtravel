// Strapi API utility functions

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export interface StrapiImage {
  url: string
  formats?: {
    large?: { url: string }
    medium?: { url: string }
    small?: { url: string }
    thumbnail?: { url: string }
  }
}

export interface TourPage {
  id: number
  slug: string
  title: string
  short_description?: string
  price?: string
  price_note?: string
  hero_image?: StrapiImage
  main_image?: StrapiImage
  services?: Array<{
    icon: string
    title: string
    description?: string
  }>
  highlights?: Array<{
    title: string
    description: string
    order: number
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  cta_title?: string
  cta_description?: string
  whatsapp_number?: string
}

/**
 * Get the full URL for a Strapi image
 */
export function getStrapiImageUrl(image: StrapiImage | null | undefined): string {
  if (!image) return '/placeholder.svg'

  const url = image?.formats?.large?.url || image?.formats?.medium?.url || image?.url

  if (!url) return '/placeholder.svg'

  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

/**
 * Fetch all tour pages from Strapi
 */
export async function getAllTourPages(): Promise<TourPage[]> {
  try {
    const url = `${STRAPI_URL}/api/tour-pages?populate=*`

    const response = await fetch(url, {
      // Revalidate every hour in production, or on-demand in dev
      next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tour pages: ${response.statusText}`)
    }

    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error('Error fetching all tour pages:', error)
    return []
  }
}

/**
 * Fetch a single tour page by slug from Strapi
 */
export async function getTourPageBySlug(slug: string): Promise<TourPage | null> {
  try {
    const url = `${STRAPI_URL}/api/tour-pages?filters[slug][$eq]=${slug}&populate=*`

    const response = await fetch(url, {
      // Revalidate every hour in production
      next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tour page: ${response.statusText}`)
    }

    const result = await response.json()

    if (!result.data || result.data.length === 0) {
      return null
    }

    return result.data[0]
  } catch (error) {
    console.error(`Error fetching tour page with slug "${slug}":`, error)
    return null
  }
}

/**
 * Get all tour page slugs for static generation
 */
export async function getAllTourSlugs(): Promise<string[]> {
  try {
    const tours = await getAllTourPages()
    return tours.map(tour => tour.slug).filter(Boolean)
  } catch (error) {
    console.error('Error fetching tour slugs:', error)
    return []
  }
}

// lib/strapi/api.ts
export async function getTourLinks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tour-pages?fields[0]=package_list_name&fields[1]=slug`, {
    next: { revalidate: 0 }, // revalidate every hour
  });
  const { data } = await res.json();
  return data.map((item: any) => ({
    title: item.package_list_name,
    slug: item.slug,
  }));
}

// ==================== SERVICE PAGES ====================

export interface ServicePage {
  id: number
  documentId: string
  slug: string
  title: string
  short_description?: string
  hero_title?: string
  hero_subtitle?: string
  hero_image?: StrapiImage
  section_title?: string
  section_description?: string
  section_image?: StrapiImage[]
  offer_title?: string
  stats?: Array<{
    label: string
    value: string
  }>
  offers?: Array<{
    title: string
    description: string
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  faq_title?: string
  cta_section_title?: string
  cta_section_description?: string
  cta_button_text?: string
  cta_button_label?: string
  cta_button_link?: string
  whatsapp_number?: string
}

/**
 * Fetch all service pages from Strapi
 */
export async function getAllServicePages(): Promise<ServicePage[]> {
  try {
    const url = `${STRAPI_URL}/api/service-pages?populate=*`

    const response = await fetch(url, {
      // Revalidate every hour in production, or on-demand in dev
      next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch service pages: ${response.statusText}`)
    }

    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error('Error fetching all service pages:', error)
    return []
  }
}

/**
 * Fetch a single service page by slug from Strapi
 */
export async function getServicePageBySlug(slug: string): Promise<ServicePage | null> {
  try {
    const url = `${STRAPI_URL}/api/service-pages?filters[slug][$eq]=${slug}&populate=*`

    const response = await fetch(url, {
      // Revalidate every hour in production
      next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch service page: ${response.statusText}`)
    }

    const result = await response.json()

    if (!result.data || result.data.length === 0) {
      return null
    }

    return result.data[0]
  } catch (error) {
    console.error(`Error fetching service page with slug "${slug}":`, error)
    return null
  }
}

/**
 * Get all service page slugs for static generation
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const services = await getAllServicePages()
    return services.map(service => service.slug).filter(Boolean)
  } catch (error) {
    console.error('Error fetching service slugs:', error)
    return []
  }
}

/**
 * Get service links for navigation
 */
export async function getServiceLinks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service-pages?fields[0]=title&fields[1]=slug`, {
    next: { revalidate: 0 },
  });
  const { data } = await res.json();
  return data.map((item: any) => ({
    title: item.title,
    slug: item.slug,
  }));
}

