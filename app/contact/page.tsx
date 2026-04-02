import { getContactInfo } from '@/lib/strapi/api'
import ContactClient from './contact-client'

export default async function ContactPage() {
  let contactInfo = {}
  try {
    contactInfo = await getContactInfo()
  } catch (error) {
    console.error('Failed to fetch contact info:', error)
  }

  return <ContactClient contactInfo={contactInfo} />
}
