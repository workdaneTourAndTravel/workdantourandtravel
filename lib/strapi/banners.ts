const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

const REVALIDATE_SECONDS = process.env.NODE_ENV === 'production' ? 300 : 0

export interface Banner {
  id: number
  title: string
  subtitle?: string
  image?: {
    url: string
    formats?: {
      large?: { url: string }
      medium?: { url: string }
      small?: { url: string }
    }
  }
  cta_text?: string
  cta_link?: string
  placement: 'homepage_top' | 'homepage_middle' | 'popup'
  style: 'full_width' | 'card' | 'overlay'
  background_color?: string
  start_date: string
  end_date: string
  is_active: boolean
  priority: number
}

export interface Announcement {
  id: number
  message: string
  type: 'info' | 'warning' | 'success' | 'urgent'
  placement: 'top_bar' | 'below_navbar' | 'footer_above'
  link_text?: string
  link_url?: string
  start_date: string
  end_date: string
  is_active: boolean
  is_dismissible: boolean
  priority: number
}

export function getBannerImageUrl(image?: Banner['image']): string {
  if (!image) return '/placeholder.svg'
  const url = image.formats?.large?.url || image.formats?.medium?.url || image.url
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

export async function getActiveBanners(placement?: Banner['placement']): Promise<Banner[]> {
  try {
    const now = new Date().toISOString()
    let url = `${STRAPI_URL}/api/banners?populate=*&filters[is_active][$eq]=true&filters[start_date][$lte]=${now}&filters[end_date][$gte]=${now}&sort=priority:asc`

    if (placement) {
      url += `&filters[placement][$eq]=${placement}`
    }

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!res.ok) return []

    const json = await res.json()
    return json.data || []
  } catch (error) {
    console.error('Error fetching banners:', error)
    return []
  }
}

export async function getActiveAnnouncements(placement?: Announcement['placement']): Promise<Announcement[]> {
  try {
    const now = new Date().toISOString()
    let url = `${STRAPI_URL}/api/announcements?filters[is_active][$eq]=true&filters[start_date][$lte]=${now}&filters[end_date][$gte]=${now}&sort=priority:asc`

    if (placement) {
      url += `&filters[placement][$eq]=${placement}`
    }

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!res.ok) return []

    const json = await res.json()
    return json.data || []
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return []
  }
}
