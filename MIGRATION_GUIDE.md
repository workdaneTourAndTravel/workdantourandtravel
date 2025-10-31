# Dynamic Tour Packages Migration Guide

## 📁 New Folder Structure

```
app/
├── packages/
│   ├── [slug]/                    # 🆕 Dynamic route (NEW)
│   │   └── page.tsx              # Single dynamic page for all tours
│   ├── page.tsx                  # Tour packages listing page (keep this)
│   ├── dubai-tour/               # ⚠️ Can be deleted after migration
│   │   └── page.tsx
│   ├── china-tour/               # ⚠️ Can be deleted after migration
│   │   └── page.tsx
│   ├── thailand-tour/            # ⚠️ Can be deleted after migration
│   │   └── page.tsx
│   ├── turkey-tour/              # ⚠️ Can be deleted after migration
│   │   └── page.tsx
│   └── delhi-tour/               # ⚠️ Can be deleted after migration
│       └── page.tsx
```

### What Changed?

**BEFORE:** 5 separate static pages
**AFTER:** 1 dynamic page that renders based on the URL slug

---

## 🔧 How It Works

### 1. **Dynamic Routing**
The `[slug]` folder creates a dynamic route that catches any URL pattern like:
- `/packages/china-tour`
- `/packages/dubai-tour`
- `/packages/turkey-tour`
- `/packages/thailand-tour`
- `/packages/delhi-tour`

### 2. **Data Fetching**
The dynamic page fetches data from Strapi using the slug:
```typescript
const response = await fetch(
  `http://localhost:1337/api/tour-pages?filters[slug][$eq]=${slug}&populate=*`
)
```

### 3. **Automatic Matching**
- URL: `/packages/china-tour`
- Fetches: Tour page with `slug = "china-tour"`
- Renders: China tour content dynamically

---

## 🗄️ Strapi Content Structure

### Required Fields in Strapi `tour-pages` Collection

```typescript
{
  title: string               // "China Tour"
  slug: string                // "china-tour" (must match URL)
  subtitle: RichText          // Hero subtitle
  heroImage: Media            // Hero section background
  mainImage: Media            // Main package image
  description: RichText       // Main description
  price: string              // "115,000"
  currency: string           // "birr"
  duration: string           // "7-14 Days"
  groupSize: string          // "All Group Sizes"
  rating: string             // "4.9/5"

  // JSON Fields (store as JSON or Text)
  packageFeatures: JSON      // Array of features
  tourHighlights: JSON       // Array of highlights
  faqs: JSON                 // Array of FAQs

  // CTA Section
  ctaTitle: string           // "Ready to Explore China?"
  ctaDescription: RichText   // CTA description
  ctaButtonText: string      // "Book Your China Tour"

  // Styling & Settings
  primaryColor: string       // "red", "blue", "green", "purple"
  whatsappNumber: string     // "251906700007"
  bookingTitle: string       // "Book China Tour"
}
```

### JSON Field Structures

#### packageFeatures (JSON)
```json
[
  {
    "icon": "Building",
    "title": "Hotel Booking",
    "description": "Luxury accommodations from 5-star hotels"
  },
  {
    "icon": "Plane",
    "title": "Ticket & Visa Services",
    "description": "Complete flight booking and visa assistance"
  }
]
```

#### tourHighlights (JSON)
```json
[
  {
    "title": "Beijing - Imperial Capital",
    "description": "Great Wall, Forbidden City, Temple of Heaven"
  },
  {
    "title": "Shanghai - Modern Metropolis",
    "description": "The Bund, Yu Garden, modern skyline"
  }
]
```

#### faqs (JSON)
```json
[
  {
    "question": "Do I need a visa to visit China?",
    "answer": "Most visitors need a visa to enter China..."
  }
]
```

---

## 🎨 Supported Features

### ✅ What's Included

1. **Dynamic Content Loading**
   - Fetches tour data based on URL slug
   - Automatic 404 handling for non-existent tours

2. **Loading & Error States**
   - Beautiful loading spinner
   - User-friendly error messages
   - Retry functionality

3. **All Original Features Preserved**
   - Booking modal with WhatsApp integration
   - FAQ accordion with toggle functionality
   - Form validation
   - Responsive design

4. **Color Theming**
   - Set `primaryColor` in Strapi: `blue`, `red`, `green`, or `purple`
   - Automatically applies throughout the page

5. **Image Handling**
   - Supports Strapi media library
   - Automatic URL construction
   - Fallback to placeholder if missing

6. **Rich Text Support**
   - Automatically extracts text from Strapi rich text fields
   - Handles both string and structured formats

---

## 🚀 Migration Steps

### Step 1: Set Up Strapi Content
1. Create a `tour-pages` collection in Strapi
2. Add all required fields (see structure above)
3. Create entries for each tour with matching slugs:
   - `china-tour`
   - `dubai-tour`
   - `turkey-tour`
   - `thailand-tour`
   - `delhi-tour`

### Step 2: Test the Dynamic Route
1. Start your Next.js dev server: `npm run dev`
2. Visit: `http://localhost:3000/packages/china-tour`
3. Verify the page loads with Strapi data

