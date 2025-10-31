import { getTourLinks, getServiceLinks } from '@/lib/strapi/api'
import FooterClient from './footer-client'

export default async function Footer() {
  // Fetch tour links from Strapi
  let tourLinks = []
  let serviceLinks = []

  try {
    tourLinks = await getTourLinks()
  } catch (error) {
    console.error('Failed to fetch tour links for footer:', error)
    // Fallback to empty array if fetch fails
    tourLinks = []
  }

  try {
    serviceLinks = await getServiceLinks()
  } catch (error) {
    console.error('Failed to fetch service links for footer:', error)
    // Fallback to empty array if fetch fails
    serviceLinks = []
  }

  return <FooterClient tourLinks={tourLinks} serviceLinks={serviceLinks} />
}
