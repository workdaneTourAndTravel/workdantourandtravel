import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllTourPages, getStrapiImageUrl, getSiteLogo } from '@/lib/strapi/api'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  let siteName = 'Werkdan Tour and Travel'
  try {
    const siteLogo = await getSiteLogo()
    if (siteLogo.site_name) siteName = siteLogo.site_name
  } catch {}
  return {
    title: `Tour Packages | ${siteName}`,
    description: 'Explore our curated travel packages featuring the best destinations around the world.',
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function PackagesPage() {
  // Fetch all tour packages from Strapi
  const tourPackages = await getAllTourPages()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 z-10"></div>
        <Image
          src="/hero-section/hero-section.png"
          alt="Travel Packages"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Explore Our Tour Packages
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md max-w-2xl mx-auto">
            Curated travel experiences designed to create unforgettable memories
          </p>
        </div>
      </section>

      {/* Packages Grid Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-500 mb-4">
            Available Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked destinations and book your next adventure
          </p>
        </div>

        {tourPackages.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No packages available yet
              </h3>
              <p className="text-gray-600 mb-8">
                We're currently preparing amazing travel packages for you. Check back soon!
              </p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tourPackages.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none shadow-lg flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={getStrapiImageUrl(tour.hero_image || tour.main_image)}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Price Badge */}
                  {tour.price && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-blue-600 hover:bg-white text-base font-bold px-3 py-1">
                        {tour.price} {tour.price_note || 'birr'}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardHeader className="flex-1">
                  <CardTitle className="text-2xl font-bold line-clamp-2">
                    {tour.title}
                  </CardTitle>
                  {tour.short_description && (
                    <CardDescription className="line-clamp-3 text-base mt-2">
                      {tour.short_description}
                    </CardDescription>
                  )}
                </CardHeader>

                {/* Highlights */}
                {tour.highlights && tour.highlights.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {highlight.title}
                          </p>
                        </div>
                      ))}
                      {tour.highlights.length > 3 && (
                        <p className="text-sm text-blue-600 font-medium">
                          +{tour.highlights.length - 3} more highlights
                        </p>
                      )}
                    </div>
                  </CardContent>
                )}

                {/* Footer */}
                <CardFooter className="pt-4 border-t">
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 group"
                  >
                    <Link href={`/packages/${tour.slug}`}>
                      View Details
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us to customize your perfect travel package or get expert advice for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-6 h-auto font-semibold"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            
          </div>
        </div>
      </section>
    </div>
  )
}
