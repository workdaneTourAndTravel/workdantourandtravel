"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Home, Package, Settings, Users, ChevronDown, Plane, MapPin, Building, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const packagesItems = [
  {
    title: "Dubai Tour",
    href: "/packages/dubai-tour",
    description: "Explore the city of Dubai with a guided tour",
    icon: MapPin,
  },
  {
    title: "China Tour",
    href: "/packages/china-tour",
    description: "Discover the ancient wonders and modern marvel of China",
    icon: MapPin,
  },
  {
    title: "Thailand Tour",
    href: "/packages/thailand-tour",
    description: "Discover the magic of Thailand with our premium tour packages",
    icon: MapPin,
  },
  {
    title: "Delhi Tour",
    href: "/packages/delhi-tour",
    description: "Discover the magic of Delhi with our premium tour packages",
    icon: MapPin,
  },
  {
    title: "Turkey Tour",
    href: "/packages/turkey-tour",
    description: "Discover the magic of Turkey with our premium tour packages",
    icon: MapPin,
  }
]

const servicesItems = [
  {
    title: "Travel Planning & Consultation",
    href: "/services/travel-planning-consultation",
    description:
    "Whether you're planning a honeymoon, a solo trip, or a group adventure this service is for you.",
    icon: Users,
  },
  {
    title: "UAE Business Consultant Activities",
    href: "/services/uae-business-consultant-activities",
    description: 
    "From company setup to strategic advisory, our service provides these services and more ",
    icon: Settings,
  },
  {
    title: "Visa Services",
    href: "/services/visa-services",
    description:
      "Professional visa consultation and application assistance for seamless international travel",
    icon: Globe,
  }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex items-center">
            <Image src="/logo/navbar-workdan-logo.png" alt="workdan logo" width={100} height={200} />
            <div className="ml-3">
              <div className="text-xl font-bold text-blue-500">WORKDANE TOUR AND TRAVEL</div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-200"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about-us"
                  className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-200"
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                Packages
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[400px] p-4 space-y-2">
                  {packagesItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-blue-600"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="h-5 w-5 text-blue-500" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.title}</div>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[500px] p-4 space-y-2">
                  {servicesItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-blue-600"
                        >
                          <div className="flex items-start space-x-3">
                            <item.icon className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.title}</div>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-3">{item.description}</p>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-2">
          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
          >
            <Link href="/contact">Get In Touch</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 bg-transparent"
          >
            <Link href="/booking?page=hotel" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Book a Hotel</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 bg-transparent"
          >
            <Link href="/booking?page=flight" className="flex items-center space-x-2">
              <Plane className="h-4 w-4" />
              <span>Book a Flight</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden" size="icon">
              <Menu className="h-6 w-6 text-gray-700" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="flex items-center space-x-3 text-left">
                <Image src="/logo/navbar-workdan-logo.png" alt="workdan logo" width={100} height={200} />
                <div>
                  <div className="text-lg font-bold text-blue-500">WORKDAN TOUR AND TRAVEL</div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-6 mt-8">
              <Link
                href="/"
                className="flex items-center space-x-3 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>

              <Link
                href="/about-us"
                className="flex items-center space-x-3 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Users className="h-5 w-5" />
                <span>Who We Are</span>
              </Link>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5" />
                    <span>Packages</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3 ml-8">
                  {packagesItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5" />
                    <span>Services</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3 ml-8">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <div className="pt-6 space-y-3">
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Get In Touch
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full font-medium bg-transparent"
                >
                  <Link
                    href="/booking?page=hotel"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Building className="h-4 w-4" />
                    <span>Book a Hotel</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-full font-medium bg-transparent"
                >
                  <Link
                    href="/booking?page=flight"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Plane className="h-4 w-4" />
                    <span>Book a Flight</span>
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
