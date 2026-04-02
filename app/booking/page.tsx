import { Suspense } from "react"
import BookingForm from "./BookingForm"
import { getContactInfo } from "@/lib/strapi/api"

export default async function BookingPage() {
  let whatsappNumber = "251906700007"
  try {
    const contactInfo = await getContactInfo()
    if (contactInfo.whatsapp_number) whatsappNumber = contactInfo.whatsapp_number
  } catch {}

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm whatsappNumber={whatsappNumber} />
    </Suspense>
  )
}
