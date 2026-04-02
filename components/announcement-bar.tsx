"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Info, AlertTriangle, CheckCircle, AlertOctagon } from "lucide-react"
import type { Announcement } from "@/lib/strapi/banners"

const typeStyles: Record<Announcement['type'], { bg: string; border: string; text: string; icon: typeof Info }> = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: Info,
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: AlertTriangle,
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: CheckCircle,
  },
  urgent: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: AlertOctagon,
  },
}

interface AnnouncementBarProps {
  announcements: Announcement[]
}

export default function AnnouncementBar({ announcements }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set())

  const visible = announcements.filter((a) => !dismissed.has(a.id))

  if (visible.length === 0) return null

  return (
    <div className="w-full">
      {visible.map((announcement) => {
        const style = typeStyles[announcement.type]
        const Icon = style.icon

        return (
          <div
            key={announcement.id}
            className={`${style.bg} ${style.border} border-b ${style.text}`}
          >
            <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3">
              <Icon className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm font-medium text-center">
                {announcement.message}
                {announcement.link_text && announcement.link_url && (
                  <>
                    {" "}
                    <Link
                      href={announcement.link_url}
                      className="underline font-semibold hover:opacity-80 transition-opacity"
                    >
                      {announcement.link_text}
                    </Link>
                  </>
                )}
              </p>
              {announcement.is_dismissible && (
                <button
                  onClick={() => setDismissed((prev) => new Set(prev).add(announcement.id))}
                  className="flex-shrink-0 p-0.5 rounded hover:bg-black/10 transition-colors"
                  aria-label="Dismiss announcement"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
