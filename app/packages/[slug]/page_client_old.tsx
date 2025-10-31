"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, notFound } from "next/navigation"
import { Clock, Users, Star, X, ChevronDown, ChevronUp, LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

// TypeScript Interfaces
interface BookingFormData {
  fullName: string
  email: string
  phone: string
  participants: string
  preferredDate: string
  comments: string
}

interface FAQItem {
  question: string
  answer: string
  isOpen: boolean
}

interface PackageFeature {
  icon: string
  title: string
  description: string
}

interface TourHighlight {
  title: string
  description: string
}

interface StrapiImage {
  url: string
  formats?: {
    large?: { url: string }
    medium?: { url: string }
    small?: { url: string }
  }
}

interface TourPageData {
  id: number
  title: string
  slug: string
  subtitle: string
  heroImage: StrapiImage | null
  mainImage: StrapiImage | null
  description: string
  price: string
  currency: string
  duration: string
  groupSize: string
  rating: string
  packageFeatures: PackageFeature[]
  tourHighlights: TourHighlight[]
  faqs: FAQItem[]
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  primaryColor: string
  whatsappNumber: string
  bookingTitle: string
}

// Helper function to get Lucide icon by name
const getIconComponent = (iconName: string): LucideIcon => {
  const Icon = (LucideIcons as any)[iconName]
  return Icon || LucideIcons.HelpCircle
}

// Helper function to extract text from Strapi rich text
const extractStrapiText = (richText: any): string => {
  if (typeof richText === 'string') return richText
  if (Array.isArray(richText)) {
    return richText
      .map(block => block?.children?.map((child: any) => child?.text || '').join('') || '')
      .join('\n')
  }
  return ''
}

// Helper function to get image URL from Strapi
const getStrapiImageUrl = (image: any, baseUrl: string = 'http://localhost:1337'): string => {
  if (!image) return '/placeholder.svg'

  const imageData = image
  const url = imageData?.formats?.large?.url || imageData?.formats?.medium?.url || imageData?.url

  if (!url) return '/placeholder.svg'

  return url.startsWith('http') ? url : `${baseUrl}${url}`
}

function DynamicTourPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [tourData, setTourData] = useState<TourPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    participants: "1",
    preferredDate: "",
    comments: "",
  })
  const [formErrors, setFormErrors] = useState<Partial<BookingFormData>>({})
  const [faqItems, setFaqItems] = useState<FAQItem[]>([])

  // Fetch tour data from Strapi
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
        const response = await fetch(`${baseUrl}/api/tour-pages?filters[slug][$eq]=${slug}&populate=*`)

        if (!response.ok) {
          throw new Error('Failed to fetch tour data')
        }

        const result = await response.json()

        if (!result.data || result.data.length === 0) {
          notFound()
          return
        }

        const data = result.data[0]

        const tourPageData: TourPageData = {
          id: data.id,
          title: data.title || '',
          slug: data.slug || '',
          subtitle: '',
          heroImage: data.hero_image,
          mainImage: data.main_image,
          description: data.short_description || '',
          price: data.price || '',
          currency: data.price_note || 'birr',
          duration: '',
          groupSize: '',
          rating: '4.9/5',
          packageFeatures: data.services?.map((s: any) => ({
            icon: s.icon || 'HelpCircle',
            title: s.title,
            description: s.description || ''
          })) || [],
          tourHighlights: data.highlights?.sort((a: any, b: any) => a.order - b.order).map((h: any) => ({
            title: h.title,
            description: h.description
          })) || [],
          faqs: data.faqs?.map((f: any) => ({
            question: f.question,
            answer: f.answer || ''
          })) || [],
          ctaTitle: data.cta_title || `Ready to Explore ${data.title}?`,
          ctaDescription: data.cta_description || '',
          ctaButtonText: 'Book Now',
          primaryColor: 'blue', // Default, or determine based on slug if needed
          whatsappNumber: data.whatsapp_number?.replace(/\D/g, '') || '251906700007',
          bookingTitle: `Book Your ${data.title}`,
        }

        setTourData(tourPageData)
        setFaqItems(tourPageData.faqs.map(faq => ({ ...faq, isOpen: false })))
        setError(null)
      } catch (err) {
        console.error('Error fetching tour data:', err)
        setError('Failed to load tour package. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchTourData()
    }
  }, [slug])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name as keyof BookingFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const errors: Partial<BookingFormData> = {}

    if (!formData.fullName.trim()) errors.fullName = "Full name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required"
    if (!formData.participants || Number.parseInt(formData.participants) < 1) {
      errors.participants = "At least 1 participant is required"
    }
    if (!formData.preferredDate) errors.preferredDate = "Please select a preferred date"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm() && tourData) {
      const { fullName, email, phone, participants, preferredDate, comments } = formData

      const message = `
📍 *Booking Request - ${tourData.title}*

👤 *Name:* ${fullName}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
👥 *Participants:* ${participants}
📅 *Preferred Date:* ${preferredDate}
📝 *Comments:* ${comments || "N/A"}

Please provide package details and confirm availability.
      `.trim()

      const whatsappURL = `https://wa.me/${tourData.whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappURL, "_blank")

      setIsModalOpen(false)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        participants: "1",
        preferredDate: "",
        comments: "",
      })
    }
  }

  const toggleFAQ = (index: number) => {
    setFaqItems((prev) => prev.map((item, i) => (i === index ? { ...item, isOpen: !item.isOpen } : item)))
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormErrors({})
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading tour package...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !tourData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error || 'Tour package not found'}</p>
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // Color mapping for gradients
  const colorSchemes: Record<string, { gradient: string, border: string, text: string, bg: string, hover: string }> = {
    blue: {
      gradient: 'from-blue-600 to-cyan-600',
      border: 'border-blue-200',
      text: 'text-blue-600',
      bg: 'bg-blue-100',
      hover: 'hover:bg-blue-700'
    },
    red: {
      gradient: 'from-red-600 to-orange-600',
      border: 'border-red-200',
      text: 'text-red-600',
      bg: 'bg-red-100',
      hover: 'hover:bg-red-700'
    },
    green: {
      gradient: 'from-green-600 to-emerald-600',
      border: 'border-green-200',
      text: 'text-green-600',
      bg: 'bg-green-100',
      hover: 'hover:bg-green-700'
    },
    purple: {
      gradient: 'from-purple-600 to-pink-600',
      border: 'border-purple-200',
      text: 'text-purple-600',
      bg: 'bg-purple-100',
      hover: 'hover:bg-purple-700'
    },
  }

  const colors = colorSchemes[tourData.primaryColor] || colorSchemes.blue

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r z-10"></div>
        <Image
          src={getStrapiImageUrl(tourData.heroImage)}
          alt={`${tourData.title} Experience`}
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Package Details Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="relative h-[450px] rounded-2xl overflow-hidden">
              <Image
                src={getStrapiImageUrl(tourData.mainImage)}
                alt={`${tourData.title} Main`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{tourData.title}</h2>
              {tourData.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 text-lg leading-relaxed mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            {/* Pricing */}
            <div className={`bg-gradient-to-r from-${tourData.primaryColor}-50 to-${tourData.primaryColor === 'red' ? 'orange' : 'cyan'}-50 p-6 rounded-2xl border ${colors.border}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Starting from</p>
                  <p className={`text-3xl font-bold ${colors.text}`}>{tourData.price} {tourData.currency}</p>
                  <p className="text-sm text-gray-500">per person</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">24/7 support</p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            {tourData.packageFeatures && tourData.packageFeatures.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Services</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {tourData.packageFeatures.map((feature, index) => {
                    const IconComponent = getIconComponent(feature.icon)
                    return (
                      <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 ${colors.bg} rounded-lg`}>
                              <IconComponent className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tour Highlights */}
            {tourData.tourHighlights && tourData.tourHighlights.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Popular Destinations</h3>
                <div className="space-y-3">
                  {tourData.tourHighlights.map((highlight, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                        <span className={`${colors.text} font-semibold text-sm`}>{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{highlight.title}</p>
                        <p className="text-gray-600 text-sm">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqItems.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    aria-expanded={faq.isOpen}
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    {faq.isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {faq.isOpen && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`py-16 px-4 bg-gradient-to-r ${colors.gradient}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{tourData.ctaTitle}</h2>
          {tourData.ctaDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {paragraph.trim()}
            </p>
          ))}
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className={`bg-white ${colors.text} hover:bg-gray-50 text-lg px-8 py-4 h-auto font-semibold`}
          >
            {tourData.ctaButtonText}
          </Button>
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{tourData.bookingTitle}</h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`mt-1 ${formErrors.fullName ? "border-red-500" : ""}`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 ${formErrors.email ? "border-red-500" : ""}`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`mt-1 ${formErrors.phone ? "border-red-500" : ""}`}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="participants" className="text-sm font-medium text-gray-700">
                    Number of Participants *
                  </Label>
                  <Input
                    id="participants"
                    name="participants"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.participants}
                    onChange={handleInputChange}
                    className={`mt-1 ${formErrors.participants ? "border-red-500" : ""}`}
                  />
                  {formErrors.participants && <p className="text-red-500 text-sm mt-1">{formErrors.participants}</p>}
                </div>

                <div>
                  <Label htmlFor="preferredDate" className="text-sm font-medium text-gray-700">
                    Preferred Date *
                  </Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className={`mt-1 ${formErrors.preferredDate ? "border-red-500" : ""}`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {formErrors.preferredDate && <p className="text-red-500 text-sm mt-1">{formErrors.preferredDate}</p>}
                </div>

                <div>
                  <Label htmlFor="comments" className="text-sm font-medium text-gray-700">
                    Tour Preferences & Special Requests
                  </Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Any special requirements or preferences..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={closeModal} className="flex-1 bg-transparent">
                    Cancel
                  </Button>
                  <Button type="submit" className={`flex-1 ${colors.text.replace('text-', 'bg-')} ${colors.hover}`}>
                    Submit Booking
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DynamicTourPage