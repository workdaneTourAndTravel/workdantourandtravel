import { getContactInfo } from '@/lib/strapi/api'
import UAEBusinessConsultant from './uae-business-client'

export default async function UAEBusinessPage() {
  let whatsappNumber = "251906700007"
  try {
    const contactInfo = await getContactInfo()
    if (contactInfo.whatsapp_number) whatsappNumber = contactInfo.whatsapp_number
  } catch {}

  return <UAEBusinessConsultant whatsappNumber={whatsappNumber} />
}
