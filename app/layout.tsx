import Script from 'next/script'
import Head from 'next/head'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsappLive from './WhatsappLive'
import ScrollToTop from '@/components/scroll-to-top'
import { getActiveAnnouncements, getActiveBanners } from '@/lib/strapi/banners'
import AnnouncementBar from '@/components/announcement-bar'
import PopupBanner from '@/components/popup-banner'
import { getSiteLogo, getContactInfo } from '@/lib/strapi/api'

export async function generateMetadata(): Promise<Metadata> {
  let siteName = 'Werkdan Tour and Travel'
  try {
    const siteLogo = await getSiteLogo()
    if (siteLogo.site_name) siteName = siteLogo.site_name
  } catch {}
  return {
    title: siteName,
    description: siteName,
    generator: 'v0.dev',
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [topAnnouncements, belowNavbarAnnouncements, footerAnnouncements, popupBanners, contactInfo] = await Promise.all([
    getActiveAnnouncements('top_bar'),
    getActiveAnnouncements('below_navbar'),
    getActiveAnnouncements('footer_above'),
    getActiveBanners('popup'),
    getContactInfo(),
  ])

  return (
    <html lang="en">
      <body>
        <AnnouncementBar announcements={topAnnouncements} />
        <Navbar />
        <AnnouncementBar announcements={belowNavbarAnnouncements} />
        {children}
        <SpeedInsights />
        <Analytics />
        <AnnouncementBar announcements={footerAnnouncements} />
        <Footer />
        <PopupBanner banners={popupBanners} />
        <ScrollToTop />
        <WhatsappLive
          whatsappNumber={contactInfo.whatsapp_number}
          whatsappMessage={contactInfo.whatsapp_message}
        />
        {/* Tawk.to Script - load via external src (avoids inline DOM mutations before React hydration) */}
        <Script
          id="tawk-to"
          src="https://embed.tawk.to/6867e909d7341f191194877a/1ivaucjc0"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
