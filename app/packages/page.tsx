import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllTourPages, getStrapiImageUrl, getSiteLogo } from '@/lib/strapi/api'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, MapPin } from 'lucide-react'

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

export const revalidate = 3600

export default async function PackagesPage() {
  const tourPackages = await getAllTourPages()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero-section/hero-section.png"
          alt="Travel Packages"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-blue-300 font-medium tracking-wider uppercase text-sm mb-4">
            Curated Experiences
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Explore Our Tour Packages
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Handpicked travel experiences designed to create unforgettable memories across the world
          </p>
        </div>
      </section>

      {/* Packages Grid Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-600 mb-4">
            Available Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked destinations and book your next adventure
          </p>
        </div>

        {tourPackages.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <MapPin className="w-16 h-16 text-blue-200 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No packages available yet
              </h3>
              <p className="text-muted-foreground mb-8">
                We&apos;re currently preparing amazing travel packages for you. Check back soon!
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tourPackages.map((tour) => (
              <Link key={tour.id} href={`/packages/${tour.slug}`} className="group">
                <Card className="overflow-hidden border-none shadow-lg flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                        <Badge className="bg-white/95 text-blue-600 hover:bg-white text-base font-bold px-4 py-1.5 shadow-lg">
                          {tour.price} {tour.price_note || 'birr'}
                        </Badge>
                      </div>
                    )}

                    {/* Title overlay on image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white drop-shadow-md line-clamp-2">
                        {tour.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <CardHeader className="flex-1 pb-2">
                    {tour.short_description && (
                      <CardDescription className="line-clamp-3 text-base leading-relaxed">
                        {tour.short_description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  {/* Highlights */}
                  {tour.highlights && tour.highlights.length > 0 && (
                    <CardContent className="pt-0 pb-2">
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
                  <CardFooter className="pt-4 border-t mt-auto">
                    <div className="w-full flex items-center justify-between text-blue-600 font-medium">
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 h-auto font-semibold"
            >
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
