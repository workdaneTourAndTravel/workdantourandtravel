# Dynamic Tour Packages Setup Guide

## 🎯 Overview

Your tour packages are now fully dynamic and powered by Strapi CMS. When you publish a new tour package in Strapi, it will **automatically** appear on your website without any code changes.

---

## 📁 New File Structure

```
app/packages/
├── page.tsx                  # ✅ NEW: Dynamic listing page (Server Component)
├── [slug]/
│   ├── page.tsx             # ✅ NEW: Dynamic tour page (Server Component + SSG)
│   ├── booking-modal.tsx    # ✅ NEW: Client component for booking
│   └── faq-section.tsx      # ✅ NEW: Client component for FAQs

lib/strapi/
└── api.ts                    # ✅ NEW: Strapi API utilities
```

---

## 🚀 How It Works

### 1. **Packages Index Page** (`/packages`)
- **Type**: Server Component
- **Fetches**: All tour pages from Strapi
- **Updates**: Automatically every hour (or on-demand in dev mode)
- **Displays**: Grid of all available tours with images, prices, and highlights

### 2. **Dynamic Tour Pages** (`/packages/[slug]`)
- **Type**: Server Component with Static Site Generation (SSG)
- **Fetches**: Individual tour data based on URL slug
- **Generates**: Static pages at build time for all tours
- **Updates**: Revalidates every hour in production

### 3. **Static Site Generation (SSG)**
- Tours are **pre-rendered at build time**
- Super fast page loads
- SEO friendly
- Auto-regenerates when you redeploy

---

## 📊 Strapi Content Structure

Your Strapi `tour-pages` collection should have these fields:

### Required Fields:
```typescript
{
  slug: string                    // URL-friendly identifier (e.g., "china-tour")
  title: string                   // Tour name
  short_description: string       // Brief description
  price: string                   // Price value (e.g., "115,000")
  price_note: string             // Currency (e.g., "birr")
}
```

### Media Fields:
```typescript
{
  hero_image: Media (Single)      // Large hero image
  main_image: Media (Single)      // Main content image
}
```

### Relations (Components):
```typescript
{
  services: [                     // Service features
    {
      icon: string               // Lucide icon name (e.g., "Building", "Plane")
      title: string              // Service title
      description: string        // Service description
    }
  ],

  highlights: [                   // Tour highlights
    {
      title: string              // Highlight title
      description: string        // Highlight description
      order: number             // Display order
    }
  ],

  faqs: [                        // Frequently asked questions
    {
      question: string           // FAQ question
      answer: string            // FAQ answer
    }
  ]
}
```

### Optional Fields:
```typescript
{
  cta_title: string              // Call-to-action title
  cta_description: string        // CTA description
  whatsapp_number: string        // WhatsApp booking number
}
```

---

## ✨ Key Features

### 1. **Automatic Updates**
- Add a tour in Strapi → Publish → It appears on the website ✅
- No code changes needed
- No manual deployment required (in production with ISR)

### 2. **Performance Optimized**
- **SSG**: Pages pre-rendered at build time
- **ISR**: Incremental Static Regeneration (revalidates hourly)
- **Image Optimization**: Next.js Image component with Strapi CDN
- **Fast Loading**: Pre-generated HTML for instant page loads

### 3. **SEO Friendly**
- Dynamic metadata for each tour
- Server-side rendering
- Proper Open Graph tags (can be extended)
- Search engine friendly URLs

### 4. **Best Practices**
- **Server Components**: Default to server components for better performance
- **Client Components**: Only for interactive parts (modals, FAQs)
- **TypeScript**: Fully typed for reliability
- **Error Handling**: Proper 404 pages for missing tours

---

## 🔧 Implementation Steps

### Step 1: Backup Old Files
```bash
# The old files are already backed up with _old suffix
# app/packages/page.tsx → app/packages/page_old.tsx
# app/packages/[slug]/page.tsx → app/packages/[slug]/page_old.tsx
```

