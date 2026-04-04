import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

interface StoryTestimonialProps {
  name: string
  journey: string
  quote: string
  imageSrc: string
}

export default function StoryTestimonial({ name, journey, quote, imageSrc }: StoryTestimonialProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-3 border-blue-200 shadow-md">
            <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{name}</h3>
            <p className="text-sm text-blue-600 font-medium">{journey}</p>
            <div className="flex gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <Quote className="absolute -top-2 -left-1 h-8 w-8 text-blue-200" />
          <p className="pl-8 italic text-muted-foreground leading-relaxed text-base">{quote}</p>
        </div>
      </CardContent>
    </Card>
  )
}
