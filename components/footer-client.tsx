"use client"

import type React from "react"

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
import { Facebook } from "@mui/icons-material"
import { Instagram } from "@mui/icons-material"
import { Twitter } from "@mui/icons-material"
import { YouTube } from "@mui/icons-material"
import { WhatsApp } from "@mui/icons-material"
import { Typography } from "@mui/material"

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

export default function FooterClient({ tourLinks, serviceLinks }: FooterClientProps) {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // WhatsApp message structure
      const message = `
        *Newsletter Subscription* 🌟\n\n
        📧 *Email*: ${email}\n\n
        ✨ Thank you for subscribing to our newsletter! Stay tuned for updates and exclusive offers. 🚀
      `.trim();

      // WhatsApp redirect URL (your business number below)
      const phoneNumber = "251906700007"; // <- Replace with your WhatsApp number (without +)
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp
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

  const socialLinks = [
    {
      href: "https://facebook.com/workdantravel",
      icon: Facebook,
      label: "Facebook",
      hoverColor: "hover:bg-blue-600/20",
    },
    {
      href: "https://instagram.com/workdantravel",
      icon: Instagram,
      label: "Instagram",
      hoverColor: "hover:bg-pink-600/20",
    },
    {
      href: "https://twitter.com/workdantravel",
      icon: Twitter,
      label: "Twitter",
      hoverColor: "hover:bg-sky-500/20",
    },
    {
      href: "https://www.youtube.com/@workdan",
      icon: YouTube,
      label: "YouTube",
      hoverColor: "hover:bg-red-600/20",
    },
    {
      href: "https://wa.me/251906700007",
      icon: WhatsApp,
      label: "WhatsApp",
      hoverColor: "hover:bg-green-500/20",
    },
  ]

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
                    src="/logo/navbar-workdan-logo.png"
                    alt="Workdan logo"
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Workdane Tour and Travel
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
                  packageLinks.map((link, index) => (
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
                  transformedServiceLinks.map((link, index) => (
                    <motion.li key={link.href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
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
                    className="text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center gap-2 group font-medium"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full" />
                    View All Services →
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="lg:col-span-full">
              <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>

              {/* Addis Ababa Office */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                <h5 className="font-medium mb-4 text-blue-200">Addis Ababa Office</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <div className="text-sm">
                      <div>+251 906700007</div>
                      <div>+251 911625035</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-sm">workdantrading@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">
                      Megenagna Wach Bldg. 2nd Floor, 1000 ADDIS ABABA, Ethiopia
                    </span>
                  </div>
                </div>
              </div>

              {/* UAE Office */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                <h5 className="font-medium mb-4 text-purple-200">UAE Office</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-sm">+971 509064877</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-sm">workdaneuae@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">Sharjah Business Center, Ground Floor, UAE</span>
                  </div>
                </div>
              </div>

              <Typography variant="h6" className="text-white/60 text-center mt-12 mb-6">
              Addis Ababa Office
              </Typography>

              {/* Interactive Map */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-xl overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer group"
                onClick={() => window.open("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31523.74683377328!2d38.76200651083985!3d9.020968499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85fd6575b29f%3A0x9322f27baa2f5a9f!2zV2FjaCBCdWlsZGluZyB8IE1lZ2VuYWduYSB8IOGLi-GJvSDhiIXhipXhjLsgfCDhiJjhjIjhipPhips!5e0!3m2!1sen!2set!4v1749733378329!5m2!1sen!2set"
                  , "_blank")}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31523.74683377328!2d38.76200651083985!3d9.020968499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85fd6575b29f%3A0x9322f27baa2f5a9f!2zV2FjaCBCdWlsZGluZyB8IE1lZ2VuYWduYSB8IOGLi-GJvSDhiIXhipXhjLsgfCDhiJjhjIjhipPhips!5e0!3m2!1sen!2set!4v1749733378329!5m2!1sen!2set"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(20%) brightness(0.9)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Workdan Tour and Travel Location"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <Typography variant="h6" className="text-white/60 text-center mt-12 mb-6">
              UAE Office
              </Typography>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-xl overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer group"
                onClick={() => window.open("https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d461664.2791748114!2d55.19430763306816!3d25.312528953895914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sSharjah%20Business%20Center%2C%20Ground%20Floor%2C%20UAE!5e0!3m2!1sen!2set!4v1750580941141!5m2!1sen!2set"
                  , "_blank")}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d461664.2791748114!2d55.19430763306816!3d25.312528953895914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sSharjah%20Business%20Center%2C%20Ground%20Floor%2C%20UAE!5e0!3m2!1sen!2set!4v1750580941141!5m2!1sen!2set"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(20%) brightness(0.9)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Workdan Tour and Travel Location"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
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
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={socialIconVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 ${social.hoverColor}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    )
                  })}
                  {/* add tiktok icon */}
                  <div className="flex gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300"

                    >
                      <a href="https://www.tiktok.com/@workdantravel" className="flex items-center gap-2"
                        target="_blank"
                      >
                        <img src="/tiktok.svg" alt="tiktok" width="20" height="20" />
                      </a>
                    </Button>
                  </div>
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
                    <a href="tel:+251906700007" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <a href="mailto:workdantrading@gmail.com" className="flex items-center gap-2">
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
              &copy; {new Date().getFullYear()} Workdane Tour and Travel. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
