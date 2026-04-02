import { getContactInfo } from '@/lib/strapi/api'
import TravelConsultation from './travel-planning-client'

export default async function TravelPlanningPage() {
  let whatsappNumber = "251906700007"
  try {
    const contactInfo = await getContactInfo()
    if (contactInfo.whatsapp_number) whatsappNumber = contactInfo.whatsapp_number
  } catch {}

  return <TravelConsultation whatsappNumber={whatsappNumber} />
}
