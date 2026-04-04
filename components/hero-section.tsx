"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

const textVariants = {
	hidden: {
		opacity: 0,
		y: 50,
		scale: 0.9,
	},
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			delay: i * 0.2,
			duration: 0.8,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	}),
}

const wordVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.1,
			duration: 0.6,
			ease: "easeOut",
		},
	}),
}

const buttonVariants = {
	hidden: { opacity: 0, scale: 0.8, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			delay: 0.8,
			duration: 0.6,
			ease: "easeOut",
		},
	},
	hover: {
		scale: 1.05,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
	tap: {
		scale: 0.95,
	},
}

function AnimatedText({
	text,
	className,
	delay = 0,
}: {
	text: string
	className: string
	delay?: number
}) {
	const words = text.split(" ")

	return (
		<motion.div className={className} initial="hidden" animate="visible">
			{words.map((word, i) => (
				<motion.span
					key={i}
					custom={i + delay}
					variants={wordVariants}
					className="inline-block mr-3"
				>
					{word}
				</motion.span>
			))}
		</motion.div>
	)
}

export default function HeroSection() {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [slides, setSlides] = useState<any[]>([])

	useEffect(() => {
		const fetchHeroes = async () => {
			try {
				const response = await fetch(`${STRAPI_URL}/api/heroes?populate=*`);
				const data = await response.json();
				const order = ['Plan Your Journey', 'Explore The World', 'Book Your Flight', 'Luxury Stays', 'Business Solutions'];
				const fetchedSlides = (data.data || [])
					.filter((hero: any) => hero.is_active)
					.map((hero: any) => ({
						id: hero.id,
						image: `${STRAPI_URL}${hero.background_image?.[0]?.formats?.large?.url || hero.background_image?.[0]?.url}`,
						title: hero.title,
						subtitle: hero.subtitle,
						buttonText: hero.button_text,
						buttonLink: hero.button_link,
					}))
					.sort((a: any, b: any) => order.indexOf(a.title) - order.indexOf(b.title));
				setSlides(fetchedSlides);
			} catch (error) {
				console.error('Error fetching heroes from Strapi:', error);
			}
		};

		fetchHeroes();
	}, []);

	useEffect(() => {
		if (slides.length === 0) return

		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length)
		}, 7000)

		return () => clearInterval(interval)
	}, [slides.length])

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length)
	}

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
	}

	if (slides.length === 0) {
		return null
	}

	return (
		<section className="relative h-[85vh] sm:h-[90vh] md:h-screen w-full overflow-hidden bg-black">
			<AnimatePresence>
				<motion.div
					key={currentSlide}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.7, ease: "easeInOut" }}
					className="absolute inset-0"
				>
					<Image
						src={slides[currentSlide].image || "/placeholder.svg"}
						alt={slides[currentSlide].title}
						fill
						className="object-cover"
						priority
					/>
					{/* Dark gradient overlay for text readability */}
					<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
				</motion.div>
			</AnimatePresence>

			{/* Content */}
			<div className="relative z-10 flex h-full items-center justify-center">
				<div className="container mx-auto px-4 text-center">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentSlide}
							initial="hidden"
							animate="visible"
							exit="hidden"
							className="max-w-4xl mx-auto"
						>
							{/* Main Title */}
							<AnimatedText
								text={slides[currentSlide].title}
								className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight drop-shadow-lg"
							/>

							{/* Subtitle */}
							<motion.div
								custom={2}
								variants={textVariants}
								className="mb-10"
							>
								<p className="text-xl md:text-2xl lg:text-3xl text-white/90 tracking-wide font-light">
									{slides[currentSlide].subtitle}
								</p>
							</motion.div>

							{/* CTA Button */}
							<motion.div
								variants={buttonVariants}
								whileHover="hover"
								whileTap="tap"
								className="inline-block"
							>
								<Button
									size="lg"
									className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-full shadow-2xl group"
									asChild
								>
									<a
										href={slides[currentSlide].buttonLink}
										className="flex items-center gap-3"
									>
										{slides[currentSlide].buttonText}
										<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
									</a>
								</Button>
							</motion.div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			{/* Navigation Controls */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex items-center gap-3">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`transition-all duration-300 rounded-full ${
								index === currentSlide
									? "w-8 h-3 bg-white"
									: "w-3 h-3 bg-white/50 hover:bg-white/75"
							}`}
						/>
					))}
				</div>
			</div>

			{/* Arrow Navigation */}
			<button
				onClick={prevSlide}
				className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 group"
			>
				<ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-200" />
			</button>

			<button
				onClick={nextSlide}
				className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 group"
			>
				<ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
			</button>

			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 2, duration: 1 }}
				className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
			>
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
				/>
			</motion.div>
		</section>
	)
}
