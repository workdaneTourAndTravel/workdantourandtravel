# Dynamic Navigation Guide

## 🎯 Overview

Your Navbar and Footer now automatically display tour packages from Strapi! When you publish a new tour in Strapi, it will automatically appear in both your navigation menu and footer links.

---

## ✨ What Changed

### **Before:**
- Hardcoded list of tours in Navbar and Footer
- Had to manually update code to add/remove tours
- Required deployment to see changes

### **After:**
- Tours fetched dynamically from Strapi
- Automatically updates when you publish new tours
- No code changes needed!

---

## 📁 New File Structure

```
components/
├── Navbar.tsx              # ✅ NEW: Server component wrapper
├── navbar-client.tsx       # ✅ NEW: Client component with UI
├── Navbar_old.tsx          # 📦 Backup of old component
├── Footer.tsx              # ✅ NEW: Server component wrapper
├── footer-client.tsx       # ✅ NEW: Client component with UI
└── Footer_old.tsx          # 📦 Backup of old component

lib/strapi/
└── api.ts                  # ✅ Contains getTourLinks() function
```

---

## 🔧 How It Works

### 1. **Server Components (Wrappers)**
- `Navbar.tsx` and `Footer.tsx` are server components
- They fetch tour links from Strapi using `getTourLinks()`
- Pass the data as props to client components
- Handle errors gracefully with fallbacks

### 2. **Client Components (UI)**
- `navbar-client.tsx` - Interactive navbar with mobile menu
- `footer-client.tsx` - Footer with animations and newsletter

### 3. **Data Flow**
```
Strapi CMS → getTourLinks() → Server Component → Props → Client Component → Rendered UI
```

---

## 📊 What Data Is Fetched

The `getTourLinks()` function fetches:
```typescript
{
  title: string  // Tour title (e.g., "Dubai Tour")
  slug: string   // URL slug (e.g., "dubai-tour")
}
```

These are transformed into navigation links:
- **Navbar**: `/packages/dubai-tour` with description
- **Footer**: `/packages/dubai-tour` in the packages section

---

## 🚀 How to Add a New Tour

### Step 1: Create Tour in Strapi
1. Go to Strapi Admin: `http://localhost:1337/admin`
2. Navigate to **Content Manager** → **Tour Pages**
3. Click **Create new entry**
4. Fill in required fields:
   - **Title**: "Bali Tour"
   - **Slug**: "bali-tour"
   - (Fill other fields as needed)
5. Click **Save** and **Publish**

### Step 2: See It Appear Automatically!
- Open your website: `http://localhost:3000`
- Check the **Navbar** → **Packages** dropdown
- Check the **Footer** → **Packages** section
- Your new tour appears in both places! ✨

### Step 3: That's It!
No code changes, no deployment needed (in dev mode)

---

## 📍 Where Tours Appear

### **Navbar (Desktop)**
- Hover over "Packages"
- See dropdown with all tours
- Each tour shows:
  - Icon (MapPin)
  - Tour title
  - Description
  - Link to `/packages/[slug]`
- "View All Packages →" link at the bottom

### **Navbar (Mobile)**
- Tap menu icon
- Expand "Packages" section
- All tours listed
- "View All Packages" at bottom

### **Footer**
- "Packages" section (left column)
- All tour links listed
- "View All Packages →" at bottom
- Animated hover effects

---

## ⚡ Features

### ✅ **Automatic Updates**
- Add tour in Strapi → Appears in navigation
- Unpublish tour → Disappears from navigation
- Edit tour title → Updates automatically

### ✅ **Error Handling**
- If Strapi is offline: Shows empty state
- If no tours: Shows "No packages available"
- Graceful fallbacks

### ✅ **Performance**
- Server-side data fetching
- Cached with ISR (revalidates hourly)
- Fast page loads

### ✅ **SEO Friendly**
- Server-rendered navigation
- Proper semantic HTML
- Search engine crawlable

---

## 🎨 Customization

### Change Icon in Navbar
Edit `components/navbar-client.tsx`:
```typescript
const packagesItems = tourLinks.map(tour => ({
  title: tour.title,
  href: `/packages/${tour.slug}`,
  description: `Explore ${tour.title} with our premium tour package`,
  icon: MapPin,  // ← Change this to any Lucide icon
}))
```

### Change Link Text/Description
The description is auto-generated as:
```
"Explore {tour.title} with our premium tour package"
```

To customize, edit line 59 in `navbar-client.tsx`

### Change Footer Section Title
Edit `footer-client.tsx` line 229:
```tsx
<h4 className="text-lg font-semibold mb-6 text-white">Packages</h4>
```

---

## 🔍 API Details

### `getTourLinks()` Function
Located in: `lib/strapi/api.ts`

