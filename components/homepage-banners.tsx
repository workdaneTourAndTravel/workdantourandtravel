"use client"

import { useEffect, useState } from "react"
import PromoBanner from "@/components/promo-banner"
import type { Banner } from "@/lib/strapi/banners"

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

interface HomepageBannersProps {
  placement: 'homepage_top' | 'homepage_middle'
}

export default function HomepageBanners({ placement }: HomepageBannersProps) {
  const [banners, setBanners] = useState<Banner[]>([])

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const now = new Date().toISOString()
        const url = `${STRAPI_URL}/api/banners?populate=*&filters[is_active][$eq]=true&filters[start_date][$lte]=${now}&filters[end_date][$gte]=${now}&filters[placement][$eq]=${placement}&sort=priority:asc`

        const res = await fetch(url)
        if (!res.ok) return

        const json = await res.json()
        setBanners(json.data || [])
      } catch (error) {
        console.error('Error fetching banners:', error)
      }
    }

    fetchBanners()
  }, [placement])

  return <PromoBanner banners={banners} />
}
