"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Banner } from "@/lib/strapi/banners"
import { getBannerImageUrl } from "@/lib/strapi/banners"

interface PromoBannerProps {
  banners: Banner[]
}

export default function PromoBanner({ banners }: PromoBannerProps) {
  if (banners.length === 0) return null

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {banners.map((banner) => {
            if (banner.style === 'full_width') {
              return (
                <div
                  key={banner.id}
                  className="col-span-full relative rounded-2xl overflow-hidden min-h-[200px] md:min-h-[280px]"
                >
                  {banner.image ? (
                    <Image
                      src={getBannerImageUrl(banner.image)}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: banner.background_color || '#2563eb' }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-12 max-w-xl">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {banner.title}
                    </h3>
                    {banner.subtitle && (
                      <p className="text-white/90 text-base md:text-lg mb-4">
                        {banner.subtitle}
                      </p>
                    )}
                    {banner.cta_text && banner.cta_link && (
                      <div>
                        <Button
                          asChild
                          className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                        >
                          <Link href={banner.cta_link}>
                            {banner.cta_text}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )
            }

            if (banner.style === 'overlay') {
              return (
                <div
                  key={banner.id}
                  className="relative rounded-xl overflow-hidden min-h-[220px] group"
                >
                  {banner.image ? (
                    <Image
                      src={getBannerImageUrl(banner.image)}
                      alt={banner.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: banner.background_color || '#2563eb' }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="relative z-10 flex flex-col justify-end h-full p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{banner.title}</h3>
                    {banner.subtitle && (
                      <p className="text-white/80 text-sm mb-3">{banner.subtitle}</p>
                    )}
                    {banner.cta_text && banner.cta_link && (
                      <Link
                        href={banner.cta_link}
                        className="text-white font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        {banner.cta_text}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              )
            }

            // card style (default)
            return (
              <div
                key={banner.id}
                className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {banner.image && (
                  <div className="relative h-40">
                    <Image
                      src={getBannerImageUrl(banner.image)}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className="p-5"
                  style={
                    !banner.image && banner.background_color
                      ? { backgroundColor: banner.background_color, color: 'white' }
                      : undefined
                  }
                >
                  <h3 className="text-lg font-bold mb-1">{banner.title}</h3>
                  {banner.subtitle && (
                    <p className="text-sm text-gray-600 mb-3">{banner.subtitle}</p>
                  )}
                  {banner.cta_text && banner.cta_link && (
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link href={banner.cta_link}>
                        {banner.cta_text}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
