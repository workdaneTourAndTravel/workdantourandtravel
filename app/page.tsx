"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import { Pagination, Autoplay } from 'swiper/modules'
import {
  BriefcaseBusiness,
  PlaneTakeoff,
  FileText,
  Users,
  Shield,
  Globe,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react"

import DestinationCard from "@/components/destination-card"
import StoryTestimonial from "@/components/story-testimonial"
import ServiceCard from "@/components/service-card"
import HeroSection from "@/components/hero-section"
import HomepageBanners from "@/components/homepage-banners"
import TravelLoadingScreen from "@/components/travel-loading-screen"
import TimezonesDisplay from '@/components/time-zones-display'

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

const values = [
  {
    id: 0,
    title: 'Authentic Experiences',
    description: 'We create genuine connections between travelers and local communities, ensuring every journey tells a unique story.',
    icon: Users,
  },
  {
    id: 1,
    title: 'Safety & Security',
    description: 'Your safety is our top priority. We maintain the highest safety standards and provide 24/7 support throughout your journey.',
    icon: Shield,
  },
  {
    id: 2,
    title: 'Sustainable Tourism',
    description: "We promote responsible travel that benefits local communities and preserves Ethiopia's natural and cultural heritage.",
    icon: Globe,
  },
  {
    id: 3,
    title: 'Expert Guidance',
    description: "Our experienced local guides provide deep insights into Ethiopia's history, culture, and hidden treasures.",
    icon: TrendingUp,
  },
  {
    id: 4,
    title: 'Affordable',
    description: "We offer competitive rates and flexible packages to suit your budget and preferences.",
    icon: BriefcaseBusiness,
  },
  {
    id: 5,
    title: 'Fast and Reliable',
    description: "We guarantee timely delivery and exceptional customer service to ensure a seamless travel experience.",
    icon: Clock,
  },
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [destinations, setDestinations] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, servRes] = await Promise.all([
          fetch(`${STRAPI_URL}/api/destinations?populate=*`),
          fetch(`${STRAPI_URL}/api/services?populate=*`),
        ]);

        const destData = await destRes.json();
        const servData = await servRes.json();

        setDestinations(destData.data || []);
        setServices(servData.data || []);
      } catch (error) {
        console.error('Error fetching data from Strapi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <TravelLoadingScreen />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <HomepageBanners placement="homepage_top" />

        {/* Destinations Section */}
        <section id="destinations" className="py-24 bg-gray-50">
          <div className="container">
            {/* Section Header */}
            <div className="mb-16 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-blue-600" />
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Our Destinations</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 mb-4">
                Destinations That Tell a Story
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Each place has a tale to tell, a secret to share, and an experience waiting to unfold.
              </p>
            </div>

            {/* Bento-style Grid */}
            {destinations.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
                {destinations.map((dest: any, index: number) => (
                  <DestinationCard
                    key={dest.id}
                    title={dest.title}
                    description={dest.description?.[0]?.children?.[0]?.text || 'No description available'}
                    imageSrc={(() => { const imgUrl = dest.image?.[0]?.formats?.large?.url || dest.image?.[0]?.formats?.medium?.url || dest.image?.[0]?.url; if (!imgUrl) return "/placeholder.svg"; return imgUrl.startsWith("http") ? imgUrl : `${STRAPI_URL}${imgUrl}`; })()}
                    icon={<MapPin className="h-4 w-4" />}
                    tags={dest.tags ? dest.tags.split(/\s*,\s*|\s+/).map((t: string) => t.trim()).filter(Boolean) : []}
                    featured={index === 0}
                  />
                ))}
              </div>
            )}

            {destinations.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No destinations available yet. Check back soon!</p>
              </div>
            )}

            {/* Section CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg shadow-blue-600/25"
              >
                View All Packages
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-600">
                Core Values We Offer
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We believe travel is more than sightseeing, it&apos;s storytelling.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {values.map((value) => {
                const IconComponent = value.icon
                return (
                  <div key={value.id} className="flex flex-col items-center md:items-start text-center md:text-left group">
                    <div className="flex justify-center items-center mb-4 w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-blue-600 transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Telegram Banner */}
        <div className="w-full">
          <div className="relative w-full h-48 sm:h-64 md:h-80">
            <a href="https://t.me/workdantravel" target="_blank" rel="noopener noreferrer">
              <Image
                src="/logo/Join our telegram group for latest.svg"
                alt="Join our Telegram group"
                fill
                className="object-fill"
              />
            </a>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-20 bg-stone-50">
          <div className="container">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-600">
                Our Services
              </h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
                We craft immersive travel experiences tailored to your desires. Each service is designed to engage all
                your senses and create memories that last a lifetime.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service: any) => {
                let IconComponent = FileText;
                let title = service.title;
                if (title.toLowerCase().includes('travel planning')) {
                  IconComponent = PlaneTakeoff;
                } else if (title.toLowerCase().includes('uae')) {
                  IconComponent = BriefcaseBusiness;
                } else if (title.toLowerCase().includes('visa')) {
                  IconComponent = FileText;
                }

                const featuresArray = service.features
                  ? service.features.split(/\s*(?=[A-Z])/).map((f: string) => f.replace(/\.$/, '').trim()).filter(Boolean)
                  : [];

                return (
                  <ServiceCard
                    key={service.id}
                    title={title}
                    description={service.description || 'No description available'}
                    icon={IconComponent}
                    features={featuresArray}
                    link={service.link}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <HomepageBanners placement="homepage_middle" />

        {/* Testimonials Section */}
        <section id="stories" className="py-20">
          <div className="container">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-600">
                Traveler Chronicles
              </h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
                Every journey creates a unique narrative. Here are the stories of fellow travelers who embarked on their
                own adventures, returning with tales that inspire and transport.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
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
                    journey="Service experience"
                    quote="They were very helpful and knowledgeable. Their expertise was invaluable in making the most of my trip. I highly recommend them for any service-related needs."
                    imageSrc="/placeholder.svg?height=100&width=100"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="about" className="py-20 bg-slate-50">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 text-blue-600">
                  Our Story
                </h2>
                <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                  Workdane Tour and Travel began with a simple belief: that travel should be more than checking
                  destinations off a list – it should be about collecting stories that transform us.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Founded by a collective of passionate storytellers and seasoned travelers, we&apos;ve spent decades
                  exploring the hidden corners of our world, forging connections with local communities, and curating
                  experiences that engage all the senses.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our mission is to craft journeys that weave you into the fabric of a place – where you don&apos;t just
                  visit, but truly experience. Where every meal tells the history of a culture, every landscape whispers
                  its secrets, and every interaction becomes a chapter in your personal travel narrative.
                </p>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-us.jpg?height=500&width=700"
                  alt="Our team of travel storytellers gathered around a map, planning the next adventure"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Timezone Display */}
        <section className="py-16 bg-gray-900 text-white">
          <TimezonesDisplay />
        </section>
      </main>
    </div>
  )
}
