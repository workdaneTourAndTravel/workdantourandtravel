"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import StoryTestimonial from "@/components/story-testimonial"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import { Pagination, Autoplay } from 'swiper/modules'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Users, MapPin, Clock, Star, ShieldCheck, Globe, ShoppingBag, Compass, CheckCircle2 } from "lucide-react"
import TravelLoadingScreen from "@/components/travel-loading-screen"

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

interface AboutData {
  hero_cover?: { url: string }
  story_text: string
  certificates?: Array<{
    title: string
    description: string
    year: string
  }>
}

export default function AboutPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<null | { image: string; title: string }>(null)
  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/about-pages?populate=*`)
        const data = await response.json()
        setAboutData(data.data?.[0] || null)
      } catch (error) {
        console.error('Error fetching about data from Strapi:', error)
      }
    }

    fetchAboutData()
  }, [])

  const stats = [
    { number: "500+", label: "Happy Travelers", icon: Users },
    { number: "50+", label: "Destinations", icon: MapPin },
    { number: "4", label: "Years Experience", icon: Clock },
    { number: "4.9", label: "Average Rating", icon: Star },
  ]

  const certificateImages = [
    "/certificates/Apprtiaction Certificate-1.png?height=400&width=300&text=ETO+Certificate",
    "/certificates/WORKDANE CHANNEL PARTNER_CERTFICATE_250227_153946-1.png?height=400&width=300&text=IATA+Certificate",
  ]

  const certificates = aboutData?.certificates?.map((cert, index) => ({
    ...cert,
    image: certificateImages[index] || certificateImages[0],
  })) || []

  const values = [
    {
      title: 'Authentic Experiences',
      description: 'We create genuine connections between travelers and local communities, ensuring every journey tells a unique story.',
      icon: Users,
    },
    {
      title: 'Safety & Security',
      description: 'Your safety is our top priority. We maintain the highest safety standards and provide 24/7 support throughout your journey.',
      icon: ShieldCheck,
    },
    {
      title: 'Sustainable Tourism',
      description: "We promote responsible travel that benefits local communities and preserves Ethiopia's natural and cultural heritage.",
      icon: Globe,
    },
    {
      title: 'Expert Guidance',
      description: "Our experienced local guides provide deep insights into Ethiopia's history, culture, and hidden treasures.",
      icon: Compass,
    },
    {
      title: 'Affordable',
      description: "We offer competitive rates and flexible packages to suit your budget and preferences.",
      icon: ShoppingBag,
    },
    {
      title: 'Fast and Reliable',
      description: "We guarantee timely delivery and exceptional customer service to ensure a seamless travel experience.",
      icon: Clock,
    },
  ]

  if (!aboutData) {
    return <TravelLoadingScreen siteName="WORKDANE" />
  }

  const heroImageUrl = aboutData.hero_cover?.url
    ? aboutData.hero_cover.url.startsWith('http')
      ? aboutData.hero_cover.url
      : `${STRAPI_URL}${aboutData.hero_cover.url}`
    : "/about-us/aboutUs-hero-section.png"

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImageUrl}
          alt="About Werkdan Tour and Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
        <div className="relative z-20 text-left text-white px-4 max-w-4xl mx-auto w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            About Us
          </h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-600 mb-8">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none">
            {aboutData.story_text.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 text-lg leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <p className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</p>
              <p className="text-blue-200 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-600 mb-4">
              Core Values We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe travel is more than sightseeing — it&apos;s storytelling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-blue-600">{value.title}</h3>
                <p className="text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      {certificates.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-600 mb-4">
                Our Certifications & Awards
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Recognized for our commitment to quality, safety, and professional excellence
              </p>
              <div className="w-24 h-1 bg-blue-600 rounded-full mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-2 border-blue-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-400"
                  onClick={() => setSelectedCertificate({ image: cert.image, title: cert.title })}
                >
                  <div className="relative h-52 bg-gray-100">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={`${cert.title} Certificate`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-2">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent h-16" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="default" className="bg-blue-600">
                        {cert.year}
                      </Badge>
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-blue-600 text-lg mb-2">{cert.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{cert.description}</p>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">
                        <strong>Certification Year:</strong> {cert.year}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certificate Dialog */}
            <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
              <DialogContent className="max-w-2xl p-0">
                {selectedCertificate && (
                  <Image
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                )}
              </DialogContent>
            </Dialog>

            {/* Verification Note */}
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">All Certifications Verified</h3>
                <p className="text-blue-100 leading-relaxed">
                  All our certifications and licenses are current and can be verified with the respective issuing
                  authorities. We maintain the highest standards of compliance and regularly update our certifications to
                  ensure we meet all industry requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-600">
              Some stories from our clients
            </h2>
          </div>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <StoryTestimonial
                name="Eliyas Birhanu"
                journey="Ethiopian Cultural Experience"
                quote="The experience was truly unforgettable. The guide was knowledgeable and the organization was excellent despite the challenging environment. Standing at the edge of the Erta Ale volcano at night was a once-in-a-lifetime experience."
                imageSrc="/placeholder.svg?height=100&width=100"
              />
            </SwiperSlide>
            <SwiperSlide>
              <StoryTestimonial
                name="Meaza Abebe"
                journey="Ethiopian Cultural Experience"
                quote="The experience was truly unforgettable. The guide was knowledgeable and the organization was excellent despite the challenging environment. Standing at the edge of the Erta Ale volcano at night was a once-in-a-lifetime experience."
                imageSrc="/placeholder.svg?height=100&width=100"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  )
}
