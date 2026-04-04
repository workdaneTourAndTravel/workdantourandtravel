"use client"

import React from 'react'
import Image from 'next/image'
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ContactInfo, Office } from "@/lib/strapi/api"

const DEFAULT_OFFICES: Office[] = [
  {
    name: "UAE Office",
    address: "Sharjah Business Center, Ground Floor, UAE",
    phones: "+251 906700007",
    email: "workdaneuae@gmail.com",
  },
  {
    name: "Addis Ababa Office",
    address: "Megenagna Wach Bldg. 2nd Floor, 1000 ADDIS ABABA, Ethiopia",
    phones: "+251 906700007\n+251 911625035",
    email: "workdantrading@gmail.com",
  },
]

interface ContactClientProps {
  contactInfo?: ContactInfo
}

function ContactClient({ contactInfo = {} }: ContactClientProps) {
  const whatsappNumber = contactInfo.whatsapp_number || "251906700007"
  const offices = contactInfo.offices && contactInfo.offices.length > 0 ? contactInfo.offices : DEFAULT_OFFICES
  const businessDays = contactInfo.business_days || "Monday - Sunday"
  const businessHours = contactInfo.business_hours || "24/7 Open"
  const emergencyNote = contactInfo.emergency_support_note || "Available 24/7 for existing bookings"

  // Get first office for primary contact
  const primaryPhone = offices[0]?.phones?.split('\n')[0] || "+251 906700007"
  const primaryEmail = offices[0]?.email || "workdantrading@gmail.com"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const {
      name,
      email,
      phone,
      service,
      message,
    } = formData

    const messages = `
      *Name*: ${name}
      *Email*: ${email}
      *Phone*: ${phone}
      *Service*: ${service}
      *Message*: ${message || 'N/A'}
    `.trim()

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messages)}`
    window.open(whatsappURL, "_blank")

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    })
  }

  return (
    <div>
      <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
        <Image
          src="/about-us/aboutUs-hero-section.png"
          alt="Contact Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Get In Touch
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl">
            Ready to embark on your next adventure? We&apos;re here to help you plan the perfect journey.
          </p>
        </div>
      </div>

    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Fill out the form below and we&apos;ll get back to you within minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+xxx xxxx xxxx"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-gray-700 font-medium">
                        Service Interest
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="desert-safari">Desert Safari</SelectItem>
                          <SelectItem value="city-tours">City Tours</SelectItem>
                          <SelectItem value="adventure-packages">Adventure Packages</SelectItem>
                          <SelectItem value="travel-planning">Travel Planning & Consultation</SelectItem>
                          <SelectItem value="business-consulting">UAE Business Consulting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your travel plans, questions, or how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg font-medium rounded-lg transition-colors duration-200"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                    {offices.map((office) => (
                      <div key={office.name} className="mb-2">
                        <p className="text-gray-600 text-sm font-medium">{office.name}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{office.address}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone Numbers</h3>
                    <p className="text-gray-600 text-sm">
                      {[...new Set(offices.flatMap((office) => office.phones?.split('\n').map(p => p.trim()).filter(Boolean) || []))].map((phone, i) => (
                        <span key={i}>
                          {phone}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Addresses</h3>
                    <p className="text-gray-600 text-sm">
                      {[...new Set(offices.map((office) => office.email).filter(Boolean))].map((email, i) => (
                        <span key={i}>
                          {email}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{businessDays}</span>
                    <span className="text-gray-600">{businessHours}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Emergency Support:</strong> {emergencyNote}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white justify-start" asChild>
                  <a href={`https://wa.me/+${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-3 h-5 w-5" />
                    WhatsApp Chat
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 justify-start"
                  asChild
                >
                  <a href={`tel:${primaryPhone.replace(/\s/g, '')}`}>
                    <Phone className="mr-3 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
      </div>
    </div>
  )
}

export default ContactClient
