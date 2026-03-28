# 🔍 SEO Guide

Panduan Search Engine Optimization untuk portfolio website.

---

## 📋 SEO yang Sudah Diimplementasi

### Meta Tags (layout.tsx)
```tsx
export const metadata: Metadata = {
  title: 'Rheyno Apria Pratama - Software Engineer',
  description: 'Portfolio website of Rheyno Apria Pratama...',
  keywords: ['Software Engineer', 'Backend Developer', 'Infrastructure', 'Portfolio'],
  authors: [{ name: 'Rheyno Apria Pratama' }],
  openGraph: {
    title: 'Rheyno Apria Pratama - Software Engineer',
    description: 'Portfolio website showcasing experience and projects',
    type: 'website',
  },
}
```

### Semantic HTML
- ✅ Penggunaan `<header>`, `<main>`, `<aside>`, `<nav>`, `<section>`
- ✅ Heading hierarchy (`<h1>` → `<h2>` → `<h3>`)
- ✅ Alt text pada gambar
- ✅ ARIA labels pada interactive elements

---

## 🚀 Optimasi SEO yang Disarankan

### 1. Dynamic Meta Tags per Section

```tsx
// Tambahkan meta yang berubah berdasarkan section aktif
const sectionMeta = {
  resume: {
    title: 'Resume - Rheyno Apria Pratama',
    description: 'Professional experience and skills of Rheyno Apria Pratama',
  },
  showcase: {
    title: 'Projects - Rheyno Apria Pratama',
    description: 'Portfolio of backend and infrastructure projects',
  },
  knowledge: {
    title: 'Knowledge Base - Rheyno Apria Pratama',
    description: 'Technical articles and tutorials on backend development',
  },
}
```

### 2. Structured Data (JSON-LD)

```tsx
// app/layout.tsx - tambahkan JSON-LD
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rheyno Apria Pratama",
  "jobTitle": "Software Engineer",
  "url": "https://yourdomain.com",
  "sameAs": [
    "https://github.com/rheynoapria",
    "https://linkedin.com/in/rheynoapria"
  ],
  "knowsAbout": ["Python", "Java", "Node.js", "Go", "AWS", "Docker", "Kubernetes"]
})}
</script>
```

### 3. Sitemap

Buat `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

### 4. Robots.txt

Buat `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

### 5. Open Graph Image

Buat `app/opengraph-image.tsx`:
```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div style={{
      display: 'flex',
      fontSize: 48,
      background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
      color: 'white',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
      <div style={{ fontSize: 64, fontWeight: 'bold' }}>Rheyno Apria Pratama</div>
      <div style={{ fontSize: 32, opacity: 0.8 }}>Software Engineer</div>
    </div>
  )
}
```

### 6. Canonical URL

```tsx
export const metadata: Metadata = {
  // ... existing metadata
  alternates: {
    canonical: 'https://yourdomain.com',
    languages: {
      'en': 'https://yourdomain.com?lang=en',
      'id': 'https://yourdomain.com?lang=id',
      'ar': 'https://yourdomain.com?lang=ar',
    },
  },
}
```

---

## 📊 SEO Checklist

### Technical SEO
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Hreflang tags untuk multi-language
- [ ] HTTPS enabled
- [ ] Mobile-friendly (responsive)
- [ ] Page speed optimized (Lighthouse > 90)

### On-Page SEO
- [ ] Unique title per section
- [ ] Meta descriptions yang compelling
- [ ] Heading hierarchy benar (h1 → h2 → h3)
- [ ] Alt text pada semua gambar
- [ ] Internal linking antar section
- [ ] Structured data (JSON-LD)

### Social SEO
- [ ] Open Graph tags (Facebook, LinkedIn)
- [ ] Twitter Card tags
- [ ] Open Graph image (1200x630)
- [ ] Social profile links

---

## 🔧 Testing SEO

### Tools
- **Google Search Console**: Monitor indexing
- **Google PageSpeed Insights**: Performance
- **Lighthouse**: Comprehensive audit
- **Rich Results Test**: Structured data validation
- **Facebook Sharing Debugger**: OG tags preview
- **Twitter Card Validator**: Twitter preview

### Command
```bash
# Lighthouse CLI
lighthouse https://yourdomain.com --output json --output-path ./seo-report.json
```
