import { getTourLinks } from '@/lib/strapi/api'
import FooterClient from './footer-client'

export default async function Footer() {
  // Fetch tour links from Strapi
  let tourLinks = []

  try {
    tourLinks = await getTourLinks()
  } catch (error) {
    console.error('Failed to fetch tour links for footer:', error)
    // Fallback to empty array if fetch fails
    tourLinks = []
  }

  return <FooterClient tourLinks={tourLinks} />
}