### Step 2: Replace Files
```bash
# Replace index page
mv app/packages/page_new.tsx app/packages/page.tsx

# Replace dynamic page
mv app/packages/[slug]/page_new.tsx app/packages/[slug]/page.tsx
```

### Step 3: Verify Strapi Setup
1. Open Strapi admin: `http://localhost:1337/admin`
2. Go to Content-Type Builder
3. Ensure `tour-pages` collection exists with all fields
4. Publish at least one tour package for testing

### Step 4: Test Locally
```bash
# Start dev server
npm run dev

# Visit pages
http://localhost:3000/packages              # List all tours
http://localhost:3000/packages/china-tour   # Specific tour
```

### Step 5: Build & Deploy
```bash
# Build for production
npm run build

# This will:
# ✅ Fetch all tours from Strapi
# ✅ Generate static pages for each tour
# ✅ Optimize images
# ✅ Create production bundle
```

---

## 📝 Adding a New Tour Package

### In Strapi:

1. **Go to Content Manager** → `Tour Pages` → `Create new entry`

2. **Fill Basic Info**:
   - Slug: `turkey-tour` (URL-friendly, lowercase, dashes)
   - Title: `Turkey Istanbul`
   - Short Description: `Explore the vibrant city of Istanbul...`
   - Price: `95,000`
   - Price Note: `birr`

3. **Upload Images**:
   - Hero Image: Large, high-quality banner image
   - Main Image: Featured tour image

4. **Add Services** (click "+ Add new entry"):
   ```
   Icon: "Building"
   Title: "Luxury Hotels"
   Description: "5-star accommodations in the heart of Istanbul"
   ```

5. **Add Highlights** (with order):
   ```
   Order: 1
   Title: "Hagia Sophia & Blue Mosque"
   Description: "Visit Istanbul's most iconic landmarks"
   ```

6. **Add FAQs**:
   ```
   Question: "Do I need a visa for Turkey?"
   Answer: "Most nationals can get a visa on arrival..."
   ```

7. **Add CTA Info**:
   - CTA Title: `Ready to Explore Turkey?`
   - CTA Description: `Book your Istanbul adventure today...`
   - WhatsApp Number: `251906700007`

8. **Click "Save"** and **"Publish"**

9. **Visit your site**: The tour will automatically appear at:
   - `/packages` (in the grid)
   - `/packages/turkey-tour` (dedicated page)

---

## 🎨 Customizing Colors

Colors are auto-assigned based on slug:
- `china` → Red theme
- `dubai`, `uae` → Blue theme
- `turkey` → Red theme
- `thailand` → Green theme
- Default → Blue theme

To change this logic, edit `app/packages/[slug]/page.tsx`:
```typescript
function determineColorScheme(slug: string): string {
  if (slug.includes('my-tour')) return 'purple'
  // Add your custom rules here
  return 'blue'
}
```

---

## 🔍 Available Lucide Icons

