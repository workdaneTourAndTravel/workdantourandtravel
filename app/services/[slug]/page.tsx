import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getServicePageBySlug, getAllServiceSlugs, getStrapiImageUrl, getSiteLogo } from '@/lib/strapi/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookingModal } from './booking-modal'
import { FAQSection } from './faq-section'
import { CheckCircle2, ChevronRight, Phone, Shield, Clock, Headphones, ArrowRight } from 'lucide-react'

// Generate static params for all service pages
export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()

  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const [service, siteLogo] = await Promise.all([
    getServicePageBySlug(slug),
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

// Unified blue color scheme for all services
const colors = {
  gradient: 'from-blue-600 to-blue-700',
  lightGradient: 'from-blue-50 to-cyan-50',
  border: 'border-blue-200',
  text: 'text-blue-600',
  bg: 'bg-blue-100',
  hover: 'hover:bg-blue-700',
  cardBg: 'bg-blue-50',
  heroAccent: 'bg-blue-500',
}

function getServiceCategory(slug: string): string {
  if (slug.includes('visa')) return 'Visa Services'
  if (slug.includes('consultation') || slug.includes('planning')) return 'Consultation'
  if (slug.includes('business') || slug.includes('uae')) return 'Business Services'
  if (slug.includes('immigration')) return 'Immigration'
  return 'Professional Service'
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServicePageBySlug(slug)

  if (!service) {
    notFound()
  }

  const serviceCategory = getServiceCategory(slug)

  // Get section image (first one if multiple)
  const sectionImage = service.section_image && service.section_image.length > 0
    ? service.section_image[0]
    : service.hero_image

  // Get additional section images for gallery display
  const additionalImages = service.section_image && service.section_image.length > 1
    ? service.section_image.slice(1, 3)
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <Image
          src={getStrapiImageUrl(service.hero_image)}
          alt={`${service.title} Service`}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 w-full px-4 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <Badge className={`${colors.heroAccent} text-white mb-4 px-4 py-1.5 text-sm font-medium`}>
              {serviceCategory}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg max-w-3xl">
              {service.hero_title || service.title}
            </h1>
            {service.hero_subtitle && (
              <p className="text-lg md:text-xl text-white/85 max-w-2xl drop-shadow-md leading-relaxed">
                {service.hero_subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="py-4 px-4 max-w-7xl mx-auto border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate">{service.title}</span>
        </div>
      </nav>

      {/* Stats Bar — full-width impact section */}
      {service.stats && service.stats.length > 0 && (
        <section className={`py-10 px-4 bg-gradient-to-r ${colors.gradient}`}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {service.stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}+</p>
                <p className="text-white/80 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Service Overview Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src={getStrapiImageUrl(sectionImage)}
                alt={`${service.title} Main`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Additional images grid */}
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {additionalImages.map((img, index) => (
                  <div key={index} className="relative h-[180px] rounded-xl overflow-hidden shadow-md group">
                    <Image
                      src={getStrapiImageUrl(img)}
                      alt={`${service.title} ${index + 2}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              {service.section_title && (
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{service.section_title}</h2>
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

            {/* Key Benefits Highlights */}
            <div className={`bg-gradient-to-r ${colors.lightGradient} p-6 rounded-2xl border ${colors.border}`}>
              <h3 className={`text-lg font-semibold ${colors.text} mb-4`}>Why Choose This Service</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${colors.bg} rounded-lg flex-shrink-0`}>
                    <Shield className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Licensed & Certified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${colors.bg} rounded-lg flex-shrink-0`}>
                    <Clock className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Fast Processing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${colors.bg} rounded-lg flex-shrink-0`}>
                    <Headphones className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <BookingModal
                tourTitle={service.title}
                whatsappNumber={service.whatsapp_number || '251906700007'}
                buttonText="Request a Consultation"
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

      {/* Offers Section */}
      {service.offers && service.offers.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 mb-4">
                {service.offer_title || 'What We Offer'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions tailored to your needs
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.offers.map((offer, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <CardContent className="p-7">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <span className={`${colors.text} font-bold text-lg`}>{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">{offer.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {offer.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works — Process Section */}
      {service.offers && service.offers.length >= 3 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A simple, straightforward process to get you started
              </p>
            </div>
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gray-200" />
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {[
                  { step: '01', title: 'Consultation', desc: 'Share your requirements and goals with our expert team' },
                  { step: '02', title: 'Planning', desc: 'We create a personalized plan tailored to your needs' },
                  { step: '03', title: 'Execution', desc: 'We handle everything while keeping you informed at every step' },
                ].map((item, index) => (
                  <div key={index} className="text-center relative">
                    <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 border-4 border-white shadow-md`}>
                      <span className={`${colors.text} font-bold text-xl`}>{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Indicators Strip */}
      <section className="py-12 px-4 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Shield, label: 'Licensed & Insured' },
              { icon: CheckCircle2, label: 'Verified Service' },
              { icon: Clock, label: 'Fast Turnaround' },
              { icon: Headphones, label: '24/7 Support' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 justify-center">
                <item.icon className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQSection faqs={service.faqs} />
      )}

      {/* CTA Section */}
      <section className={`py-20 px-4 bg-gradient-to-r ${colors.gradient}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {service.cta_section_title || `Ready to Get Started?`}
          </h2>
          {service.cta_section_description ? (
            <div className="prose prose-lg prose-invert max-w-none">
              {service.cta_section_description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our experienced team is ready to assist you. Get in touch today and let us handle the details for your {service.title.toLowerCase()}.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingModal
              tourTitle={service.title}
              whatsappNumber={service.whatsapp_number || '251906700007'}
              buttonText={service.cta_button_text || "Get Started Today"}
              buttonClassName="bg-white text-gray-900 hover:bg-gray-50 text-lg px-8 py-4 h-auto font-semibold shadow-lg"
            />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 h-auto font-semibold"
            >
              <Link href="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
