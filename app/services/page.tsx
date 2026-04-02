import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllServicePages, getStrapiImageUrl, getSiteLogo } from '@/lib/strapi/api'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  let siteName = 'Werkdan Tour and Travel'
  try {
    const siteLogo = await getSiteLogo()
    if (siteLogo.site_name) siteName = siteLogo.site_name
  } catch {}
  return {
    title: `Our Services | ${siteName}`,
    description: 'Explore our comprehensive travel services including visa assistance, travel consultation, and business activities support.',
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function ServicesPage() {
  // Fetch all service pages from Strapi
  const servicePages = await getAllServicePages()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70 z-10"></div>
        <Image
          src="/hero-section/hero-section.png"
          alt="Our Services"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Professional Travel Services
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md max-w-2xl mx-auto">
            Expert support for all your travel and business needs
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-500 mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive services to make your travel and business journey smooth and hassle-free
          </p>
        </div>

        {servicePages.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No services available yet
              </h3>
              <p className="text-gray-600 mb-8">
                We're currently preparing our service offerings for you. Check back soon!
              </p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service) => (
              <Card
                key={service.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none shadow-lg flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={getStrapiImageUrl(service.hero_image || service.main_image)}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <CardHeader className="flex-1">
                  <CardTitle className="text-2xl font-bold line-clamp-2">
                    {service.title}
                  </CardTitle>
                  {(service.section_description || service.short_description) && (
                    <CardDescription className="line-clamp-3 text-base mt-2">
                      {service.section_description || service.short_description}
                    </CardDescription>
                  )}
                </CardHeader>

                {/* Offers */}
                {service.offers && service.offers.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {service.offers.slice(0, 3).map((offer, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {offer.title}
                          </p>
                        </div>
                      ))}
                      {service.offers.length > 3 && (
                        <p className="text-sm text-green-600 font-medium">
                          +{service.offers.length - 3} more offers
                        </p>
                      )}
                    </div>
                  </CardContent>
                )}

                {/* Footer */}
                <CardFooter className="pt-4 border-t">
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700 group"
                  >
                    <Link href={`/services/${service.slug}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Expert Assistance?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our experienced team is ready to help you with all your travel and business service needs. Get in touch today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50 text-lg px-8 py-6 h-auto font-semibold"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-6 h-auto font-semibold"
            >
              <Link href="/packages">View Tour Packages</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
