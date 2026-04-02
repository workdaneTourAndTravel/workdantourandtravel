"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Banner } from "@/lib/strapi/banners"
import { getBannerImageUrl } from "@/lib/strapi/banners"

interface PopupBannerProps {
  banners: Banner[]
}

export default function PopupBanner({ banners }: PopupBannerProps) {
  const [visible, setVisible] = useState(false)
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null)

  useEffect(() => {
    if (banners.length === 0) return

    // Check localStorage for previously dismissed popups
    const dismissedRaw = localStorage.getItem("dismissed_popup_banners")
    const dismissedIds: number[] = dismissedRaw ? JSON.parse(dismissedRaw) : []

    const availableBanner = banners.find((b) => !dismissedIds.includes(b.id))
    if (!availableBanner) return

    // Show popup after a short delay
    const timer = setTimeout(() => {
      setCurrentBanner(availableBanner)
      setVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [banners])

  const dismiss = () => {
    if (currentBanner) {
      const dismissedRaw = localStorage.getItem("dismissed_popup_banners")
      const dismissedIds: number[] = dismissedRaw ? JSON.parse(dismissedRaw) : []
      dismissedIds.push(currentBanner.id)
      localStorage.setItem("dismissed_popup_banners", JSON.stringify(dismissedIds))
    }
    setVisible(false)
  }

  if (!visible || !currentBanner) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        {currentBanner.image && (
          <div className="relative h-48 md:h-56">
            <Image
              src={getBannerImageUrl(currentBanner.image)}
              alt={currentBanner.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}

        <div
          className="p-6 text-center"
          style={
            !currentBanner.image && currentBanner.background_color
              ? { backgroundColor: currentBanner.background_color, color: 'white' }
              : undefined
          }
        >
          <h2 className="text-2xl font-bold mb-2">{currentBanner.title}</h2>
          {currentBanner.subtitle && (
            <p className="text-gray-600 mb-4">{currentBanner.subtitle}</p>
          )}
          {currentBanner.cta_text && currentBanner.cta_link && (
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
              onClick={dismiss}
            >
              <Link href={currentBanner.cta_link}>
                {currentBanner.cta_text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
