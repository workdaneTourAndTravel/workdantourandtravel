"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  CalendarDays,
  MapPin,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Plane,
  CheckCircle,
  Upload,
  X,
  Plus,
  Minus,
  AlertCircle,
  Check,
  ChevronsUpDown,
  Building2,
  Calendar,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type BookingType = "flight" | "hotel"

interface PassengerCounts {
  adults: number
  children: number
  infants: number
}

interface HotelGuests {
  adults: number
  children: number
}

interface FlightSegment {
  id: string
  from: string
  to: string
  departDate: string
}

interface FlightFormData {
  from: string
  to: string
  departDate: string
  returnDate: string
  segments: FlightSegment[] // Add this line
  passengers: PassengerCounts
  name: string
  email: string
  phone: string
  message: string
  images: (File | string)[]
}

interface HotelFormData {
  destination: string
  checkInDate: string
  checkOutDate: string
  guests: HotelGuests
  rooms: number
  name: string
  email: string
  phone: string
  message: string
  images: (File | string)[]
}

interface FormErrors {
  [key: string]: string | undefined
}

interface Airport {
  label: string
  value: string
}

interface City {
  label: string
  value: string
}

interface BookingFormProps {
  whatsappNumber?: string
}

export default function BookingForm({ whatsappNumber = "251906700007" }: BookingFormProps) {
  const [bookingType, setBookingType] = useState<BookingType>("flight")
  const [airportOptions, setAirportOptions] = useState<Airport[]>([])
  const [cityOptions, setCityOptions] = useState<City[]>([])
  const [tripType, setTripType] = useState<"roundtrip" | "oneway" | "multicity">("roundtrip")
  const [step, setStep] = useState(1)
  const [openFrom, setOpenFrom] = useState(false)
  const [openTo, setOpenTo] = useState(false)
  const [openDestination, setOpenDestination] = useState(false)

  const [flightFormData, setFlightFormData] = useState<FlightFormData>({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    segments: [
      { id: "1", from: "", to: "", departDate: "" },
      { id: "2", from: "", to: "", departDate: "" },
    ], // Add this line
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    name: "",
    email: "",
    phone: "",
    message: "",
    images: [],
  })

  const [hotelFormData, setHotelFormData] = useState<HotelFormData>({
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    guests: {
      adults: 2,
      children: 0,
    },
    rooms: 1,
    name: "",
    email: "",
    phone: "",
    message: "",
    images: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Load airports for flight booking
    fetch("/data/airports.json")
      .then((res) => res.json())
      .then((data: Airport[]) => {
        const formattedOptions = data.map((airport) => ({
          label: airport.label,
          value: airport.value,
        }))
        setAirportOptions(formattedOptions)
      })
      .catch((error) => {
        console.error("Error fetching airports:", error)
      })

    // Load cities for hotel booking (using airports as cities for demo)
    fetch("/data/airports.json")
      .then((res) => res.json())
      .then((data: Airport[]) => {
        const formattedCities = data.map((airport) => ({
          label: airport.label.split(",")[0], // Extract city name
          value: airport.value,
        }))
        setCityOptions(formattedCities)
      })
      .catch((error) => {
        console.error("Error fetching cities:", error)
      })
  }, [])

  const resetForms = () => {
    setStep(1)
    setErrors({})
    setFlightFormData({
      from: "",
      to: "",
      departDate: "",
      returnDate: "",
      segments: [
        { id: "1", from: "", to: "", departDate: "" },
        { id: "2", from: "", to: "", departDate: "" },
      ], // Add this line
      passengers: { adults: 1, children: 0, infants: 0 },
      name: "",
      email: "",
      phone: "",
      message: "",
      images: [],
    })
    setHotelFormData({
      destination: "",
      checkInDate: "",
      checkOutDate: "",
      guests: { adults: 2, children: 0 },
      rooms: 1,
      name: "",
      email: "",
      phone: "",
      message: "",
      images: [],
    })
  }

  const handleBookingTypeChange = (type: BookingType) => {
    setBookingType(type)
    resetForms()
  }

  // Flight form handlers
  const handleFlightInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFlightFormData((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }))
    }
  }

  // Hotel form handlers
  const handleHotelInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setHotelFormData((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }))
    }
  }

  const handleAirportSelect = (field: "from" | "to", value: string) => {
    const selectedAirport = airportOptions.find((airport) => airport.value === value)
    setFlightFormData((prev) => ({
      ...prev,
      [field]: selectedAirport ? selectedAirport.label : value,
    }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    if (field === "from") setOpenFrom(false)
    if (field === "to") setOpenTo(false)
  }

  const handleCitySelect = (value: string) => {
    const selectedCity = cityOptions.find((city) => city.value === value)
    setHotelFormData((prev) => ({
      ...prev,
      destination: selectedCity ? selectedCity.label : value,
    }))
    if (errors.destination) {
      setErrors((prev) => ({ ...prev, destination: undefined }))
    }
    setOpenDestination(false)
  }

  const handleFlightPassengerChange = (type: keyof PassengerCounts, increment: boolean) => {
    setFlightFormData((prev) => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [type]: increment ? prev.passengers[type] + 1 : Math.max(0, prev.passengers[type] - 1),
      },
    }))
    if (errors.passengers) {
      setErrors((prev) => ({ ...prev, passengers: undefined }))
    }
  }

  const handleHotelGuestChange = (type: keyof HotelGuests, increment: boolean) => {
    setHotelFormData((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]: increment ? prev.guests[type] + 1 : Math.max(type === "adults" ? 1 : 0, prev.guests[type] - 1),
      },
    }))
    if (errors.guests) {
      setErrors((prev) => ({ ...prev, guests: undefined }))
    }
  }

  const handleRoomChange = (increment: boolean) => {
    setHotelFormData((prev) => ({
      ...prev,
      rooms: increment ? prev.rooms + 1 : Math.max(1, prev.rooms - 1),
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/")
      const isValidSize = file.size <= 5 * 1024 * 1024
      return isValidType && isValidSize
    })

    const uploadedUrls: string[] = []
    for (const file of validFiles) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "booking_upload")
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dj9nxwgc5/image/upload", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        uploadedUrls.push(data.secure_url)
      } catch (err) {
        console.error("Cloudinary upload failed", err)
      }
    }

    if (bookingType === "flight") {
      setFlightFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls].slice(0, 5),
      }))
    } else {
      setHotelFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls].slice(0, 5),
      }))
    }
  }

  const removeImage = (index: number) => {
    if (bookingType === "flight") {
      setFlightFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }))
    } else {
      setHotelFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }))
    }
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: undefined }))
    }
  }

  const addFlightSegment = () => {
    const newSegment: FlightSegment = {
      id: Date.now().toString(),
      from: "",
      to: "",
      departDate: "",
    }
    setFlightFormData((prev) => ({
      ...prev,
      segments: [...prev.segments, newSegment],
    }))
  }

  const removeFlightSegment = (segmentId: string) => {
    setFlightFormData((prev) => ({
      ...prev,
      segments: prev.segments.filter((segment) => segment.id !== segmentId),
    }))
  }

  const handleSegmentChange = (segmentId: string, field: keyof FlightSegment, value: string) => {
    setFlightFormData((prev) => ({
      ...prev,
      segments: prev.segments.map((segment) => (segment.id === segmentId ? { ...segment, [field]: value } : segment)),
    }))
    // Clear errors for this segment
    if (errors[`segment-${segmentId}-${field}`]) {
      setErrors((prev) => ({ ...prev, [`segment-${segmentId}-${field}`]: undefined }))
    }
  }

  const handleSegmentAirportSelect = (segmentId: string, field: "from" | "to", value: string) => {
    const selectedAirport = airportOptions.find((airport) => airport.value === value)
    const airportLabel = selectedAirport ? selectedAirport.label : value
    handleSegmentChange(segmentId, field, airportLabel)
  }

  const validateFlightStep1 = (): boolean => {
    const newErrors: FormErrors = {}

    if (tripType === "multicity") {
      // Validate multi-city segments
      flightFormData.segments.forEach((segment, index) => {
        if (!segment.from.trim()) {
          newErrors[`segment-${segment.id}-from`] = `Flight ${index + 1} departure city is required`
        }
        if (!segment.to.trim()) {
          newErrors[`segment-${segment.id}-to`] = `Flight ${index + 1} destination city is required`
        }
        if (!segment.departDate) {
          newErrors[`segment-${segment.id}-departDate`] = `Flight ${index + 1} departure date is required`
        }
        // Validate that departure date is not in the past
        if (segment.departDate && new Date(segment.departDate) < new Date()) {
          newErrors[`segment-${segment.id}-departDate`] = `Flight ${index + 1} departure date cannot be in the past`
        }
        // Validate that subsequent flights are after previous ones
        if (index > 0 && segment.departDate && flightFormData.segments[index - 1].departDate) {
          if (new Date(segment.departDate) <= new Date(flightFormData.segments[index - 1].departDate)) {
            newErrors[`segment-${segment.id}-departDate`] = `Flight ${index + 1} must be after flight ${index}`
          }
        }
      })
    } else {
      // Original validation for roundtrip and oneway
      if (!flightFormData.from.trim()) {
        newErrors.from = "Departure city is required"
      }
      if (!flightFormData.to.trim()) {
        newErrors.to = "Destination city is required"
      }
      if (!flightFormData.departDate) {
        newErrors.departDate = "Departure date is required"
      }
      if (tripType === "roundtrip" && !flightFormData.returnDate) {
        newErrors.returnDate = "Return date is required for round trip"
      }
      if (tripType === "roundtrip" && flightFormData.departDate && flightFormData.returnDate) {
        if (new Date(flightFormData.returnDate) <= new Date(flightFormData.departDate)) {
          newErrors.returnDate = "Return date must be after departure date"
        }
      }
    }

    // Common passenger validation
    const totalPassengers =
      flightFormData.passengers.adults + flightFormData.passengers.children + flightFormData.passengers.infants
    if (totalPassengers === 0) {
      newErrors.passengers = "At least one passenger is required"
    }
    if (
      flightFormData.passengers.adults === 0 &&
      (flightFormData.passengers.children > 0 || flightFormData.passengers.infants > 0)
    ) {
      newErrors.passengers = "At least one adult is required when traveling with children or infants"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateHotelStep1 = (): boolean => {
    const newErrors: FormErrors = {}
    if (!hotelFormData.destination.trim()) {
      newErrors.destination = "Destination is required"
    }
    if (!hotelFormData.checkInDate) {
      newErrors.checkInDate = "Check-in date is required"
    }
    if (!hotelFormData.checkOutDate) {
      newErrors.checkOutDate = "Check-out date is required"
    }
    if (hotelFormData.checkInDate && hotelFormData.checkOutDate) {
      if (new Date(hotelFormData.checkOutDate) <= new Date(hotelFormData.checkInDate)) {
        newErrors.checkOutDate = "Check-out date must be after check-in date"
      }
    }
    const totalGuests = hotelFormData.guests.adults + hotelFormData.guests.children
    if (totalGuests === 0) {
      newErrors.guests = "At least one guest is required"
    }
    if (hotelFormData.guests.adults === 0) {
      newErrors.guests = "At least one adult is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const currentData = bookingType === "flight" ? flightFormData : hotelFormData
    const newErrors: FormErrors = {}
    if (!currentData.name.trim()) {
      newErrors.name = "Full name is required"
    }
    if (!currentData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!currentData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(currentData.phone.replace(/[\s\-()]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Flight-specific passport validation
    if (bookingType === "flight") {
      const passportValidation = validatePassportRequirements()
      if (!passportValidation) {
        return false
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePassportRequirements = (): boolean => {
  const totalPassengers =
    flightFormData.passengers.adults + flightFormData.passengers.children + flightFormData.passengers.infants;
  const requiredPassports = flightFormData.passengers.adults + flightFormData.passengers.children; // Infants might travel on parent's passport

  if (flightFormData.images.length === 0) {
    setErrors((prev) => ({ ...prev, images: "Passport documents are required for all travelers" }));
    return false;
  }

  if (flightFormData.images.length < requiredPassports) {
    setErrors((prev) => ({
      ...prev,
      images: `Please upload ${requiredPassports} passport documents (${flightFormData.passengers.adults} adults + ${flightFormData.passengers.children} children). Infants may travel on parent's passport.`,
    }));
    return false;
  }

  if (flightFormData.images.length > totalPassengers) {
    setErrors((prev) => ({
      ...prev,
      images: `Too many documents uploaded. Maximum ${totalPassengers} documents allowed for ${totalPassengers} passengers.`,
    }));
    return false;
  }

  return true;
};

  const nextStep = () => {
    if (step === 1) {
      const isValid = bookingType === "flight" ? validateFlightStep1() : validateHotelStep1()
      if (!isValid) return
    }
    if (step === 2 && !validateStep2()) return
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    setErrors({})
  }

  const formatWhatsAppMessage = () => {
    if (bookingType === "flight") {
      const { name, phone, email, from, to, departDate, returnDate, segments, passengers, message, images } =
        flightFormData
      const passengerCount = `👥 Adults: ${passengers.adults}, Children: ${passengers.children}, Infants: ${passengers.infants}`
      const imgLinks = images.length > 0 ? images.map((url) => `📎 ${url}`).join("\n") : "No attachments"

      let flightDetails = ""
      if (tripType === "multicity") {
        flightDetails = segments
          .map((segment, index) => `✈️ Flight ${index + 1}: ${segment.from} → ${segment.to} (${segment.departDate})`)
          .join("\n")
      } else {
        flightDetails = `🛫 From: ${from}\n🛬 To: ${to}\n📅 Departure: ${departDate}`
        if (tripType === "roundtrip") {
          flightDetails += `\n📅 Return: ${returnDate}`
        }
      }

      const text = `✈️ *New Flight Booking Inquiry* ✈️

🧍 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
🎫 Trip Type: ${tripType.charAt(0).toUpperCase() + tripType.slice(1)}
${flightDetails}
${passengerCount}
📝 Message: ${message || "No message"}
📁 Documents:
${imgLinks}`.trim()
      return encodeURIComponent(text)
    } else {
      const { name, phone, email, destination, checkInDate, checkOutDate, guests, rooms, message, images } =
        hotelFormData
      const guestCount = `👥 Adults: ${guests.adults}, Children: ${guests.children}`
      const imgLinks = images.length > 0 ? images.map((url) => `📎 ${url}`).join("\n") : "No attachments"
      const text = `🏨 *New Hotel Booking Inquiry* 🏨

🧍 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
📍 Destination: ${destination}
📅 Check-in: ${checkInDate}
📅 Check-out: ${checkOutDate}
${guestCount}
🛏️ Rooms: ${rooms}
📝 Message: ${message || "No message"}
📁 Documents:
${imgLinks}`.trim()
      return encodeURIComponent(text)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return
    setIsSubmitted(true)
    const waMessage = formatWhatsAppMessage()
    window.open(`https://wa.me/${whatsappNumber}?text=${waMessage}`, "_blank")
    setTimeout(() => {
      setIsSubmitted(false)
      resetForms()
    }, 3000)
  }

  const getTotalPassengers = () => {
    return flightFormData.passengers.adults + flightFormData.passengers.children + flightFormData.passengers.infants
  }

  const getTotalGuests = () => {
    return hotelFormData.guests.adults + hotelFormData.guests.children
  }

  const currentFormData = bookingType === "flight" ? flightFormData : hotelFormData

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-2xl rounded-3xl border border-gray-200 overflow-hidden bg-white">
        <CardContent className="p-0">
          {/* Booking Type Switcher */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div className="flex justify-center gap-2 mb-4">
              <Button
                onClick={() => handleBookingTypeChange("flight")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  bookingType === "flight"
                    ? "bg-white text-blue-600 shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Plane className="w-5 h-5" />
                Book a Flight
              </Button>
              <Button
                onClick={() => handleBookingTypeChange("hotel")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  bookingType === "hotel"
                    ? "bg-white text-purple-600 shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Building2 className="w-5 h-5" />
                Book a Hotel
              </Button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="bg-gray-50 p-4">
            <div className="flex justify-between items-center px-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step >= item
                        ? bookingType === "flight"
                          ? "bg-blue-600 text-white"
                          : "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">
                    {item === 1
                      ? `${bookingType === "flight" ? "Flight" : "Hotel"} Details`
                      : item === 2
                        ? "Personal Info"
                        : "Confirm"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 bg-gray-200 rounded-full">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  bookingType === "flight" ? "bg-blue-600" : "bg-purple-600"
                }`}
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <h2 className={`text-3xl font-bold text-center text-gray-800 flex items-center justify-center gap-2`}>
              <span className={bookingType === "flight" ? "text-blue-600" : "text-purple-600"}>
                {bookingType === "flight" ? <Plane className="inline-block" /> : <Building2 className="inline-block" />}
              </span>
              {step === 1
                ? `Book Your ${bookingType === "flight" ? "Flight" : "Hotel"}`
                : step === 2
                  ? "Your Details"
                  : isSubmitted
                    ? `${bookingType === "flight" ? "Flight" : "Hotel"} Booking Confirmed!`
                    : "Review & Submit"}
            </h2>

            <AnimatePresence mode="wait">
              {step === 1 && bookingType === "flight" && (
                <motion.div
                  key="flight-step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Trip Type Toggle */}
                  <div className="flex justify-center gap-3">
                    {["roundtrip", "oneway", "multicity"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setTripType(type as any)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          tripType === type
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Multi-city or Regular Flight Fields */}
                  {tripType === "multicity" ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">Flight Segments</h3>
                        <Button
                          type="button"
                          onClick={addFlightSegment}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                          disabled={flightFormData.segments.length >= 6}
                        >
                          <Plus className="w-4 h-4" />
                          Add Flight
                        </Button>
                      </div>

                      {flightFormData.segments.map((segment, index) => (
                        <div key={segment.id} className="border border-gray-200 rounded-xl p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-800">Flight {index + 1}</h4>
                            {flightFormData.segments.length > 2 && (
                              <Button
                                type="button"
                                onClick={() => removeFlightSegment(segment.id)}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {/* From */}
                            <div className="space-y-2">
                              <Label className="flex items-center gap-1 text-gray-700">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                From
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                                      errors[`segment-${segment.id}-from`] ? "border-red-500" : "",
                                      !segment.from && "text-muted-foreground",
                                    )}
                                  >
                                    {segment.from || "Select city..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start">
                                  <Command>
                                    <CommandInput placeholder="Search airports..." />
                                    <CommandList>
                                      <CommandEmpty>No airport found.</CommandEmpty>
                                      <CommandGroup>
                                        {airportOptions.map((airport) => (
                                          <CommandItem
                                            key={airport.value}
                                            value={airport.label}
                                            onSelect={() =>
                                              handleSegmentAirportSelect(segment.id, "from", airport.value)
                                            }
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                segment.from === airport.label ? "opacity-100" : "opacity-0",
                                              )}
                                            />
                                            {airport.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              {errors[`segment-${segment.id}-from`] && (
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {errors[`segment-${segment.id}-from`]}
                                </p>
                              )}
                            </div>

                            {/* To */}
                            <div className="space-y-2">
                              <Label className="flex items-center gap-1 text-gray-700">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                To
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                                      errors[`segment-${segment.id}-to`] ? "border-red-500" : "",
                                      !segment.to && "text-muted-foreground",
                                    )}
                                  >
                                    {segment.to || "Select city..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start">
                                  <Command>
                                    <CommandInput placeholder="Search airports..." />
                                    <CommandList>
                                      <CommandEmpty>No airport found.</CommandEmpty>
                                      <CommandGroup>
                                        {airportOptions.map((airport) => (
                                          <CommandItem
                                            key={airport.value}
                                            value={airport.label}
                                            onSelect={() => handleSegmentAirportSelect(segment.id, "to", airport.value)}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                segment.to === airport.label ? "opacity-100" : "opacity-0",
                                              )}
                                            />
                                            {airport.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              {errors[`segment-${segment.id}-to`] && (
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {errors[`segment-${segment.id}-to`]}
                                </p>
                              )}
                            </div>

                            {/* Departure Date */}
                            <div className="space-y-2">
                              <Label className="flex items-center gap-1 text-gray-700">
                                <CalendarDays className="w-4 h-4 text-blue-600" />
                                Departure
                              </Label>
                              <Input
                                type="date"
                                className={`rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                                  errors[`segment-${segment.id}-departDate`] ? "border-red-500" : ""
                                }`}
                                value={segment.departDate}
                                onChange={(e) => handleSegmentChange(segment.id, "departDate", e.target.value)}
                                min={
                                  index === 0
                                    ? new Date().toISOString().split("T")[0]
                                    : flightFormData.segments[index - 1]?.departDate ||
                                      new Date().toISOString().split("T")[0]
                                }
                              />
                              {errors[`segment-${segment.id}-departDate`] && (
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {errors[`segment-${segment.id}-departDate`]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Multi-city tip:</strong> Plan your journey with up to 6 flight segments. Each flight
                          should be scheduled after the previous one.
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Original From and To Fields for roundtrip and oneway
                    <>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="from" className="flex items-center gap-1 text-gray-700">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            Departure City
                          </Label>
                          <Popover open={openFrom} onOpenChange={setOpenFrom}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openFrom}
                                className={cn(
                                  "w-full justify-between rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                                  errors.from ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
                                  !flightFormData.from && "text-muted-foreground",
                                )}
                              >
                                {flightFormData.from || "Select departure city..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0" align="start">
                              <Command>
                                <CommandInput placeholder="Search airports..." />
                                <CommandList>
                                  <CommandEmpty>No airport found.</CommandEmpty>
                                  <CommandGroup>
                                    {airportOptions.map((airport) => (
                                      <CommandItem
                                        key={airport.value}
                                        value={airport.label}
                                        onSelect={() => handleAirportSelect("from", airport.value)}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            flightFormData.from === airport.label ? "opacity-100" : "opacity-0",
                                          )}
                                        />
                                        {airport.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          {errors.from && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.from}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="to" className="flex items-center gap-1 text-gray-700">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            Destination City
                          </Label>
                          <Popover open={openTo} onOpenChange={setOpenTo}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openTo}
                                className={cn(
                                  "w-full justify-between rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                                  errors.to ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
                                  !flightFormData.to && "text-muted-foreground",
                                )}
                              >
                                {flightFormData.to || "Select destination city..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0" align="start">
                              <Command>
                                <CommandInput placeholder="Search airports..." />
                                <CommandList>
                                  <CommandEmpty>No airport found.</CommandEmpty>
                                  <CommandGroup>
                                    {airportOptions.map((airport) => (
                                      <CommandItem
                                        key={airport.value}
                                        value={airport.label}
                                        onSelect={() => handleAirportSelect("to", airport.value)}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            flightFormData.to === airport.label ? "opacity-100" : "opacity-0",
                                          )}
                                        />
                                        {airport.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          {errors.to && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.to}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="departDate" className="flex items-center gap-1 text-gray-700">
                            <CalendarDays className="w-4 h-4 text-blue-600" />
                            Departure Date
                          </Label>
                          <Input
                            type="date"
                            id="departDate"
                            className={`rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                              errors.departDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                            }`}
                            value={flightFormData.departDate}
                            onChange={handleFlightInputChange}
                            min={new Date().toISOString().split("T")[0]}
                          />
                          {errors.departDate && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.departDate}
                            </p>
                          )}
                        </div>

                        {tripType === "roundtrip" && (
                          <div className="space-y-2">
                            <Label htmlFor="returnDate" className="flex items-center gap-1 text-gray-700">
                              <CalendarDays className="w-4 h-4 text-blue-600" />
                              Return Date
                            </Label>
                            <Input
                              type="date"
                              id="returnDate"
                              className={`rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                                errors.returnDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                              }`}
                              value={flightFormData.returnDate}
                              onChange={handleFlightInputChange}
                              min={flightFormData.departDate || new Date().toISOString().split("T")[0]}
                            />
                            {errors.returnDate && (
                              <p className="text-red-500 text-sm flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.returnDate}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Passengers Section */}
                  <div className="space-y-4">
                    <Label className="flex items-center gap-1 text-gray-700">
                      <Users className="w-4 h-4 text-blue-600" />
                      Passengers
                    </Label>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Adults</p>
                          <p className="text-sm text-gray-500">12+ years</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleFlightPassengerChange("adults", false)}
                            disabled={flightFormData.passengers.adults <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{flightFormData.passengers.adults}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleFlightPassengerChange("adults", true)}
                            disabled={getTotalPassengers() >= 9}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Children</p>
                          <p className="text-sm text-gray-500">2-11 years</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleFlightPassengerChange("children", false)}
                            disabled={flightFormData.passengers.children <= 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{flightFormData.passengers.children}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleFlightPassengerChange("children", true)}
                            disabled={getTotalPassengers() >= 9}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Infants</p>
                          <p className="text-sm text-gray-500">Under 2 years</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleFlightPassengerChange("infants", false)}
                            disabled={flightFormData.passengers.infants <= 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{flightFormData.passengers.infants}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleFlightPassengerChange("infants", true)}
                            disabled={
                              getTotalPassengers() >= 9 ||
                              flightFormData.passengers.infants >= flightFormData.passengers.adults
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {errors.passengers && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.passengers}
                      </p>
                    )}
                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      <p className="font-medium">
                        Total: {getTotalPassengers()} passenger{getTotalPassengers() !== 1 ? "s" : ""}
                      </p>
                      {flightFormData.passengers.infants > 0 && (
                        <p className="text-xs mt-1">
                          Note: Infants must be accompanied by adults (1 infant per adult maximum)
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4 text-base py-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors"
                    size="lg"
                    onClick={nextStep}
                  >
                    Continue to Personal Details
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              {step === 1 && bookingType === "hotel" && (
                <motion.div
                  key="hotel-step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Destination */}
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="flex items-center gap-1 text-gray-700">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      Destination
                    </Label>
                    <Popover open={openDestination} onOpenChange={setOpenDestination}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openDestination}
                          className={cn(
                            "w-full justify-between rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500",
                            errors.destination ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
                            !hotelFormData.destination && "text-muted-foreground",
                          )}
                        >
                          {hotelFormData.destination || "Select destination..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search cities..." />
                          <CommandList>
                            <CommandEmpty>No city found.</CommandEmpty>
                            <CommandGroup>
                              {cityOptions.map((city) => (
                                <CommandItem
                                  key={city.value}
                                  value={city.label}
                                  onSelect={() => handleCitySelect(city.value)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      hotelFormData.destination === city.label ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {city.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.destination && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.destination}
                      </p>
                    )}
                  </div>

                  {/* Check-in and Check-out Dates */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="checkInDate" className="flex items-center gap-1 text-gray-700">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        Check-in Date
                      </Label>
                      <Input
                        type="date"
                        id="checkInDate"
                        className={`rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                          errors.checkInDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                        value={hotelFormData.checkInDate}
                        onChange={handleHotelInputChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.checkInDate && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.checkInDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="checkOutDate" className="flex items-center gap-1 text-gray-700">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        Check-out Date
                      </Label>
                      <Input
                        type="date"
                        id="checkOutDate"
                        className={`rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                          errors.checkOutDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                        value={hotelFormData.checkOutDate}
                        onChange={handleHotelInputChange}
                        min={hotelFormData.checkInDate || new Date().toISOString().split("T")[0]}
                      />
                      {errors.checkOutDate && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.checkOutDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Guests and Rooms */}
                  <div className="space-y-4">
                    <Label className="flex items-center gap-1 text-gray-700">
                      <Users className="w-4 h-4 text-purple-600" />
                      Guests & Rooms
                    </Label>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Adults</p>
                          <p className="text-sm text-gray-500">18+ years</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleHotelGuestChange("adults", false)}
                            disabled={hotelFormData.guests.adults <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{hotelFormData.guests.adults}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleHotelGuestChange("adults", true)}
                            disabled={getTotalGuests() >= 10}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Children</p>
                          <p className="text-sm text-gray-500">0-17 years</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleHotelGuestChange("children", false)}
                            disabled={hotelFormData.guests.children <= 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{hotelFormData.guests.children}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleHotelGuestChange("children", true)}
                            disabled={getTotalGuests() >= 10}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Rooms */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Rooms</p>
                          <p className="text-sm text-gray-500">Number of rooms</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleRoomChange(false)}
                            disabled={hotelFormData.rooms <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{hotelFormData.rooms}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full bg-transparent"
                            onClick={() => handleRoomChange(true)}
                            disabled={hotelFormData.rooms >= 5}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {errors.guests && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.guests}
                      </p>
                    )}
                    <div className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                      <p className="font-medium">
                        Total: {getTotalGuests()} guest{getTotalGuests() !== 1 ? "s" : ""} • {hotelFormData.rooms} room
                        {hotelFormData.rooms !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4 text-base py-6 rounded-xl bg-purple-600 hover:bg-purple-700 transition-colors"
                    size="lg"
                    onClick={nextStep}
                  >
                    Continue to Personal Details
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-1 text-gray-700">
                        <User className={`w-4 h-4 ${bookingType === "flight" ? "text-blue-600" : "text-purple-600"}`} />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className={`rounded-xl border-gray-300 ${
                          bookingType === "flight"
                            ? "focus:border-blue-500 focus:ring-blue-500"
                            : "focus:border-purple-500 focus:ring-purple-500"
                        } ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        value={currentFormData.name}
                        onChange={bookingType === "flight" ? handleFlightInputChange : handleHotelInputChange}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-1 text-gray-700">
                        <Mail className={`w-4 h-4 ${bookingType === "flight" ? "text-blue-600" : "text-purple-600"}`} />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className={`rounded-xl border-gray-300 ${
                          bookingType === "flight"
                            ? "focus:border-blue-500 focus:ring-blue-500"
                            : "focus:border-purple-500 focus:ring-purple-500"
                        } ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        value={currentFormData.email}
                        onChange={bookingType === "flight" ? handleFlightInputChange : handleHotelInputChange}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-1 text-gray-700">
                        <Phone
                          className={`w-4 h-4 ${bookingType === "flight" ? "text-blue-600" : "text-purple-600"}`}
                        />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+251 911 123 456"
                        className={`rounded-xl border-gray-300 ${
                          bookingType === "flight"
                            ? "focus:border-blue-500 focus:ring-blue-500"
                            : "focus:border-purple-500 focus:ring-purple-500"
                        } ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        value={currentFormData.phone}
                        onChange={bookingType === "flight" ? handleFlightInputChange : handleHotelInputChange}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1 text-gray-700">
                        <Upload
                          className={`w-4 h-4 ${bookingType === "flight" ? "text-blue-600" : "text-purple-600"}`}
                        />
                        Upload {bookingType === "flight" ? "Passport Documents" : "Documents"}{" "}
                        {bookingType === "flight" && getTotalPassengers() > 1 ? "(Required)" : ""}
                      </Label>

                      {/* Passport Requirements Info - Only for flights */}
                      {bookingType === "flight" && getTotalPassengers() > 1 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm">
                              <p className="font-medium text-amber-800">Passport Requirements:</p>
                              <ul className="text-amber-700 mt-1 space-y-1">
                                <li>
                                  • Adults: {flightFormData.passengers.adults} passport
                                  {flightFormData.passengers.adults > 1 ? "s" : ""} required
                                </li>
                                {flightFormData.passengers.children > 0 && (
                                  <li>
                                    • Children: {flightFormData.passengers.children} passport
                                    {flightFormData.passengers.children > 1 ? "s" : ""} required
                                  </li>
                                )}
                                {flightFormData.passengers.infants > 0 && (
                                  <li>• Infants: May travel on parent's passport (check with airline)</li>
                                )}
                              </ul>
                              <p className="mt-2 text-xs text-amber-600">
                                Total documents needed:{" "}
                                {flightFormData.passengers.adults + flightFormData.passengers.children}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center hover:border-${bookingType === "flight" ? "blue" : "purple"}-400 transition-colors ${
                          errors.images ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      >
                        <input
                          type="file"
                          id="images"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label htmlFor="images" className="cursor-pointer flex flex-col items-center gap-2">
                          <Upload className={`w-8 h-8 ${errors.images ? "text-red-400" : "text-gray-400"}`} />
                          <p className={`text-sm ${errors.images ? "text-red-600" : "text-gray-600"}`}>
                            Click to upload {bookingType === "flight" ? "passport documents" : "documents"}
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
                          {bookingType === "flight" && getTotalPassengers() > 1 && (
                            <p className="text-xs font-medium text-blue-600">
                              {currentFormData.images.length} of{" "}
                              {flightFormData.passengers.adults + flightFormData.passengers.children} documents uploaded
                            </p>
                          )}
                        </label>
                      </div>
                      {errors.images && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.images}
                        </p>
                      )}

                      {/* Display uploaded images */}
                      {currentFormData.images.length > 0 && (
                        <div className="grid grid-cols-1 gap-3 mt-3">
                          {currentFormData.images.map((file, index) => (
                            <div key={index} className="relative group">
                              <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                                <Upload
                                  className={`w-4 h-4 ${bookingType === "flight" ? "text-blue-600" : "text-purple-600"} flex-shrink-0`}
                                />
                                <div className="flex-1">
                                  <span className="text-sm text-gray-700 truncate block">
                                    {bookingType === "flight" ? "Passport" : "Document"} #{index + 1} -{" "}
                                    {file instanceof File ? file.name : "Uploaded Document"}
                                  </span>
                                  {bookingType === "flight" && getTotalPassengers() > 1 && (
                                    <span className="text-xs text-gray-500">
                                      Document {index + 1} of{" "}
                                      {flightFormData.passengers.adults + flightFormData.passengers.children}
                                    </span>
                                  )}
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="w-6 h-6 p-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center gap-1 text-gray-700">
                        <MessageSquare
                          className={`w-4 h-4 ${bookingType === "flight" ? "text-blue-600" : "text-purple-600"}`}
                        />
                        Special Requests
                      </Label>
                      <Textarea
                        id="message"
                        placeholder={
                          bookingType === "flight"
                            ? "Meal preferences, seat selection, accessibility needs, etc."
                            : "Room preferences, accessibility needs, special occasions, etc."
                        }
                        className={`rounded-xl min-h-[100px] border-gray-300 ${
                          bookingType === "flight"
                            ? "focus:border-blue-500 focus:ring-blue-500"
                            : "focus:border-purple-500 focus:ring-purple-500"
                        }`}
                        value={currentFormData.message}
                        onChange={bookingType === "flight" ? handleFlightInputChange : handleHotelInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 py-6 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                      onClick={prevStep}
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back
                    </Button>
                    <Button
                      className={`flex-1 py-6 rounded-xl transition-colors ${
                        bookingType === "flight" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
                      }`}
                      onClick={nextStep}
                    >
                      Review {bookingType === "flight" ? "Flight" : "Hotel"} Booking
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && !isSubmitted && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Booking Summary */}
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                      {bookingType === "flight" ? (
                        <Plane className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Building2 className="w-5 h-5 text-purple-600" />
                      )}
                      {bookingType === "flight" ? "Flight" : "Hotel"} Booking Summary
                    </h3>

                    {bookingType === "flight" ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Trip Type</p>
                          <p className="font-medium">{tripType.charAt(0).toUpperCase() + tripType.slice(1)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Passengers</p>
                          <p className="font-medium">{getTotalPassengers()}</p>
                          <div className="text-xs text-gray-600 mt-1">
                            {flightFormData.passengers.adults > 0 &&
                              `${flightFormData.passengers.adults} Adult${flightFormData.passengers.adults > 1 ? "s" : ""}`}
                            {flightFormData.passengers.children > 0 &&
                              `, ${flightFormData.passengers.children} Child${flightFormData.passengers.children > 1 ? "ren" : ""}`}
                            {flightFormData.passengers.infants > 0 &&
                              `, ${flightFormData.passengers.infants} Infant${flightFormData.passengers.infants > 1 ? "s" : ""}`}
                          </div>
                        </div>
                        {tripType === "multicity" ? (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-500">Flight Segments</p>
                            <div className="space-y-2">
                              {flightFormData.segments.map((segment, index) => (
                                <div key={segment.id} className="text-sm">
                                  <span className="font-medium">Flight {index + 1}:</span>{" "}
                                  {segment.from || "Not specified"} → {segment.to || "Not specified"}
                                  {segment.departDate && (
                                    <span className="text-gray-600 ml-2">({segment.departDate})</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div>
                              <p className="text-sm text-gray-500">From</p>
                              <p className="font-medium">{flightFormData.from || "Not specified"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">To</p>
                              <p className="font-medium">{flightFormData.to || "Not specified"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Departure Date</p>
                              <p className="font-medium">{flightFormData.departDate || "Not specified"}</p>
                            </div>
                            {tripType === "roundtrip" && (
                              <div>
                                <p className="text-sm text-gray-500">Return Date</p>
                                <p className="font-medium">{flightFormData.returnDate || "Not specified"}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Destination</p>
                          <p className="font-medium">{hotelFormData.destination || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Guests</p>
                          <p className="font-medium">{getTotalGuests()}</p>
                          <div className="text-xs text-gray-600 mt-1">
                            {hotelFormData.guests.adults > 0 &&
                              `${hotelFormData.guests.adults} Adult${hotelFormData.guests.adults > 1 ? "s" : ""}`}
                            {hotelFormData.guests.children > 0 &&
                              `, ${hotelFormData.guests.children} Child${hotelFormData.guests.children > 1 ? "ren" : ""}`}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Check-in Date</p>
                          <p className="font-medium">{hotelFormData.checkInDate || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Check-out Date</p>
                          <p className="font-medium">{hotelFormData.checkOutDate || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rooms</p>
                          <p className="font-medium">
                            {hotelFormData.rooms} room{hotelFormData.rooms !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{currentFormData.name || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{currentFormData.email || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{currentFormData.phone || "Not provided"}</p>
                        </div>
                        {currentFormData.images.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500">Documents</p>
                            <p className="font-medium">
                              {currentFormData.images.length} file{currentFormData.images.length > 1 ? "s" : ""}{" "}
                              uploaded
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {currentFormData.message && (
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-2">Special Requests</h4>
                        <p className="text-gray-700">{currentFormData.message}</p>
                      </div>
                    )}
                  </div>

                  <div className={`${bookingType === "flight" ? "bg-blue-50" : "bg-purple-50"} p-4 rounded-xl`}>
                    <p className={`text-sm ${bookingType === "flight" ? "text-blue-800" : "text-purple-800"}`}>
                      <strong>Note:</strong> This is a booking inquiry. Our team will contact you within minutes with
                      {bookingType === "flight"
                        ? " flight options and pricing details."
                        : " hotel options and pricing details."}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 py-6 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                      onClick={prevStep}
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back
                    </Button>
                    <Button
                      className={`flex-1 py-6 rounded-xl transition-colors ${
                        bookingType === "flight" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
                      }`}
                      onClick={handleSubmit}
                    >
                      Submit {bookingType === "flight" ? "Flight" : "Hotel"} Inquiry
                      <CheckCircle className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && isSubmitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-10"
                >
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                      bookingType === "flight" ? "bg-blue-100" : "bg-purple-100"
                    }`}
                  >
                    <CheckCircle
                      className={`h-10 w-10 ${bookingType === "flight" ? "text-blue-600" : "text-purple-600"}`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {bookingType === "flight" ? "Flight" : "Hotel"} Inquiry Submitted!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for your {bookingType} booking inquiry. Our travel experts will contact you within 24
                    hours with the best {bookingType} options and pricing.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
