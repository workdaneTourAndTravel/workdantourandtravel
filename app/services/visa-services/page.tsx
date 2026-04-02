import { getContactInfo } from '@/lib/strapi/api'
import VisaServices from './visa-services-client'

export default async function VisaServicesPage() {
  let whatsappNumber = "251906700007"
  try {
    const contactInfo = await getContactInfo()
    if (contactInfo.whatsapp_number) whatsappNumber = contactInfo.whatsapp_number
  } catch {}

  return <VisaServices whatsappNumber={whatsappNumber} />
}
