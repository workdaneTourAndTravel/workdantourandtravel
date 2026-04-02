import { getTourLinks, getServiceLinks, getSiteLogo, getStrapiImageUrl } from '@/lib/strapi/api'
import NavbarClient from './navbar-client'

export default async function Navbar() {
  let tourLinks = []
  let serviceLinks = []
  let logoUrl = '/logo/navbar-workdan-logo.png'
  let siteName = 'WORKDANE TOUR AND TRAVEL'

  try {
    tourLinks = await getTourLinks()
  } catch (error) {
    console.error('Failed to fetch tour links for navbar:', error)
    tourLinks = []
  }

  try {
    serviceLinks = await getServiceLinks()
  } catch (error) {
    console.error('Failed to fetch service links for navbar:', error)
    serviceLinks = []
  }

  try {
    const siteLogo = await getSiteLogo()
    if (siteLogo.logo) {
      logoUrl = getStrapiImageUrl(siteLogo.logo)
    }
    if (siteLogo.site_name) {
      siteName = siteLogo.site_name
    }
  } catch (error) {
    console.error('Failed to fetch site logo:', error)
  }

  return <NavbarClient tourLinks={tourLinks} serviceLinks={serviceLinks} logoUrl={logoUrl} siteName={siteName} />
}
