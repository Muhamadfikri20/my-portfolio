# 🔒 Security Guide

Panduan keamanan untuk portfolio website.

---

## ⚠️ Status Keamanan Saat Ini

> **Demo Mode**: Authentication saat ini masih menggunakan in-memory storage. Perlu di-upgrade sebelum production deployment.

---

## 🔐 Authentication Security

### Saat Ini (Demo)
- ❌ Password disimpan plain text (in-memory)
- ❌ Token statis (bukan JWT)
- ❌ Tidak ada rate limiting
- ❌ Tidak ada input validation

### Rekomendasi Production

#### 1. Password Hashing
```typescript
import bcrypt from 'bcrypt'

// Hash password saat signup
const saltRounds = 12
const hashedPassword = await bcrypt.hash(password, saltRounds)

// Verify password saat login
const isValid = await bcrypt.compare(password, hashedPassword)
```

#### 2. JWT Token
```typescript
import jwt from 'jsonwebtoken'

// Generate token
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET!,
  { expiresIn: '7d' }
)

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET!)
```

#### 3. Input Validation
```typescript
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password min 8 characters'),
})

// Validate
const result = loginSchema.safeParse(req.body)
if (!result.success) {
  return Response.json({ success: false, message: result.error.message })
}
```

#### 4. Rate Limiting
```typescript
// Implementasi simple rate limiter
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) return false
  entry.count++
  return true
}
```

---

## 🌐 HTTP Security Headers

Tambahkan di `next.config.js`:
```javascript
const nextConfig = {
  output: 'standalone',
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self';"
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains'
        },
      ],
    },
  ],
}
```

---

## 🔑 Environment Variables

### Setup `.env.local`
```bash
# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
BCRYPT_SALT_ROUNDS=12

# Database (future)
DATABASE_URL=postgresql://user:pass@host:5432/db

# API Keys (future)
PRAYER_API_KEY=your-prayer-api-key

# App Config
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Rules
- ❌ **JANGAN** commit `.env.local` ke Git
- ✅ Pastikan `.env.local` ada di `.gitignore`
- ✅ Gunakan `NEXT_PUBLIC_` prefix hanya untuk variabel yang aman di client
- ✅ Simpan secrets di environment server (Vercel, AWS, dll.)

---

## 🛡️ XSS Prevention

### Sanitize User Input
```typescript
// Sanitize HTML input (jika menerima rich text)
import DOMPurify from 'dompurify'

const sanitizedContent = DOMPurify.sanitize(userInput)
```

### React Auto-escaping
React otomatis escape content dalam JSX:
```tsx
// ✅ Aman — React auto-escape
<p>{userInput}</p>

// ❌ Berbahaya — bypass escaping
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

---

## 🗃️ Data Security

### localStorage
Data di `localStorage` bisa diakses oleh JavaScript apapun di domain yang sama.

**Saat ini disimpan di localStorage:**
- `auth_token` — Authentication token
- `user_data` — User data (JSON)
- `portfolio-theme` — Theme preference
- `portfolio-dark-mode` — Dark mode preference
- `portfolio-language` — Language preference

**Rekomendasi:**
- Gunakan **httpOnly cookies** untuk auth token (lebih aman)
- Jangan simpan data sensitif di localStorage
- Set token expiry yang reasonable

---

## 📋 Security Checklist

### Sebelum Production Deploy

**Authentication:**
- [ ] Password di-hash dengan bcrypt
- [ ] JWT token dengan expiry
- [ ] Refresh token mechanism
- [ ] Rate limiting pada login endpoint
- [ ] Account lockout setelah gagal login berulang

**Input:**
- [ ] Validasi semua input (email, password, dll.)
- [ ] Sanitize HTML input jika ada
- [ ] CSRF protection

**Headers:**
- [ ] Security headers terpasang
- [ ] HTTPS enforced
- [ ] CORS configured properly

**Data:**
- [ ] Sensitive data tidak di-log
- [ ] `.env.local` di `.gitignore`
- [ ] No secrets di client-side code
- [ ] Database queries parameterized (no SQL injection)

**Dependencies:**
- [ ] `npm audit` — cek vulnerabilities
- [ ] Update dependencies secara berkala
- [ ] Lockfile (`package-lock.json`) di-commit

---

## 🔧 Useful Commands

```bash
# Cek vulnerabilities di dependencies
npm audit

# Fix vulnerabilities otomatis
npm audit fix

# Cek apakah .env.local di .gitignore
cat .gitignore | grep env
```
