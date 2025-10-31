# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js travel agency website for Werkdan Tour and Travel built with TypeScript, React 19, and Tailwind CSS. The site features tour packages, services, and booking functionality with modern UI components.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 5 (strict mode enabled)
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics and Speed Insights
- **Animations**: Motion (Framer Motion successor), AOS
- **Forms**: React Hook Form with Zod validation

### Project Structure

```
app/
├── about-us/          - About page
├── api/               - API routes
├── booking/           - Booking functionality
├── chronicles/        - Blog/news section
├── contact/           - Contact page
├── gallery/           - Photo gallery
├── packages/          - Tour packages (China, Dubai, Thailand, Turkey, Delhi)
├── services/          - Travel services and consultations
├── globals.css        - Global styles with CSS variables
├── layout.tsx         - Root layout with Navbar, Footer, Analytics
├── page.tsx           - Homepage
└── WhatsappLive.tsx   - WhatsApp integration

components/
├── ui/                - shadcn/ui components (43 components)
├── Footer.tsx         - Site footer
├── Navbar.tsx         - Main navigation
├── hero-section.tsx   - Homepage hero
├── destination-card.tsx - Tour destination cards
├── service-card.tsx   - Service display cards
└── ...other shared components

lib/
└── utils.ts           - Utility functions (Tailwind merge, clsx)
```

### Key Features
- Multi-page tour packages with detailed itineraries
- Service pages for visa, consultation, and business activities
- WhatsApp live chat integration
- Tawk.to customer support
- Responsive design with mobile-first approach
- SEO optimized with proper metadata

### Styling System
- Uses CSS custom properties for theming (--primary, --secondary, etc.)
- Extended Tailwind colors: amber and stone palettes
- shadcn/ui design system with consistent spacing and typography
- Dark mode support configured (class-based)

### Component Patterns
- Server Components by default (RSC enabled)
- Client components for interactive elements
- shadcn/ui components follow Radix UI patterns
- Consistent use of `cn()` utility for conditional classes
- TypeScript interfaces for all component props

### Third-party Integrations
- Vercel Analytics and Speed Insights
- Tawk.to chat widget
- WhatsApp business integration
- AOS (Animate On Scroll) for animations

### Path Aliases
- `@/*` - Root directory
- `@/components` - Components directory
- `@/lib` - Utilities and helpers
- `@/hooks` - React hooks

## Development Notes

- The project uses React 19 with Next.js 15 (latest versions)
- Strict TypeScript configuration with ES6 target
- All UI components are from shadcn/ui, avoid creating custom base components
- Follow the existing component patterns when adding new features
- Use the established color system and CSS variables for theming
- Tour packages are organized by destination in separate directories
- The site includes comprehensive third-party integrations for customer support