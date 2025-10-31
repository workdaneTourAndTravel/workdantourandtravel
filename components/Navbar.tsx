import { getTourLinks, getServiceLinks } from '@/lib/strapi/api'
import NavbarClient from './navbar-client'

export default async function Navbar() {
  // Fetch tour links from Strapi
  let tourLinks = []
  let serviceLinks = []

  try {
    tourLinks = await getTourLinks()
  } catch (error) {
    console.error('Failed to fetch tour links for navbar:', error)
    // Fallback to empty array if fetch fails
    tourLinks = []
  }

  try {
    serviceLinks = await getServiceLinks()
  } catch (error) {
    console.error('Failed to fetch service links for navbar:', error)
    // Fallback to empty array if fetch fails
    serviceLinks = []
  }

  return <NavbarClient tourLinks={tourLinks} serviceLinks={serviceLinks} />
}
