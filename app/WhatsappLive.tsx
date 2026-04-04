'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

interface WhatsappLiveProps {
  whatsappNumber?: string
  whatsappMessage?: string
}

function WhatsappLive({
  whatsappNumber = "251906700007",
  whatsappMessage = "Hello, I would like to book a tour and travel with your company.",
}: WhatsappLiveProps) {
    const baseUrl = "https://api.whatsapp.com/send/";
    const WhatsappLink = `${baseUrl}?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`;

  return (
    <div className="fixed bottom-6 left-8 z-50">
    <motion.div
      className="relative group cursor-pointer"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
    >
      {/* Ping effect — placed behind */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-50 animate-ping z-0"></span>

      {/* WhatsApp button — placed in front */}
      <a
        href={WhatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative z-10 block"
      >
        <Image
          src="/whatsappIcon.png"
          alt="WhatsApp Chat"
          width={64}
          height={64}
          className="rounded-full border-2 border-white shadow-lg hover:scale-105 transition-transform duration-200"
        />
      </a>
    </motion.div>
  </div>
  )
}

export default WhatsappLive
