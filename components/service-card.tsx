import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  popular?: boolean
  link?: string
}

export default function ServiceCard({ title, description, icon: Icon, features, popular, link }: ServiceCardProps) {
  return (
    <Card className="border-none shadow-lg h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="pt-8 pb-0 flex-1">
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
            <Icon className="h-8 w-8" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-center mb-3 text-gray-900">{title}</h3>
        <p className="text-muted-foreground text-center mb-6 leading-relaxed">{description}</p>
        {features.length > 0 && (
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-6 pb-6">
        <Link href={link || "#"} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Learn More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