### Step 3: Update Links
Update any internal links to use the new dynamic routes:
```typescript
// BEFORE
<Link href="/packages/china-tour">China Tour</Link>

// AFTER (same - no change needed!)
<Link href="/packages/china-tour">China Tour</Link>
```

### Step 4: Delete Old Static Pages (Optional)
Once you've verified everything works:
```bash
rm -rf app/packages/dubai-tour
rm -rf app/packages/china-tour
rm -rf app/packages/thailand-tour
rm -rf app/packages/turkey-tour
rm -rf app/packages/delhi-tour
```

---

## 🔍 Example: China Tour Strapi Entry

```json
{
  "title": "China Tour",
  "slug": "china-tour",
  "subtitle": "Discover ancient wonders and modern marvels",
  "description": "Embark on an extraordinary journey through China's rich history...",
  "price": "115,000",
  "currency": "birr",
  "duration": "7-14 Days",
  "groupSize": "All Group Sizes",
  "rating": "4.9/5",
  "primaryColor": "red",
  "whatsappNumber": "251906700007",
  "bookingTitle": "Book China Tour",
  "ctaTitle": "Ready to Explore China?",
  "ctaDescription": "Book your China adventure today...",
  "ctaButtonText": "Book Your China Tour",
  "packageFeatures": [
    {
      "icon": "Building",
      "title": "Hotel Booking",
      "description": "Luxury accommodations from 5-star hotels"
    },
    {
      "icon": "Plane",
      "title": "Ticket & Visa Services",
      "description": "Complete flight booking and visa assistance"
    },
    {
      "icon": "Car",
      "title": "Transportation",
      "description": "Shuttle services, car rentals, and private transfers"
    },
    {
      "icon": "ShoppingBag",
      "title": "Shopping & Business Tours",
      "description": "Guided shopping experiences and business delegation"
    }
  ],
  "tourHighlights": [
    {
      "title": "Beijing - Imperial Capital",
      "description": "Great Wall, Forbidden City, Temple of Heaven"
    },
    {
      "title": "Shanghai - Modern Metropolis",
      "description": "The Bund, Yu Garden, modern skyline"
    },
    {
      "title": "Xi'an - Ancient Wonders",
      "description": "Terracotta Warriors, ancient city walls"
    },
    {
      "title": "Guilin - Natural Beauty",
      "description": "Stunning karst landscapes, Li River cruise"
    }
  ],
  "faqs": [
    {
      "question": "Do I need a visa to visit China?",
      "answer": "Most visitors need a visa to enter China. We provide comprehensive visa assistance..."
    },
    {
      "question": "What's the best time to visit China?",
      "answer": "The best time depends on your destinations. Generally, spring (April-May)..."
    }
  ]
}
```

---

## 🎯 Benefits of Dynamic Routing

1. **Easier Content Management**
   - Add new tours without touching code
   - Update content directly in Strapi
   - No developer needed for content changes

2. **Consistent Design**
   - All tours use the same layout
   - Changes apply to all tours instantly

3. **Better Maintainability**
   - One file to maintain instead of 5+
   - Bug fixes apply to all tours

4. **Scalability**
   - Add 100 tours without creating 100 files
   - Each tour just needs a Strapi entry

---

## 🐛 Troubleshooting

### Page shows "Tour package not found"
- Check that the slug in the URL matches the slug in Strapi exactly
- Verify the Strapi API is running at `http://localhost:1337`
- Check the tour entry is published in Strapi

### Images not showing
- Ensure images are uploaded to Strapi media library
- Check that `populate=*` is in the API URL
- Verify the Strapi base URL is correct

### FAQs or features not displaying
- Ensure JSON fields are properly formatted
- Check for syntax errors in JSON
- Verify field names match exactly

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify Strapi API response: `http://localhost:1337/api/tour-pages?populate=*`
3. Ensure all required fields are filled in Strapi

---

**Migration completed! 🎉**
All your static tour pages are now powered by dynamic routing with Strapi CMS.
