import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTourPageBySlug, getAllTourSlugs, getStrapiImageUrl, getSiteLogo } from '@/lib/strapi/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookingModal } from './booking-modal'
import { FAQSection } from './faq-section'
import * as LucideIcons from 'lucide-react'
import { LucideIcon, ChevronRight, MapPin, Phone } from 'lucide-react'

// Generate static params for all tour pages
export async function generateStaticParams() {
  const slugs = await getAllTourSlugs()

  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const [tour, siteLogo] = await Promise.all([
    getTourPageBySlug(slug),
    getSiteLogo(),
  ])
  const siteName = siteLogo.site_name || 'Werkdan Tour and Travel'

  if (!tour) {
    return {
      title: 'Tour Not Found',
    }
  }

  return {
    title: `${tour.title} | ${siteName}`,
    description: tour.short_description || `Explore ${tour.title} with our comprehensive travel package`,
  }
}

// Helper function to get Lucide icon by name
const getIconComponent = (iconName: string): LucideIcon => {
  const Icon = (LucideIcons as any)[iconName]
  return Icon || LucideIcons.HelpCircle
}

// Color schemes for different tours
const colorSchemes: Record<string, {
  gradient: string
  lightGradient: string
  border: string
  text: string
  bg: string
  cardBg: string
  hover: string
}> = {
  blue: {
    gradient: 'from-blue-600 to-cyan-600',
    lightGradient: 'from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    bg: 'bg-blue-100',
    cardBg: 'bg-blue-50',
    hover: 'hover:bg-blue-700',
  },
  red: {
    gradient: 'from-red-600 to-orange-600',
    lightGradient: 'from-red-50 to-orange-50',
    border: 'border-red-200',
    text: 'text-red-600',
    bg: 'bg-red-100',
    cardBg: 'bg-red-50',
    hover: 'hover:bg-red-700',
  },
  green: {
    gradient: 'from-green-600 to-emerald-600',
    lightGradient: 'from-green-50 to-emerald-50',
    border: 'border-green-200',
    text: 'text-green-600',
    bg: 'bg-green-100',
    cardBg: 'bg-green-50',
    hover: 'hover:bg-green-700',
  },
  purple: {
    gradient: 'from-purple-600 to-pink-600',
    lightGradient: 'from-purple-50 to-pink-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    bg: 'bg-purple-100',
    cardBg: 'bg-purple-50',
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

export default async function TourPackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Fetch tour data from Strapi
  const tour = await getTourPageBySlug(slug)

  // If no tour found, show 404
  if (!tour) {
    notFound()
  }

  // Determine color scheme based on slug
  const colorKey = determineColorScheme(slug)
  const colors = colorSchemes[colorKey]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <Image
          src={getStrapiImageUrl(tour.hero_image)}
          alt={`${tour.title} Experience`}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 w-full px-4 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg max-w-3xl">
              {tour.title}
            </h1>
            {tour.short_description && (
              <p className="text-lg md:text-xl text-white/85 max-w-2xl drop-shadow-md leading-relaxed line-clamp-2">
                {tour.short_description.split('\n\n')[0]}
              </p>
            )}
            {tour.price && (
              <div className="mt-6 inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Starting from</p>
                  <p className={`text-2xl font-bold ${colors.text}`}>
                    {formatNumber(tour.price)} <span className="text-base font-medium text-gray-500">{tour.price_note || 'birr'}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="py-4 px-4 max-w-7xl mx-auto border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/packages" className="hover:text-blue-600 transition-colors">Packages</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate">{tour.title}</span>
        </div>
      </nav>

      {/* Package Overview Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src={getStrapiImageUrl(tour.main_image)}
                alt={`${tour.title} Main`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{tour.title}</h2>
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

            {/* Pricing Card */}
            {tour.price && (
              <div className={`bg-gradient-to-r ${colors.lightGradient} p-6 rounded-2xl border ${colors.border} shadow-sm`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Starting from</p>
                    <p className={`text-3xl font-bold ${colors.text} mt-1`}>
                      {formatNumber(tour.price)} <span className="text-lg font-medium text-gray-500">{tour.price_note || 'birr'}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">per person</p>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-1.5 text-green-600">
                      <Phone className="w-4 h-4" />
                      <p className="text-sm font-medium">24/7 support</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Booking CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <BookingModal
                tourTitle={tour.title}
                whatsappNumber={tour.whatsapp_number || '251906700007'}
                buttonClassName={`bg-gradient-to-r ${colors.gradient} text-white hover:opacity-90 text-lg px-8 py-4 h-auto font-semibold shadow-lg`}
              />
              <Button asChild variant="outline" size="lg" className="h-auto py-4 px-8 text-lg font-semibold">
                <Link href="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Features Grid */}
      {tour.services && tour.services.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4 text-center">
              What&apos;s Included
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Everything you need for an unforgettable experience
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tour.services.map((service, index) => {
                const IconComponent = getIconComponent(service.icon)
                return (
                  <Card key={index} className="border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 ${colors.bg} rounded-xl flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{service.title}</h3>
                          {service.description && (
                            <p className="text-gray-600 mt-1 leading-relaxed">{service.description}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tour Highlights / Destinations */}
      {tour.highlights && tour.highlights.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4 text-center">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Discover the must-visit spots on this tour
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {tour.highlights
                .sort((a, b) => a.order - b.order)
                .map((highlight, index) => (
                  <div key={index} className="flex gap-4 p-5 rounded-xl bg-white shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-0.5">
                    <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className={`${colors.text} font-bold text-sm`}>{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{highlight.title}</h3>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{highlight.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {tour.faqs && tour.faqs.length > 0 && (
        <FAQSection faqs={tour.faqs} />
      )}

      {/* CTA Section */}
      <section className={`py-20 px-4 bg-gradient-to-r ${colors.gradient}`}>
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
          {!tour.cta_description && (
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book your spot today and create memories that will last a lifetime. Our team is ready to help you plan the perfect trip.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingModal
              tourTitle={tour.title}
              whatsappNumber={tour.whatsapp_number || '251906700007'}
              buttonClassName={`bg-white ${colors.text} hover:bg-gray-50 text-lg px-8 py-4 h-auto font-semibold shadow-lg`}
            />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 h-auto font-semibold"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
