"use client"

import type React from "react"
import type { ContactInfo, SocialLinks, Office } from "@/lib/strapi/api"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react"
// SVG social icons to avoid MUI dependency
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
)
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
)
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
)

interface TourLink {
  title: string
  slug: string
}

interface ServiceLink {
  title: string
  slug: string
}

interface FooterClientProps {
  tourLinks: TourLink[]
  serviceLinks: ServiceLink[]
  logoUrl?: string
  siteName?: string
  contactInfo?: ContactInfo
  socialLinks?: SocialLinks
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const socialIconVariants = {
  hover: {
    scale: 1.1,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
}

// Default fallback values
const DEFAULT_WHATSAPP = "251906700007"
const DEFAULT_WHATSAPP_MSG = "Hello, I would like to book a tour and travel with your company."

const DEFAULT_OFFICES: Office[] = [
  {
    name: "Addis Ababa Office",
    address: "Megenagna Wach Bldg. 2nd Floor, 1000 ADDIS ABABA, Ethiopia",
    phones: "+251 906700007\n+251 911625035",
    email: "workdantrading@gmail.com",
    maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31523.74683377328!2d38.76200651083985!3d9.020968499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85fd6575b29f%3A0x9322f27baa2f5a9f!2zV2FjaCBCdWlsZGluZyB8IE1lZ2VuYWduYSB8IOGLi-GJvSDhiIXhipXhjLsgfCDhiJjhjIjhipPhips!5e0!3m2!1sen!2set!4v1749733378329!5m2!1sen!2set",
  },
  {
    name: "UAE Office",
    address: "Sharjah Business Center, Ground Floor, UAE",
    phones: "+971 509064877",
    email: "workdaneuae@gmail.com",
    maps_embed_url: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d461664.2791748114!2d55.19430763306816!3d25.312528953895914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sSharjah%20Business%20Center%2C%20Ground%20Floor%2C%20UAE!5e0!3m2!1sen!2set!4v1750580941141!5m2!1sen!2set",
  },
]

const DEFAULT_SOCIAL: SocialLinks = {
  facebook: "https://facebook.com/workdantravel",
  instagram: "https://instagram.com/workdantravel",
  twitter: "https://twitter.com/workdantravel",
  youtube: "https://www.youtube.com/@workdan",
  tiktok: "https://www.tiktok.com/@workdantravel",
}

export default function FooterClient({
  tourLinks,
  serviceLinks,
  logoUrl = '/logo/navbar-workdan-logo.png',
  siteName = 'Workdane Tour and Travel',
  contactInfo = {},
  socialLinks: socialLinksProp = {},
}: FooterClientProps) {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const whatsappNumber = contactInfo.whatsapp_number || DEFAULT_WHATSAPP
  const offices = contactInfo.offices && contactInfo.offices.length > 0 ? contactInfo.offices : DEFAULT_OFFICES
  const social = {
    ...DEFAULT_SOCIAL,
    ...Object.fromEntries(Object.entries(socialLinksProp).filter(([, v]) => v)),
  }

  // Get the first office's primary phone and email for quick contact
  const primaryPhone = offices[0]?.phones?.split('\n')[0] || "+251 906700007"
  const primaryEmail = offices[0]?.email || "workdantrading@gmail.com"

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const message = `
        *Newsletter Subscription*\n\n
        *Email*: ${email}\n\n
        Thank you for subscribing to our newsletter! Stay tuned for updates and exclusive offers.
      `.trim();

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");

      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  }

  // Transform tour links
  const packageLinks = tourLinks.map(tour => ({
    href: `/packages/${tour.slug}`,
    label: tour.title,
  }))

  // Transform service links
  const transformedServiceLinks = serviceLinks.map(service => ({
    href: `/services/${service.slug}`,
    label: service.title,
  }))

  const socialLinksArray = [
    {
      href: social.facebook || "",
      icon: FacebookIcon,
      label: "Facebook",
      hoverColor: "hover:bg-blue-600/20",
    },
    {
      href: social.instagram || "",
      icon: InstagramIcon,
      label: "Instagram",
      hoverColor: "hover:bg-pink-600/20",
    },
    {
      href: social.twitter || "",
      icon: TwitterIcon,
      label: "Twitter",
      hoverColor: "hover:bg-sky-500/20",
    },
    {
      href: social.youtube || "",
      icon: YouTubeIcon,
      label: "YouTube",
      hoverColor: "hover:bg-red-600/20",
    },
    {
      href: `https://wa.me/${whatsappNumber}`,
      icon: WhatsAppIcon,
      label: "WhatsApp",
      hoverColor: "hover:bg-green-500/20",
    },
  ].filter(link => link.href)

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Adjusted layout to remove unwanted space */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <Image
                    src={logoUrl}
                    alt="Workdan logo"
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {siteName}
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Crafting immersive travel experiences that engage all senses and create lasting memories across Ethiopia
                and beyond.
              </p>

              {/* Newsletter Subscription */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 justify-start">
                <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Subscribe to our newsletter for the latest updates and exclusive offers.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <span className="flex items-center gap-2">✓ Subscribed!</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Subscribe
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Explore Links */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-6 text-white">Packages</h4>
              <ul className="space-y-3">
                {packageLinks.length > 0 ? (
                  packageLinks.map((link) => (
                    <motion.li key={link.href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">No packages available</li>
                )}
                <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link
                    href="/packages"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-2 group font-medium"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full" />
                    View All Packages →
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                {transformedServiceLinks.length > 0 ? (
                  transformedServiceLinks.map((link) => (
                    <motion.li key={link.href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">No services available</li>
                )}
                <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link
                    href="/services"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-2 group font-medium"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full" />
                    View All Services →
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="lg:col-span-full">
              <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>

              {offices.map((office) => (
                  <div key={office.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                    <h5 className="font-medium mb-4 text-blue-200">{office.name}</h5>
                    <div className="space-y-3">
                      {office.phones && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          <div className="text-sm">
                            {office.phones.split('\n').map((phone, i) => (
                              <div key={i}>{phone}</div>
                            ))}
                          </div>
                        </div>
                      )}
                      {office.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          <span className="text-sm">{office.email}</span>
                        </div>
                      )}
                      {office.address && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{office.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
              ))}

              {/* Maps for each office that has an embed URL */}
              {offices.filter(o => o.maps_embed_url).map((office) => (
                <div key={`map-${office.name}`}>
                  <h3 className="text-white/60 text-center mt-12 mb-6 text-lg font-medium">
                    {office.name}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="relative rounded-xl overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer group"
                    onClick={() => window.open(office.maps_embed_url, "_blank")}
                  >
                    <iframe
                      src={office.maps_embed_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(20%) brightness(0.9)" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${office.name} Location`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Social Media & Quick Actions */}
          <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Follow Our Journey</h4>
                <p className="text-gray-300 mb-4 max-w-md">
                  Join our community and get inspired by fellow travelers' stories and adventures.
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinksArray.map((s) => {
                    const IconComponent = s.icon
                    return (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={socialIconVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 ${s.hoverColor}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    )
                  })}
                  {/* TikTok icon */}
                  {social.tiktok && (
                    <div className="flex gap-3">
                      <Button
                        asChild
                        variant="outline"
                        className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300"
                      >
                        <a href={social.tiktok} className="flex items-center gap-2" target="_blank">
                          <img src="/tiktok.svg" alt="tiktok" width="20" height="20" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center lg:text-right">
                <h5 className="font-medium mb-3 text-white">Quick Contact</h5>
                <div className="flex gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <a href={`tel:${primaryPhone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <a href={`mailto:${primaryEmail}`} className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
