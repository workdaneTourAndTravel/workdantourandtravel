import { getTourLinks, getServiceLinks, getSiteLogo, getStrapiImageUrl, getContactInfo, getSocialLinks } from '@/lib/strapi/api'
import FooterClient from './footer-client'

export default async function Footer() {
  let tourLinks = []
  let serviceLinks = []
  let logoUrl = '/logo/navbar-workdan-logo.png'
  let siteName = 'Workdane Tour and Travel'

  try {
    tourLinks = await getTourLinks()
  } catch (error) {
    console.error('Failed to fetch tour links for footer:', error)
    tourLinks = []
  }

  try {
    serviceLinks = await getServiceLinks()
  } catch (error) {
    console.error('Failed to fetch service links for footer:', error)
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

  let contactInfo = {}
  try {
    contactInfo = await getContactInfo()
  } catch (error) {
    console.error('Failed to fetch contact info:', error)
  }

  let socialLinks = {}
  try {
    socialLinks = await getSocialLinks()
  } catch (error) {
    console.error('Failed to fetch social links:', error)
  }

  return (
    <FooterClient
      tourLinks={tourLinks}
      serviceLinks={serviceLinks}
      logoUrl={logoUrl}
      siteName={siteName}
      contactInfo={contactInfo}
      socialLinks={socialLinks}
    />
  )
}