For the `icon` field in services, use any icon name from [Lucide Icons](https://lucide.dev/icons/):

**Popular choices:**
- `Building` - Hotels/Accommodation
- `Plane` - Flights/Travel
- `Car` - Transportation
- `ShoppingBag` - Shopping
- `Utensils` - Food/Dining
- `Camera` - Photography
- `Map` - Navigation
- `Compass` - Adventure
- `Palmtree` - Beach/Tropical
- `Mountain` - Mountains/Hiking
- `Users` - Groups
- `Star` - Featured/Premium

Just use the PascalCase name (e.g., `MapPin`, `CalendarDays`, `Clock`)

---

## ⚡ Performance & Caching

### Development Mode:
- Fetches fresh data on every request
- No caching for easier testing

### Production Mode:
- **Static Generation**: Pages built at deploy time
- **ISR (Incremental Static Regeneration)**: Pages revalidate every hour
- **Image Optimization**: Automatic from Strapi

### Revalidation Settings:
```typescript
// In app/packages/page.tsx
export const revalidate = 3600  // 1 hour

// In lib/strapi/api.ts
next: { revalidate: 3600 }
```

To change revalidation time:
- `60` = 1 minute
- `300` = 5 minutes
- `3600` = 1 hour (current)
- `86400` = 1 day

---

## 🐛 Troubleshooting

### Tour not showing on index page?
1. ✅ Check tour is **published** in Strapi
2. ✅ Verify `slug` field is filled
3. ✅ Check Strapi is running (`http://localhost:1337`)
4. ✅ Clear Next.js cache: `rm -rf .next`

### 404 on tour page?
1. ✅ Verify slug matches exactly (case-sensitive)
2. ✅ Check tour is published
3. ✅ Rebuild: `npm run build`

### Images not loading?
1. ✅ Check `next.config.mjs` has Strapi domain configured
2. ✅ Verify images uploaded to Strapi media library
3. ✅ Check browser console for CORS errors

### No data fetching?
1. ✅ Verify API URL in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:1337
   ```
2. ✅ Check Strapi API permissions (Public access for tour-pages)

---

## 🔐 API Permissions

In Strapi Admin:
1. Go to **Settings** → **Roles** → **Public**
2. Find `tour-pages`
3. Enable:
   - ✅ `find` (get all tours)
   - ✅ `findOne` (get single tour)
4. **Save**

---

## 📦 File Reference

### `lib/strapi/api.ts`
- `getAllTourPages()` - Fetch all tours
- `getTourPageBySlug(slug)` - Fetch single tour
- `getAllTourSlugs()` - Get slugs for SSG
- `getStrapiImageUrl(image)` - Get image URLs

### `app/packages/page.tsx`
- Server component
- Lists all tours
- Auto-updates when new tours added

### `app/packages/[slug]/page.tsx`
- Server component with SSG
- Individual tour pages
- Dynamic metadata

### `app/packages/[slug]/booking-modal.tsx`
- Client component
- WhatsApp booking integration
- Form validation

### `app/packages/[slug]/faq-section.tsx`
- Client component
- Collapsible FAQ accordion

---

## 🚀 Deployment

When deploying to Vercel/Netlify:

1. **Set Environment Variable**:
   ```
   NEXT_PUBLIC_API_URL=https://your-strapi-domain.com
   ```

2. **Build Command**: `npm run build`

3. **Deploy**: All tours will be statically generated

4. **Updates**: After adding/editing tours in Strapi:
   - Option A: Rebuild & redeploy
   - Option B: Wait for ISR (automatic after 1 hour)
   - Option C: Use On-Demand Revalidation (advanced)

---

## ✅ Checklist

Before going live:

- [ ] All tours published in Strapi
- [ ] Images uploaded and optimized
- [ ] WhatsApp number configured
- [ ] Test all tour pages load correctly
- [ ] Test booking modal works
- [ ] Verify FAQ sections expand/collapse
- [ ] Check mobile responsiveness
- [ ] Test on slow connection
- [ ] Verify SEO metadata
- [ ] Test 404 handling

---

## 💡 Next Steps (Optional Enhancements)

1. **Add Reviews/Testimonials** - Strapi relation
2. **Gallery Component** - Multiple images per tour
3. **Pricing Tiers** - Different package options
4. **Availability Calendar** - Date selection
5. **Search & Filters** - Filter by price, duration, etc.
6. **Related Tours** - Suggest similar packages
7. **Itinerary Component** - Day-by-day breakdown
8. **Weather Info** - Best time to visit
9. **Booking Confirmation** - Email integration
10. **Admin Dashboard** - Booking management

---

## 📞 Support

If you encounter issues:
1. Check this guide
2. Verify Strapi content structure
3. Check browser console for errors
4. Review Next.js build logs

---

**Congratulations! 🎉** Your tour packages are now fully dynamic and CMS-powered!
