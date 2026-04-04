'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'motion/react'
import { Play, ImageIcon, X, ZoomIn, Filter } from 'lucide-react'
import { DialogTitle } from '@radix-ui/react-dialog'

// Sample gallery data
const media = [
  {
    type: 'image',
    src: '/packages/desert-safari/WhatsApp Image 2025-06-13 at 11.30.04 AM.jpeg',
    alt: 'our successfull travel experience',
    title: 'Our Successful Travel Experience',
    description: 'A guy of our waiting for our customers'
  },
  {
    type: 'image',
    src: '/packages/desert-safari/WhatsApp Image 2025-06-13 at 11.30.18 AM.jpeg',
    alt: 'our successfull travel experience',
    title: 'Our Successful Travel Experience',
    description: 'A guy of our waiting for our customers'
  },
  {
    type: 'image',
    src: '/packages/desert-safari/WhatsApp Image 2025-06-13 at 11.30.19 AM.jpeg',
    alt: 'our successfull travel experience',
    title: 'Our Successful Travel Experience',
    description: 'A guy of our waiting for our customers'
  },
  {
    type: 'image',
    src: '/gallery/photos/WhatsApp Image 2025-06-04 at 6.38.38 PM.jpeg',
    alt: 'our successfull travel experience',
    title: 'Our Successful Travel Experience',
    description: 'A guy of our waiting for our customers'
  },
  {
    type: 'vimeo',
    src: 'https://www.tiktok.com/@workdantravel/video/7507657859098889528?is_from_webapp=1&sender_device=pc&web_id=7453532249875727878',
    title: 'Ethiopia Travel Experience',
    description: 'Discover the beauty of Ethiopia'
  },
  {
    type: 'image',
    src: '/gallery/photos/WhatsApp Image 2025-06-04 at 6.38.52 PM.jpeg',
    alt: 'our successfull travels',
    title: 'Our Successful Travels',
    description: 'A photo of our successful travels'
  },
  {
    type: 'vimeo',
    src: 'https://player.vimeo.com/video/327809043',
    title: 'Cultural Heritage Tour',
    description: 'Experience Ethiopian culture and traditions'
  },
  {
    type: 'image',
    src: '/packages/desert-safari/WhatsApp Image 2025-06-13 at 11.30.25 AM.jpeg',
    alt: 'our successfull travels',
    title: 'Our Successful Travels',
    description: 'A photo of our successful travels'
  },
  {
    type: 'image',
    src: '/packages/desert-safari/WhatsApp Image 2025-06-13 at 11.30.33 AM.jpeg',
    alt: 'our successfull travels',
    title: 'Our Successful Travels',
    description: 'A photo of our successful travels'
  },
  {
    type: 'image',
    src: '/packages/desert-safari/WhatsApp Image 2025-06-13 at 11.30.36 AM.jpeg',
    alt: 'our successfull travels',
    title: 'Our Successful Travels',
    description: 'A photo of our successful travels'
  },
  {
    type: 'image',
    src: '/packages/desert-safari/WhatsApp Image 2025-06-13 at 11.30.37 AM (1).jpeg',
    alt: 'our successfull travels',
    title: 'Our Successful Travels',
    description: 'A photo of our successful travels'
  },
  {
    type: 'image',
    src: '/packages/desert-safari/WhatsApp Image 2025-06-13 at 11.30.37 AM.jpeg',
    alt: 'our successfull travels',
    title: 'Our Successful Travels',
    description: 'A photo of our successful travels'
  },
]

const filters = [
  { key: 'all', label: 'All Media', icon: Filter },
  { key: 'image', label: 'Photos', icon: ImageIcon },
  { key: 'vimeo', label: 'Videos', icon: Play }
]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'vimeo'>('all')
  const [selectedItem, setSelectedItem] = useState<typeof media[0] | null>(null)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const filteredMedia =
    activeFilter === 'all'
      ? media
      : media.filter((item) => item.type === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-blue-50 via-white to-amber-50 min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-amber-600 bg-clip-text text-transparent mb-4">
          Travel Gallery
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the breathtaking beauty of Ethiopia through our curated collection of photos and videos
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center gap-4 mb-12"
      >
        {filters.map((filter) => {
          const Icon = filter.icon
          return (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter.key as any)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105'
                  : 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          )
        })}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="wait">
          {filteredMedia.map((item, index) => (
            <motion.div
              key={`${item.src}-${activeFilter}`}
              variants={itemVariants}
              layout
              onClick={() => setSelectedItem(item)}
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
              className="cursor-pointer group"
            >
              <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0 relative">
                  {/* Media Content */}
                  <div className="relative overflow-hidden">
                    {item.type === 'image' ? (
                      <div className="relative">
                        <img
                          src={item.src || "/placeholder.svg"}
                          alt={item.alt || 'Gallery image'}
                          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Zoom Icon */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                            <ZoomIn className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-gray-100">
                        <iframe
                          src={`${item.src}?background=1&muted=1`}
                          width="100%"
                          height="100%"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          className="w-full h-full"
                        />
                        
                        {/* Video Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        
                        {/* Play Icon */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                            <Play className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        variant="secondary" 
                        className={`${
                          item.type === 'image' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {item.type === 'image' ? (
                          <><ImageIcon className="w-3 h-3 mr-1" /> Photo</>
                        ) : (
                          <><Play className="w-3 h-3 mr-1" /> Video</>
                        )}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title || item.alt || 'Untitled'}
                    </h3>
                    
                    {item.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-gray-400 mb-4">
            <Filter className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No media found</h3>
          <p className="text-gray-500">Try selecting a different filter</p>
        </motion.div>
      )}

      {/* Modal Preview */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
            <DialogTitle></DialogTitle>
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedItem(null)}
                  className="absolute -top-12 right-0 z-50 bg-white/90 hover:bg-white text-gray-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Media Container */}
                <div className="rounded-2xl overflow-hidden bg-white shadow-2xl">
                  {selectedItem.type === 'image' ? (
                    <div className="relative">
                      <img
                        src={selectedItem.src || "/placeholder.svg"}
                        alt={selectedItem.alt || 'Preview'}
                        className="w-full h-auto object-contain max-h-[80vh]"
                      />
                      
                      {/* Image Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-white text-xl font-bold mb-2">
                          {selectedItem.title || selectedItem.alt}
                        </h3>
                        {selectedItem.description && (
                          <p className="text-white/90 text-sm">
                            {selectedItem.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video">
                      <iframe
                        src={selectedItem.src}
                        width="100%"
                        height="100%"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}