```typescript
export async function getTourLinks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tour-pages?fields[0]=title&fields[1]=slug`,
    {
      next: { revalidate: 3600 }, // revalidate every hour
    }
  );
  const { data } = await res.json();
  return data.map((item: any) => ({
    title: item.attributes.title,
    slug: item.attributes.slug,
  }));
}
```

**Features:**
- Fetches only `title` and `slug` (efficient)
- Revalidates every 3600 seconds (1 hour)
- Returns clean array of objects

---

## 🐛 Troubleshooting

### Tours not showing in navigation?

**Check 1:** Is Strapi running?
```bash
# Verify Strapi is accessible
curl http://localhost:1337/api/tour-pages?fields[0]=title&fields[1]=slug
```

**Check 2:** Are tours published?
- Go to Strapi Admin
- Check tour status is "Published" (green)

**Check 3:** Is the API accessible?
- Check `.env.local` has:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:1337
  ```

**Check 4:** Check browser console for errors
- Open DevTools → Console
- Look for fetch errors

### "No packages available" showing?

This means the API returned empty data. Possible causes:
1. No tours published in Strapi
2. Strapi is offline
3. API URL is incorrect

### Tours show old data?

Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

---

## 🔄 Caching & Revalidation

### Development Mode:
- No caching (fresh data every time)
- Changes visible immediately

### Production Mode:
- Data cached for 1 hour
- Automatic revalidation (ISR)
- To change revalidation time, edit `lib/strapi/api.ts`:

```typescript
next: { revalidate: 1800 } // 30 minutes
// OR
next: { revalidate: 7200 } // 2 hours
```

---

## 📦 Migration from Old to New

### What Was Backed Up:
- `Navbar_old.tsx` - Your original Navbar
- `Footer_old.tsx` - Your original Footer

### Reverting to Old Components:
If you need to revert:
```bash
mv components/Navbar.tsx components/Navbar_dynamic.tsx
mv components/Navbar_old.tsx components/Navbar.tsx

mv components/Footer.tsx components/Footer_dynamic.tsx
mv components/Footer_old.tsx components/Footer.tsx
```

---

## 🎯 Best Practices

### 1. **Keep Slug URL-Friendly**
Good slugs:
- `dubai-tour`
- `thailand-adventure`
- `china-cultural-experience`

Bad slugs:
- `Dubai Tour!`
- `thailand adventure`
- `China/Cultural/Experience`

### 2. **Use Clear Titles**
The title appears directly in navigation:
- ✅ "Dubai Luxury Tour"
- ✅ "Thailand Beach Adventure"
- ❌ "Tour Package 1"
- ❌ "PKG-001"

### 3. **Limit Number of Tours**
For best UX, keep under 10 tours in navigation.
If you have more:
- Use categories in Strapi
- Filter by featured/popular
- Show top 5-7 in nav, rest on /packages page

---

## 🚀 Production Deployment

When deploying to production:

### 1. Set Environment Variables
```bash
NEXT_PUBLIC_API_URL=https://your-strapi-domain.com
```

### 2. Build & Deploy
```bash
npm run build
npm start
```

### 3. Updates After Deployment
When you add/edit tours in Strapi:
- Changes appear after 1 hour (automatic)
- OR rebuild & redeploy for immediate update
- OR use On-Demand Revalidation (advanced)

---

## 💡 Advanced: On-Demand Revalidation

To update navigation immediately after Strapi changes:

### 1. Create API Route
`app/api/revalidate/route.ts`:
```typescript
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/', 'layout') // Revalidate all pages

  return NextResponse.json({ revalidated: true })
}
```

### 2. Call from Strapi Webhook
In Strapi, create a webhook:
- URL: `https://your-site.com/api/revalidate?secret=YOUR_SECRET`
- Trigger: `entry.publish`, `entry.unpublish`, `entry.update`
- Model: `tour-page`

Now navigation updates instantly when you publish/edit tours!

---

## ✅ Testing Checklist

Before going live, test:

- [ ] Tours appear in desktop navbar dropdown
- [ ] Tours appear in mobile navbar menu
- [ ] Tours appear in footer packages section
- [ ] "View All Packages" links work
- [ ] New tour appears after publishing in Strapi
- [ ] Unpublished tour disappears from navigation
- [ ] Error handling works (stop Strapi, check graceful fallback)
- [ ] Links point to correct `/packages/[slug]` URLs
- [ ] Mobile menu opens/closes correctly
- [ ] Footer animations work smoothly

---

## 📞 Support

If you encounter issues:
1. Check this guide
2. Verify Strapi is running and tours are published
3. Check browser console for errors
4. Review Next.js dev server logs

---

## 🎉 Summary

**You now have:**
✅ Fully dynamic navigation
✅ Automatic updates from Strapi
✅ No manual code changes needed
✅ Error handling & fallbacks
✅ Performance optimized
✅ SEO friendly

**To add a new tour:**
1. Create in Strapi
2. Publish
3. Done! It appears everywhere automatically 🚀

---

**Congratulations!** Your website now features dynamic, CMS-powered navigation that updates automatically!
