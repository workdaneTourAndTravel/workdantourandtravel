import type { ReactNode } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DestinationCardProps {
  title: string
  description: string
  imageSrc: string
  icon: ReactNode
  tags: string[]
}

export default function DestinationCard({ title, description, imageSrc, icon, tags }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden group border-none shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {/* <div className="absolute bottom-4 left-4 flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              {tag}
            </Badge>
          ))}
        </div> */}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-blue-400">{icon}</div>
          <span className="text-sm font-medium text-blue-400">Featured Destination</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-4">{description}</p>
        {/* <Button variant="outline" className="w-full">
          Discover the Story
        </Button> */}
      </CardContent>
    </Card>
  )
}
