"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'

interface BookingFormData {
  fullName: string
  email: string
  phone: string
  participants: string
  preferredDate: string
  comments: string
}

interface BookingModalProps {
  tourTitle: string
  whatsappNumber: string
  buttonClassName?: string
}

export function BookingModal({ tourTitle, whatsappNumber, buttonClassName }: BookingModalProps) {
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
    if (validateForm()) {
      const { fullName, email, phone, participants, preferredDate, comments } = formData

      const message = `
📍 *Booking Request - ${tourTitle}*

👤 *Name:* ${fullName}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
👥 *Participants:* ${participants}
📅 *Preferred Date:* ${preferredDate}
📝 *Comments:* ${comments || "N/A"}

Please provide package details and confirm availability.
      `.trim()

      const cleanNumber = whatsappNumber.replace(/\D/g, '')
      const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
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

  const closeModal = () => {
    setIsModalOpen(false)
    setFormErrors({})
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        size="lg"
        className={buttonClassName}
      >
        Book Your Tour
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Book {tourTitle}</h3>
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
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Submit Booking
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
