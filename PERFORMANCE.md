# ⚡ Performance Optimization Guide

Panduan untuk mengoptimalkan performa portfolio website.

---

## 📊 Metrik Performa Target

| Metrik | Target | Tool |
|--------|--------|------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse |
| FID (First Input Delay) | < 100ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| TTI (Time to Interactive) | < 3.0s | Lighthouse |
| Bundle Size | < 200KB (gzip) | next build |
| Lighthouse Score | > 90 | Lighthouse |

---

## 🖼️ Image Optimization

### Gunakan next/image
```tsx
import Image from 'next/image'

// ✅ Optimal
<Image
  src="/assets/icons/general/profile.png"
  alt="Profile"
  width={64}
  height={64}
  priority  // Untuk above-the-fold images
/>

// ❌ Hindari
<img src="/assets/icons/general/profile.png" alt="Profile" />
```

### Format Gambar
- Gunakan **WebP** atau **AVIF** untuk ukuran lebih kecil
- Sediakan **srcset** untuk berbagai ukuran layar
- Compress semua gambar sebelum commit

### Lazy Loading
```tsx
// Gambar di bawah fold otomatis lazy loaded oleh next/image
<Image src="/image.png" alt="..." width={800} height={600} loading="lazy" />
```

---

## 📦 Bundle Optimization

### Analisis Bundle Size
```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Tambahkan di next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

# Jalankan analisis
ANALYZE=true npm run build
```

### Dynamic Import (Code Splitting)
```tsx
import dynamic from 'next/dynamic'

// Lazy load section components
const ShowcaseSection = dynamic(() => import('./sections/ShowcaseSection'), {
  loading: () => <SectionSkeleton />,
})

const KnowledgeBaseSection = dynamic(() => import('./sections/KnowledgeBaseSection'), {
  loading: () => <SectionSkeleton />,
})
```

### Tree Shaking Icons
```tsx
// ✅ Import spesifik (tree-shakeable)
import { User, Mail, Github } from 'lucide-react'

// ❌ Jangan import semua
import * as Icons from 'lucide-react'
```

---

## 🎨 CSS Optimization

### Tailwind Purging
`tailwind.config.js` sudah dikonfigurasi untuk purge unused CSS:
```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // CSS yang tidak digunakan otomatis dihapus saat build
}
```

### Reduce CSS-in-JS
- Gunakan Tailwind classes daripada inline styles
- CSS custom properties diset sekali di root, bukan per-component

### Critical CSS
Next.js otomatis inline critical CSS di production build.

---

## ⚡ Runtime Performance

### Memoization
```tsx
import { useMemo, useCallback } from 'react'

// Memo untuk computed values
const filteredProjects = useMemo(() =>
  projects.filter(p => p.category === activeFilter),
  [projects, activeFilter]
)

// Callback untuk event handlers yang di-pass ke children
const handleSectionChange = useCallback((section: SectionType) => {
  setActiveSection(section)
}, [])
```

### Avoid Unnecessary Re-renders
```tsx
import { memo } from 'react'

// Wrap komponen yang jarang berubah
const Sidebar = memo(function Sidebar({ activeSection, ...props }: SidebarProps) {
  // ...
})
```

### Debounce Search Input
```tsx
import { useState, useEffect } from 'react'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

---

## 🌐 Network Optimization

### Caching Strategy
```javascript
// next.config.js
const nextConfig = {
  output: 'standalone',
  headers: async () => [
    {
      source: '/assets/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
}
```

### Prefetching
Next.js otomatis prefetch links yang visible di viewport. Untuk API data:
```tsx
// Prefetch data saat hover
const prefetchData = () => {
  fetch('/api/prayer-times').then(r => r.json())
}
```

---

## 🔍 Monitoring

### Lighthouse CLI
```bash
# Install
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --output html --output-path ./report.html
```

### Web Vitals
```tsx
// app/layout.tsx - tambahkan web vitals reporting
export function reportWebVitals(metric: any) {
  console.log(metric)
  // Kirim ke analytics service
}
```

---

## ✅ Performance Checklist

- [ ] Semua gambar menggunakan `next/image`
- [ ] Gambar di-compress dan format optimal (WebP/AVIF)
- [ ] Section components di-lazy load dengan `dynamic()`
- [ ] Icon imports spesifik (bukan wildcard)
- [ ] Tailwind purge aktif
- [ ] `useMemo` / `useCallback` di tempat yang tepat
- [ ] Search/filter menggunakan debounce
- [ ] Static assets di-cache (Cache-Control headers)
- [ ] Lighthouse score > 90
- [ ] Bundle size < 200KB gzip
