"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import {
  Plane,
  FileCheck,
  Clock,
  Shield,
  Briefcase,
  GraduationCap,
  Heart,
  Phone,
  Mail,
  User,
  MessageSquare,
  MapPin,
  Calendar,
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

function VisaServices({ whatsappNumber = "251906700007" }: { whatsappNumber?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    destination: "",
    visaType: "",
    travelDate: "",
    preferredDate: "",
    preferredTime: "",
    additionalInfo: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    // console.log("Visa consultation form submitted:", formData)

    const {
      fullName,
      email,
      phone,
      nationality,
      destination,
      visaType,
      travelDate,
      preferredDate,
      preferredTime,
      additionalInfo,
    } = formData

    // Message structure
    const message = `
 *Visa Consultation Request* 🌟

👤 *From*: ${fullName}
📧 *Email*: ${email}
📞 *Phone*: ${phone}
 *Nationality/Passport Country*: ${nationality}
 *Destination Country*: ${destination}
 *Visa Type*: ${visaType}
📅 *Intended Travel Date*: ${travelDate}
📅 *Preferred Date*: ${preferredDate}
⏰ *Preferred Time*: ${preferredTime}  
📝 *Additional Information*: ${additionalInfo || 'N/A'}

✨ Please confirm availability. Looking forward to starting my visa journey! 🚀
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
      nationality: "",
      destination: "",
      visaType: "",
      travelDate: "",
      preferredDate: "",
      preferredTime: "",
      additionalInfo: "",
    })
  }

  const services = [
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Tourist Visas",
      description: "Leisure travel visas for vacation, sightseeing, and short-term visits worldwide",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Business Visas",
      description: "Professional travel visas for meetings, conferences, and business activities",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Student Visas",
      description: "Educational visas for study abroad programs, universities, and academic exchanges",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Family Visas",
      description: "Reunion visas for family visits, spouse visas, and dependent applications",
    },
  ]

  const destinations = [
    {
      region: "Europe",
      countries: ["Schengen Area", "UK", "Ireland", "Switzerland"],
      processingTime: "5-15 days",
      color: "blue",
    },
    {
      region: "North America",
      countries: ["USA", "Canada", "Mexico"],
      processingTime: "3-30 days",
      color: "green",
    },
    {
      region: "Asia Pacific",
      countries: ["Australia", "New Zealand", "Japan", "Singapore"],
      processingTime: "3-20 days",
      color: "purple",
    },
    {
      region: "Middle East",
      countries: ["UAE", "Saudi Arabia", "Qatar", "Turkey"],
      processingTime: "1-10 days",
      color: "orange",
    },
  ]

  const faqs = [
    {
      question: "How long does visa processing typically take?",
      answer:
        "Processing times vary by destination and visa type. Tourist visas typically take 3-15 business days, while business and student visas may take 2-6 weeks. We provide accurate timelines during consultation based on your specific requirements.",
    },
    {
      question: "What documents do I need for a visa application?",
      answer:
        "Common requirements include a valid passport, completed application form, passport photos, proof of accommodation, travel itinerary, financial statements, and travel insurance. Specific requirements vary by destination and visa type.",
    },
    {
      question: "Can you guarantee visa approval?",
      answer:
        "While we cannot guarantee approval (as this is the embassy's decision), our expert guidance and thorough application preparation significantly increase your chances of success. We have a 95%+ approval rate across all visa types.",
    },
    {
      question: "What if my visa application is rejected?",
      answer:
        "In case of rejection, we provide detailed feedback on the reasons and assist with reapplication strategies. We also offer appeal services where applicable and help strengthen your application for future submissions.",
    },
    {
      question: "Do you provide expedited visa services?",
      answer:
        "Yes, we offer expedited processing for urgent travel needs where available. Express services can reduce processing times by 50-70% for an additional fee, subject to embassy availability.",
    },
    {
      question: "Can you help with visa extensions or renewals?",
      answer:
        "We assist with visa extensions, renewals, and status changes. Our team helps navigate the requirements for extending your stay or changing your visa category while in the destination country.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services/visa-services/visa-services.jpg?height=800&width=1200"
            alt="International travel and visa services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-8 h-8 mr-3" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Global Visa Solutions
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Professional Visa Services</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Expert visa consultation and application assistance for seamless international travel
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Book Visa Consultation
          </Button>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Comprehensive Visa Solutions Worldwide
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Navigate the complex world of international visas with confidence. Our expert team provides personalized
              consultation and end-to-end application support for all types of visas, ensuring your travel plans proceed
              smoothly and efficiently.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From tourist and business visas to student and family reunification applications, we handle every detail
              with precision and care, backed by years of experience and deep knowledge of global immigration
              requirements.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">50,000+</div>
                <div className="text-sm text-gray-600">Visas Processed</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">95%+</div>
                <div className="text-sm text-gray-600">Approval Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/services/visa-services/visa-services-mid.jpg?height=800&width=1200"
              alt="Visa consultation and documentation"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Visa Types */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">Visa Types We Handle</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
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

        {/* Destinations Coverage */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">Global Destinations</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{destination.region}</CardTitle>
                    <Badge
                      variant="outline"
                      className={`text-xs ${destination.color === "blue"
                          ? "border-blue-500 text-blue-600"
                          : destination.color === "green"
                            ? "border-green-500 text-green-600"
                            : destination.color === "purple"
                              ? "border-purple-500 text-purple-600"
                              : "border-orange-500 text-orange-600"
                        }`}
                    >
                      {destination.processingTime}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {destination.countries.map((country, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-2" />
                        {country}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Features */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <FileCheck className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Document Review</h4>
              <p className="text-gray-600">Comprehensive document verification and preparation assistance</p>
            </div>
            <div>
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Fast Processing</h4>
              <p className="text-gray-600">Expedited services available for urgent travel needs</p>
            </div>
            <div>
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Success Guarantee</h4>
              <p className="text-gray-600">95%+ approval rate with expert application guidance</p>
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Visa Application?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get expert guidance and ensure your visa application success with our professional consultation services
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Schedule Visa Consultation
          </Button>
        </div>
      </section>

      {/* Visa Consultation Booking Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <Plane className="w-6 h-6 mr-2 text-blue-600" />
              Book Visa Consultation
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name (as per passport) *
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
              <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">
                Nationality/Passport Country *
              </Label>
              <Select value={formData.nationality} onValueChange={(value) => handleInputChange("nationality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethiopia">Ethiopia</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="philippines">Philippines</SelectItem>
                  <SelectItem value="egypt">Egypt</SelectItem>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
                Destination Country *
              </Label>
              <Select value={formData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="schengen">Schengen Area</SelectItem>
                  <SelectItem value="uae">United Arab Emirates</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visaType" className="text-sm font-medium text-gray-700">
                Visa Type *
              </Label>
              <Select value={formData.visaType} onValueChange={(value) => handleInputChange("visaType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourist">Tourist/Visitor Visa</SelectItem>
                  <SelectItem value="business">Business Visa</SelectItem>
                  <SelectItem value="student">Student Visa</SelectItem>
                  <SelectItem value="work">Work Visa</SelectItem>
                  <SelectItem value="family">Family/Spouse Visa</SelectItem>
                  <SelectItem value="transit">Transit Visa</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelDate" className="text-sm font-medium text-gray-700">
                Intended Travel Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="travelDate"
                  type="date"
                  className="pl-10"
                  value={formData.travelDate}
                  onChange={(e) => handleInputChange("travelDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
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
                  <SelectItem value="9:00-10:00">9:00 AM - 10:00 AM</SelectItem>
                  <SelectItem value="10:30-11:30">10:30 AM - 11:30 AM</SelectItem>
                  <SelectItem value="12:00-1:00">12:00 PM - 1:00 PM</SelectItem>
                  <SelectItem value="2:30-3:30">2:30 PM - 3:30 PM</SelectItem>
                  <SelectItem value="4:00-5:00">4:00 PM - 5:00 PM</SelectItem>
                  <SelectItem value="5:30-6:30">5:30 PM - 6:30 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-sm font-medium text-gray-700">
                Additional Information
              </Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="additionalInfo"
                  placeholder="Any specific questions, previous visa history, or additional details you'd like to discuss..."
                  className="pl-10 min-h-[100px] resize-none"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
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
                Book Consultation
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default VisaServices
