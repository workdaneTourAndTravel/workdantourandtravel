import type { ReactNode } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface DestinationCardProps {
  title: string
  description: string
  imageSrc: string
  icon: ReactNode
  tags: string[]
  featured?: boolean
}

export default function DestinationCard({ title, description, imageSrc, icon, tags, featured = false }: DestinationCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
        featured ? "md:col-span-2 md:row-span-2 h-full" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative w-full overflow-hidden ${featured ? "h-full min-h-[500px]" : "h-[380px]"}`}>
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Tags - top right */}
        {tags.length > 0 && (
          <div className="absolute top-4 right-4 flex gap-2 flex-wrap justify-end">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                className="bg-white/15 text-white backdrop-blur-md border border-white/20 hover:bg-white/25 text-xs font-medium px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Content overlay - bottom */}
        <div className="absolute bottom-0 inset-x-0 p-6 transform transition-transform duration-500">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-500/80 backdrop-blur-sm rounded-lg text-white">
              {icon}
            </div>
            <span className="text-blue-300 text-sm font-semibold tracking-wide uppercase">
              Destination
            </span>
          </div>
          <h3 className={`font-bold text-white mb-2 leading-tight ${featured ? "text-3xl" : "text-2xl"}`}>
            {title}
          </h3>
          <p className={`text-white/80 leading-relaxed ${featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"}`}>
            {description}
          </p>
          {/* Explore indicator */}
          <div className="mt-4 flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300">
            <span className="text-sm font-medium">Explore destination</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
