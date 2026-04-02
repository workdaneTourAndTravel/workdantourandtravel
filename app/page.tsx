"use client"

import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Link from "next/link"
import Image from "next/image"
import { BriefcaseBusiness, PlaneTakeoff } from "lucide-react"
import TimezonesDisplay from '@/components/time-zones-dIsplay'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import { Pagination, Autoplay } from 'swiper/modules';
import { Typography } from "@mui/material"
import {
  Verified,
  Groups,
  Security,
  TravelExplore,
  Public, // replacing Eco with Public (globe-like icon)
  ShoppingBag,
} from "@mui/icons-material"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Map, Palmtree, Utensils, Mountain, Waves, File, MenuIcon, MapPin, Clock } from "lucide-react"
import DestinationCard from "@/components/destination-card"
import StoryTestimonial from "@/components/story-testimonial"
import ServiceCard from "@/components/service-card"
import { Camera } from "lucide-react"
import HeroSection from "@/components/hero-section"
import LogoClouds from "@/components/logo-clouds"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import HomepageBanners from "@/components/homepage-banners"
import TravelLoadingScreen from "@/components/travel-loading-screen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    })
  }, [])

  const [destinations, setDestinations] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, servRes] = await Promise.all([
          fetch('http://localhost:1337/api/destinations?populate=*'),
          fetch('http://localhost:1337/api/services?populate=*'),
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

  const values = [
    {
      id: 0,
      title: 'Authentic Experiences',
      description:
        'We create genuine connections between travelers and local communities, ensuring every journey tells a unique story.',
      icon: Groups,
      color: '#1976d2',
    },
    {
      id: 1,
      title: 'Safety & Security',
      description:
        'Your safety is our top priority. We maintain the highest safety standards and provide 24/7 support throughout your journey.',
      icon: Security,
      color: '#d32f2f',
    },
    {
      id: 2,
      title: 'Sustainable Tourism',
      description:
        "We promote responsible travel that benefits local communities and preserves Ethiopia's natural and cultural heritage.",
      icon: Public, // new icon used here
      color: '#2e7d32',
    },
    {
      id: 3,
      title: 'Expert Guidance',
      description:
        "Our experienced local guides provide deep insights into Ethiopia's history, culture, and hidden treasures.",
      icon: TravelExplore,
      color: '#ed6c02',
    },
    {
      id: 4,
      title: 'Affordable',
      description:
        "We offer competitive rates and flexible packages to suit your budget and preferences.",
      icon: ShoppingBag,
      color: '#f59e0b',
    },
    {
      id: 5,
      title: 'Fast and Reliable',
      description:
        "We guarantee timely delivery and exceptional customer service to ensure a seamless travel experience.",
      icon: Clock,
      color: '#0ea5e9',
    }
  ]

  if (isLoading) {
    return <TravelLoadingScreen />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <HomepageBanners placement="homepage_top" />
        <section id="destinations" className="py-8">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-500"
                data-aos="fade-up"
              >
                Destinations That Tell a Story
              </h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                Each place has a tale to tell, a secret to share, and an experience waiting to unfold. Discover the
                narratives that make these destinations more than just places on a map.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {destinations.map((dest) => {
                let icon = <MapPin className="h-5 w-5" />;
                if (dest.title.toLowerCase().includes('uae') || dest.title.toLowerCase().includes('dubai')) {
                  icon = <Palmtree className="h-5 w-5" />;
                } // Add more conditions if needed for other destinations like China/Turkey

                return (
                  <DestinationCard
                    key={dest.id}
                    title={dest.title}
                    description={dest.description?.[0]?.children?.[0]?.text || 'No description available'}
                    imageSrc={`http://localhost:1337${dest.image?.[0]?.formats?.medium?.url || dest.image?.[0]?.url}`}
                    icon={icon}
                    tags={dest.tags ? dest.tags.split(/\s*,\s*|\s+/).map(t => t.trim()).filter(Boolean) : []}
                  />
                );
              })}
            </div>

          </div>
        </section>
        {/* Core Values Section */}
        <section className="bg-white dark:bg-gray-900 py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <Typography variant="h2" component="h2" gutterBottom fontWeight="bold" color="primary.main">Core Values We Offer</Typography>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                We believe travel is more than sightseeing, it's storytelling.
              </p>
            </div>

            <div className="space-y-12 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
              data-aos="fade-up"
            >
              {values.map((value, index) => (
                <div key={value.id} className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900">
                    <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-blue-500">{value.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
          {/* Join our telegram group image link - Modified for full width */}
  <div className="w-full py-1">
  <div className="relative w-full" style={{ height: '300px' }}> {/* Adjust height as needed */}
    <a href="https://t.me/workdantravel" target="_blank" rel="noopener noreferrer">
      <Image
        src="/logo/Join our telegram group for latest.svg"
        alt="Join our Telegram group"
        fill // This makes the image fill the container
        className="object-fill" // Maintains aspect ratio while filling container
      />
    </a>
  </div>
</div>

        <section id="services" className="py-7 bg-stone-100">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-500"
              // data-aos="fade-up"
              >Our Services</h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                We craft immersive travel experiences tailored to your desires. Each service is designed to engage all
                your senses and create memories that last a lifetime.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                let IconComponent = File;
                let title = service.title;
                if (title.toLowerCase().includes('travel planning')) {
                  IconComponent = PlaneTakeoff;
                } else if (title.toLowerCase().includes('uae')) {
                  IconComponent = BriefcaseBusiness;
                  title = `🇦🇪 ${title}`;
                } else if (title.toLowerCase().includes('visa')) {
                  IconComponent = File;
                }

                const featuresArray = service.features 
                  ? service.features.split(/\s*(?=[A-Z])/).map(f => f.replace(/\.$/, '').trim()).filter(Boolean)
                  : [];

                return (
                  <ServiceCard
                    key={service.id}
                    title={title}
                    description={service.description || 'No description available'}
                    icon={IconComponent}
                    features={featuresArray}
                    popular={true}
                    link={service.link}
                  />
                );
              })}
            </div>
          </div>
        </section>
        {/* <LogoClouds /> */}
        <HomepageBanners placement="homepage_middle" />
        <section id="stories" className="py-7">
          <div className="container">
            <div className="mb-12 text-center">
              <h2
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-500"
              // data-aos="fade-up"
              >
                Traveler Chronicles
              </h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                Every journey creates a unique narrative. Here are the stories of fellow travelers who embarked on their
                own adventures, returning with tales that inspire and transport.
              </p>
            </div>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000, // 5 seconds delay between slides
                disableOnInteraction: false, // Keeps autoplay running even after user interaction
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
              {/* Add more SwiperSlide components for additional testimonials */}

            </Swiper>
          </div>
        </section>

        <section id="about" className="py-7 bg-amber-50">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 text-blue-500"
                // data-aos="fade-up"
                >Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Workdane Tour and Travel began with a simple belief: that travel should be more than checking
                  destinations off a list – it should be about collecting stories that transform us.
                </p>
                <p className="text-muted-foreground mb-4">
                  Founded by a collective of passionate storytellers and seasoned travelers, we've spent decades
                  exploring the hidden corners of our world, forging connections with local communities, and curating
                  experiences that engage all the senses.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our mission is to craft journeys that weave you into the fabric of a place – where you don't just
                  visit, but truly experience. Where every meal tells the history of a culture, every landscape whispers
                  its secrets, and every interaction becomes a chapter in your personal travel narrative.
                </p>
                {/* <Button className="bg-blue-400 hover:bg-blue-500">Meet Our Team</Button> */}
              </div>
              <div className="relative h-[390px] rounded-lg overflow-hidden">
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

        <section className="text-white">
          <TimezonesDisplay />
        </section>
      </main>

    </div>
  )
}