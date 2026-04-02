import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getServicePageBySlug, getAllServiceSlugs, getStrapiImageUrl, getSiteLogo } from '@/lib/strapi/api'
import { Card, CardContent } from '@/components/ui/card'
import { BookingModal } from './booking-modal'
import { FAQSection } from './faq-section'
import { CheckCircle2 } from 'lucide-react'

// Generate static params for all service pages
export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()

  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [service, siteLogo] = await Promise.all([
    getServicePageBySlug(params.slug),
    getSiteLogo(),
  ])
  const siteName = siteLogo.site_name || 'Werkdan Tour and Travel'

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} | ${siteName}`,
    description: service.section_description || service.short_description || `Explore our ${service.title} service`,
  }
}

// Color schemes for different services
const colorSchemes: Record<string, { gradient: string; border: string; text: string; bg: string; hover: string; cardBg: string }> = {
  blue: {
    gradient: 'from-blue-600 to-cyan-600',
    border: 'border-blue-200',
    text: 'text-blue-600',
    bg: 'bg-blue-100',
    hover: 'hover:bg-blue-700',
    cardBg: 'bg-blue-50',
  },
  green: {
    gradient: 'from-green-600 to-emerald-600',
    border: 'border-green-200',
    text: 'text-green-600',
    bg: 'bg-green-100',
    hover: 'hover:bg-green-700',
    cardBg: 'bg-green-50',
  },
  purple: {
    gradient: 'from-purple-600 to-pink-600',
    border: 'border-purple-200',
    text: 'text-purple-600',
    bg: 'bg-purple-100',
    hover: 'hover:bg-purple-700',
    cardBg: 'bg-purple-50',
  },
  orange: {
    gradient: 'from-orange-600 to-amber-600',
    border: 'border-orange-200',
    text: 'text-orange-600',
    bg: 'bg-orange-100',
    hover: 'hover:bg-orange-700',
    cardBg: 'bg-orange-50',
  },
}

function determineColorScheme(slug: string): string {
  if (slug.includes('visa')) return 'blue'
  if (slug.includes('consultation') || slug.includes('planning')) return 'orange'
  if (slug.includes('business') || slug.includes('uae')) return 'green'
  if (slug.includes('immigration')) return 'purple'
  return 'blue' // default
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  // Fetch service data from Strapi
  const service = await getServicePageBySlug(params.slug)

  // If no service found, show 404
  if (!service) {
    notFound()
  }

  // Determine color scheme based on slug
  const colorKey = determineColorScheme(params.slug)
  const colors = colorSchemes[colorKey]

  // Get section image (first one if multiple)
  const sectionImage = service.section_image && service.section_image.length > 0
    ? service.section_image[0]
    : service.hero_image

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10"></div>
        <Image
          src={getStrapiImageUrl(service.hero_image)}
          alt={`${service.title} Service`}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {service.hero_title || service.title}
          </h1>
          {service.hero_subtitle && (
            <p className="text-xl md:text-2xl drop-shadow-md max-w-2xl mx-auto">
              {service.hero_subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image */}
          {sectionImage && (
            <div className="space-y-4">
              <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={getStrapiImageUrl(sectionImage)}
                  alt={`${service.title} Main`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              {service.section_title && (
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.section_title}</h2>
              )}
              {service.section_description && (
                <div className="prose prose-lg max-w-none">
                  {service.section_description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 text-lg leading-relaxed mb-4">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            {service.stats && service.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {service.stats.map((stat, index) => (
                  <Card key={index} className={`border-none ${colors.cardBg}`}>
                    <CardContent className="p-6 text-center">
                      <p className={`text-3xl font-bold ${colors.text} mb-2`}>{stat.value}+</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      {service.offers && service.offers.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {service.offer_title || 'What We Offer'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.offers.map((offer, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center mb-4`}>
                      <CheckCircle2 className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{offer.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {offer.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQSection faqs={service.faqs} />
      )}

      {/* CTA Section */}
      <section className={`py-16 px-4 bg-gradient-to-r ${colors.gradient}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {service.cta_section_title || `Ready to Get Started with ${service.title}?`}
          </h2>
          {service.cta_section_description && (
            <div className="prose prose-lg prose-invert max-w-none">
              {service.cta_section_description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          )}
          <BookingModal
            tourTitle={service.title}
            whatsappNumber={service.whatsapp_number || '251906700007'}
            buttonClassName={`bg-white ${colors.text} hover:bg-gray-50 text-lg px-8 py-4 h-auto font-semibold`}
          />
        </div>
      </section>
    </div>
  )
}
