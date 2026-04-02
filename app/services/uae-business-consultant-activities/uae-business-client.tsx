"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import {
  Building2,
  FileText,
  Users,
  Globe,
  TrendingUp,
  Phone,
  Mail,
  User,
  MessageSquare,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function UAEBusinessConsultant({ whatsappNumber = "251906700007" }: { whatsappNumber?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    businessNeeds: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Business consultation form submitted:", formData)

    const {
      fullName,
      email,
      phone,
      company,
      businessType,
      consultationType,
      preferredDate,
      preferredTime,
      businessNeeds,
    } = formData

    // Message structure
    const message = `
🇦🇪 *UAE Business Consultation Request* 🌟

👤 *From*: ${fullName}
📧 *Email*: ${email}
📞 *Phone*: ${phone}
🏢 *Company*: ${company || 'N/A'}
🏢 *Business Type*: ${businessType}
🏢 *Consultation Type*: ${consultationType}
📅 *Preferred Date*: ${preferredDate}
⏰ *Preferred Time*: ${preferredTime}  
✈️ *Business Needs*: ${businessNeeds || 'N/A'}

✨ Please confirm availability. Looking forward to starting my UAE business journey! 🚀
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
      company: "",
      businessType: "",
      consultationType: "",
      preferredDate: "",
      preferredTime: "",
      businessNeeds: "",
    })
  }

  const services = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Company Formation",
      description: "Complete business setup including mainland, free zone, and offshore company registration",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Licensing & Permits",
      description: "Professional, trade, and commercial license acquisition with regulatory compliance",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Market Entry Strategy",
      description: "Strategic planning for entering UAE markets with local insights and partnerships",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Business Growth",
      description: "Expansion strategies, investment opportunities, and scaling your UAE operations",
    },
  ]

  const emirates = [
    { name: "Dubai", specialties: ["Free Zones", "Tourism", "Real Estate", "Technology"] },
    { name: "Abu Dhabi", specialties: ["Oil & Gas", "Government", "Healthcare", "Education"] },
    { name: "Sharjah", specialties: ["Manufacturing", "Logistics", "Arts & Culture"] },
    { name: "Ajman", specialties: ["SME Setup", "Cost-Effective Solutions"] },
  ]

  const faqs = [
    {
      question: "What types of business entities can be formed in the UAE?",
      answer:
        "The UAE offers various business structures including Limited Liability Companies (LLC), Free Zone Companies, Branch Offices, Representative Offices, and Sole Proprietorships. Each has different ownership requirements, benefits, and operational scopes.",
    },
    {
      question: "How long does it take to set up a business in the UAE?",
      answer:
        "Timeline varies by emirate and business type. Mainland companies typically take 1-2 weeks, while free zone companies can be established in 3-7 working days. We expedite the process through our established relationships with authorities.",
    },
    {
      question: "Do I need a local partner for my UAE business?",
      answer:
        "For mainland companies, UAE nationals must hold 51% ownership, though 100% foreign ownership is allowed in certain sectors. Free zone companies allow 100% foreign ownership. We help identify the best structure for your needs.",
    },
    {
      question: "What are the costs involved in setting up a UAE business?",
      answer:
        "Costs vary significantly based on business type, location, and activities. Initial setup costs range from AED 5,000 to AED 50,000+. We provide detailed cost breakdowns during consultation based on your specific requirements.",
    },
    {
      question: "What ongoing compliance requirements exist for UAE businesses?",
      answer:
        "UAE businesses must maintain annual renewals, submit audited accounts, comply with VAT regulations (if applicable), and meet employment visa requirements. We provide ongoing compliance support to ensure your business remains in good standing.",
    },
    {
      question: "Can you help with banking and financial services setup?",
      answer:
        "Yes, we assist with corporate bank account opening, payment gateway setup, and connections with financial institutions. Our relationships with major UAE banks streamline the account opening process.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/dubai-front.png?height=800&width=1200"
            alt="UAE business skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-900/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">🇦🇪</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              UAE Business Hub
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">UAE Business Consultant Activities</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your gateway to successful business establishment and growth in the United Arab Emirates
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Schedule Business Consultation
          </Button>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Expert UAE Business Consulting Services
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Navigate the UAE's dynamic business landscape with confidence. Our comprehensive consulting services
              combine deep local expertise with international best practices to ensure your business success in one of
              the world's most strategic commercial hubs.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From initial market research and company formation to ongoing compliance and growth strategies, we're your
              trusted partners in building a thriving UAE business presence.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">70+</div>
                <div className="text-sm text-gray-600">Companies Established</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">3+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/services/uae-business-consultant-activities/uae-business-consultation.jpg"
              alt="UAE business consultation"
              width={600}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Core Services */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">Our Core Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
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

        {/* Emirates Coverage */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">Emirates We Serve</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emirates.map((emirate, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-center">{emirate.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {emirate.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Consultation Details */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Consultation Duration</h4>
              <p className="text-gray-600">90-120 minutes comprehensive session</p>
            </div>
            <div>
              <div className="w-8 h-8 text-green-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                AED
              </div>
              <h4 className="text-xl font-semibold mb-2">Starting Price</h4>
              <p className="text-gray-600">Free until the licensing is established</p>
            </div>
            <div>
              <Users className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">In-person, virtual, or hybrid sessions</p>
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
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your UAE Business Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule your consultation today and take the first step towards UAE business success
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Book Your Business Consultation
          </Button>
        </div>
      </section>

      {/* Business Consultation Booking Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">🇦🇪</span>
              Book UAE Business Consultation
            </DialogTitle>
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
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Current Company (if applicable)
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Enter your company name"
                  className="pl-10"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
                Business Type/Industry *
              </Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology & IT</SelectItem>
                  <SelectItem value="trading">Trading & Import/Export</SelectItem>
                  <SelectItem value="consulting">Agriculture</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultationType" className="text-sm font-medium text-gray-700">
                Consultation Type *
              </Label>
              <Select
                value={formData.consultationType}
                onValueChange={(value) => handleInputChange("consultationType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select consultation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company-formation">Company Formation</SelectItem>
                  <SelectItem value="licensing">Business Licensing</SelectItem>
                  <SelectItem value="market-entry">Market Entry Strategy</SelectItem>
                  <SelectItem value="business-expansion">Business Expansion</SelectItem>
                  <SelectItem value="compliance">Compliance & Legal</SelectItem>
                  <SelectItem value="general">General Business Consultation</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="2:00-3:30">2:00 PM - 3:30 PM</SelectItem>
                  <SelectItem value="4:00-5:30">4:00 PM - 5:30 PM</SelectItem>
                  <SelectItem value="6:00-7:30">6:00 PM - 7:30 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessNeeds" className="text-sm font-medium text-gray-700">
                Business Requirements
              </Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="businessNeeds"
                  placeholder="Describe your business challenges, and specific requirements for UAE market entry or expansion..."
                  className="pl-10 min-h-[100px] resize-none"
                  value={formData.businessNeeds}
                  onChange={(e) => handleInputChange("businessNeeds", e.target.value)}
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
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                Submit Consultation Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UAEBusinessConsultant
