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

interface TourLink {
  title: string
  slug: string
}

interface ServiceLink {
  title: string
  slug: string
}

interface NavbarClientProps {
  tourLinks: TourLink[]
  serviceLinks: ServiceLink[]
}

export default function NavbarClient({ tourLinks, serviceLinks }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Transform tour links into the format expected by the component
  const packagesItems = tourLinks.map(tour => ({
    title: tour.title,
    href: `/packages/${tour.slug}`,
    description: `Explore ${tour.title} with our premium tour package`,
    icon: MapPin,
  }))

  // Transform service links into the format expected by the component
  const servicesItems = serviceLinks.map(service => ({
    title: service.title,
    href: `/services/${service.slug}`,
    description: `Professional ${service.title.toLowerCase()} for your needs`,
    icon: service.slug.includes('visa') ? Globe : service.slug.includes('business') ? Settings : Users,
  }))

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
                  {packagesItems.length > 0 ? (
                    packagesItems.map((item) => (
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
                    ))
                  ) : (
                    <li className="p-4 text-center text-sm text-gray-500">
                      No packages available
                    </li>
                  )}
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/packages"
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors bg-blue-50 hover:bg-blue-100 text-center"
                      >
                        <div className="text-sm font-medium text-blue-600">
                          View All Packages →
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[500px] p-4 space-y-2">
                  {servicesItems.length > 0 ? (
                    servicesItems.map((item) => (
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
                    ))
                  ) : (
                    <li className="p-4 text-center text-sm text-gray-500">
                      No services available
                    </li>
                  )}
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/services"
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors bg-green-50 hover:bg-green-100 text-center"
                      >
                        <div className="text-sm font-medium text-green-600">
                          View All Services →
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
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
                  {packagesItems.length > 0 ? (
                    <>
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
                      <Link
                        href="/packages"
                        className="flex items-center space-x-3 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <MapPin className="h-4 w-4" />
                        <span>View All Packages</span>
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 py-1">No packages available</p>
                  )}
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
                  {servicesItems.length > 0 ? (
                    <>
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
                      <Link
                        href="/services"
                        className="flex items-center space-x-3 text-sm text-green-600 hover:text-green-700 font-medium transition-colors py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <Globe className="h-4 w-4" />
                        <span>View All Services</span>
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 py-1">No services available</p>
                  )}
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
