"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, MapPin, Users, Star, Phone, Mail, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function TravelConsultation({ whatsappNumber = "251906700007" }: { whatsappNumber?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    travelNeeds: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    // console.log("Form submitted:", formData)
    const {
      fullName,
      email,
      phone,
      preferredDate,
      preferredTime,
      travelNeeds,
    } = formData

    // Message structure
    const message = `
🌍 *Travel Consultation Request* 🌟

👤 *From*: ${fullName}
📧 *Email*: ${email}
📞 *Phone*: ${phone}
📅 *Preferred Date*: ${preferredDate}
⏰ *Preferred Time*: ${preferredTime}  
✈️ *Travel Needs*: ${travelNeeds || 'N/A'}

✨ Please confirm availability. Looking forward to planning an amazing trip! 🚀
`.trim()

    // WhatsApp redirect URL (your business number below)
    const phoneNumber = whatsappNumber
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp
    window.open(whatsappURL, "_blank")


    setIsModalOpen(false)
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      travelNeeds: "",
    })
  }

  const services = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Destination Research",
      description: "Comprehensive research on destinations tailored to your preferences and budget",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Itinerary Planning",
      description: "Detailed day-by-day itineraries with activities, dining, and accommodation recommendations",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Coordination",
      description: "Specialized planning for family trips, corporate retreats, and group adventures",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "VIP Experiences",
      description: "Access to exclusive experiences and premium accommodations worldwide",
    },
  ]

  const faqs = [
    {
      question: "How long does a typical consultation take?",
      answer:
        "Our initial consultation typically lasts 60-90 minutes, during which we'll discuss your travel preferences, budget, timeline, and create a preliminary plan outline.",
    },
    {
      question: "What's included in the consultation fee?",
      answer:
        "The consultation includes a detailed discussion of your travel needs, a preliminary itinerary outline, destination recommendations, and a follow-up summary document with our recommendations.",
    },
    {
      question: "Do you handle bookings or just provide recommendations?",
      answer:
        "We offer both services! We can provide detailed recommendations for you to book independently, or we can handle all bookings on your behalf for a comprehensive travel planning experience.",
    },
    {
      question: "How far in advance should I book a consultation?",
      answer:
        "We recommend booking at least 2-3 months before your intended travel date for optimal planning time, though we can accommodate shorter timelines based on availability.",
    },
    {
      question: "What if I need to reschedule my consultation?",
      answer:
        "We understand plans change! You can reschedule your consultation up to 24 hours before the scheduled time without any additional fees.",
    },
    {
      question: "Do you specialize in certain types of travel?",
      answer:
        "While we plan all types of travel, our specialties include luxury travel, adventure tourism, cultural immersion experiences, and multi-destination trips.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services/travel-planning/travel-planing.jpg?height=800&width=1200"
            alt="Travel consultation background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Travel Planning & Consultation</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Transform your travel dreams into perfectly crafted experiences with our expert consultation services
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Book Your Consultation
          </Button>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Expert Travel Planning Tailored to You
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our comprehensive travel consultation service combines years of industry expertise with personalized
              attention to create unforgettable travel experiences. Whether you're planning a romantic getaway, family
              vacation, or corporate retreat, we handle every detail so you can focus on making memories.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From destination research and itinerary planning to booking coordination and on-trip support, we're your
              dedicated travel partners every step of the way.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Happy Travelers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Destinations Covered</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/services/uae-business-consultant-activities/uae-business-consultation.jpg"
              alt="Travel planning consultation"
              width={600}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">What We Offer</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing & Availability */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Duration</h4>
              <p className="text-gray-600">60-90 minutes initial consultation</p>
            </div>
            <div>
              <div className="w-8 h-8 text-blue-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                $
              </div>
              <h4 className="text-xl font-semibold mb-2">Starting Price</h4>
              <p className="text-gray-600">From $0-$150 per consultation</p>
            </div>
            <div>
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Availability</h4>
              <p className="text-gray-600">7 days a week, flexible scheduling</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Perfect Trip?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your consultation today and let's start crafting your dream travel experience
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Book a Consultation
          </Button>
        </div>
      </section>

      {/* Booking Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Book Your Consultation</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="text-sm font-medium text-gray-700">
                Preferred Consultation Date *
              </Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="text-sm font-medium text-gray-700">
                Preferred Time Slot *
              </Label>
              <Select
                value={formData.preferredTime}
                onValueChange={(value) => handleInputChange("preferredTime", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00-10:30">9:00 AM - 10:30 AM</SelectItem>
                  <SelectItem value="11:00-12:30">11:00 AM - 12:30 PM</SelectItem>
                  <SelectItem value="1:00-2:30">1:00 PM - 2:30 PM</SelectItem>
                  <SelectItem value="3:00-4:30">3:00 PM - 4:30 PM</SelectItem>
                  <SelectItem value="5:00-6:30">5:00 PM - 6:30 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelNeeds" className="text-sm font-medium text-gray-700">
                Brief Description of Travel Needs
              </Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="travelNeeds"
                  placeholder="Tell us about your travel plans, preferences, budget, etc."
                  className="pl-10 min-h-[100px] resize-none"
                  value={formData.travelNeeds}
                  onChange={(e) => handleInputChange("travelNeeds", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Submit Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TravelConsultation
