import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTourPageBySlug, getAllTourSlugs, getStrapiImageUrl } from '@/lib/strapi/api'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookingModal } from './booking-modal'
import { FAQSection } from './faq-section'
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'

// Generate static params for all tour pages
export async function generateStaticParams() {
  const slugs = await getAllTourSlugs()

  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tour = await getTourPageBySlug(params.slug)

  if (!tour) {
    return {
      title: 'Tour Not Found',
    }
  }

  return {
    title: `${tour.title} | Werkdan Tour and Travel`,
    description: tour.short_description || `Explore ${tour.title} with our comprehensive travel package`,
  }
}

// Helper function to get Lucide icon by name
const getIconComponent = (iconName: string): LucideIcon => {
  const Icon = (LucideIcons as any)[iconName]
  return Icon || LucideIcons.HelpCircle
}

// Color schemes for different tours
const colorSchemes: Record<string, { gradient: string; border: string; text: string; bg: string; hover: string }> = {
  blue: {
    gradient: 'from-blue-600 to-cyan-600',
    border: 'border-blue-200',
    text: 'text-blue-600',
    bg: 'bg-blue-100',
    hover: 'hover:bg-blue-700',
  },
  red: {
    gradient: 'from-red-600 to-orange-600',
    border: 'border-red-200',
    text: 'text-red-600',
    bg: 'bg-red-100',
    hover: 'hover:bg-red-700',
  },
  green: {
    gradient: 'from-green-600 to-emerald-600',
    border: 'border-green-200',
    text: 'text-green-600',
    bg: 'bg-green-100',
    hover: 'hover:bg-green-700',
  },
  purple: {
    gradient: 'from-purple-600 to-pink-600',
    border: 'border-purple-200',
    text: 'text-purple-600',
    bg: 'bg-purple-100',
    hover: 'hover:bg-purple-700',
  },
}

function determineColorScheme(slug: string): string {
  if (slug.includes('china')) return 'red'
  if (slug.includes('dubai') || slug.includes('uae')) return 'blue'
  if (slug.includes('turkey')) return 'red'
  if (slug.includes('thailand')) return 'green'
  return 'blue' // default
}

// add helper above the component or at top of the file
function formatNumber(value: number | string | undefined) {
  if (value == null) return ''
  const num = typeof value === 'string' ? Number(String(value).replace(/[, ]+/g, '')) : Number(value)
  if (isNaN(num)) return String(value)
  return num.toLocaleString('en-US') // adds commas: 1,234,567
}

export default async function TourPackagePage({ params }: { params: { slug: string } }) {
  // Fetch tour data from Strapi
  const tour = await getTourPageBySlug(params.slug)

  // If no tour found, show 404
  if (!tour) {
    notFound()
  }

  // Determine color scheme based on slug
  const colorKey = determineColorScheme(params.slug)
  const colors = colorSchemes[colorKey]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r z-10"></div>
        <Image
          src={getStrapiImageUrl(tour.hero_image)}
          alt={`${tour.title} Experience`}
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Package Details Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="relative h-[450px] rounded-2xl overflow-hidden">
              <Image
                src={getStrapiImageUrl(tour.main_image)}
                alt={`${tour.title} Main`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{tour.title}</h1>
              {tour.short_description && (
                <div className="prose prose-lg max-w-none">
                  {tour.short_description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 text-lg leading-relaxed mb-4">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing */}
            {tour.price && (
              <div className={`bg-gradient-to-r from-${colorKey}-50 to-${colorKey === 'red' ? 'orange' : 'cyan'}-50 p-6 rounded-2xl border ${colors.border}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Starting from</p>
                    <p className={`text-3xl font-bold ${colors.text}`}>
                      {tour.price ? formatNumber(tour.price) : ''} {tour.price_note || 'birr'}
                    </p>
                    <p className="text-sm text-gray-500">per person</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-medium">24/7 support</p>
                  </div>
                </div>
              </div>
            )}

            {/* Services/Features Grid */}
            {tour.services && tour.services.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Services</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {tour.services.map((service, index) => {
                    const IconComponent = getIconComponent(service.icon)
                    return (
                      <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 ${colors.bg} rounded-lg`}>
                              <IconComponent className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{service.title}</h3>
                              {service.description && (
                                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tour Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Popular Destinations</h2>
                <div className="space-y-3">
                  {tour.highlights
                    .sort((a, b) => a.order - b.order)
                    .map((highlight, index) => (
                      <div key={index} className="flex gap-3">
                        <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                          <span className={`${colors.text} font-semibold text-sm`}>{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{highlight.title}</p>
                          <p className="text-gray-600 text-sm">{highlight.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {tour.faqs && tour.faqs.length > 0 && (
        <FAQSection faqs={tour.faqs} />
      )}

      {/* CTA Section */}
      <section className={`py-16 px-4 bg-gradient-to-r ${colors.gradient}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {tour.cta_title || `Ready to Explore ${tour.title}?`}
          </h2>
          {tour.cta_description && (
            <div className="prose prose-lg prose-invert max-w-none">
              {tour.cta_description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          )}
          <BookingModal
            tourTitle={tour.title}
            whatsappNumber={tour.whatsapp_number || '251906700007'}
            buttonClassName={`bg-white ${colors.text} hover:bg-gray-50 text-lg px-8 py-4 h-auto font-semibold`}
          />
        </div>
      </section>
    </div>
  )
}
