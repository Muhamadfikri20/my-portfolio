# 📚 Documentation Index

Panduan lengkap semua dokumentasi yang tersedia di project **Rheyno Apria Pratama Portfolio Website**.

---

## 📖 Daftar Dokumentasi

| # | File | Isi | Prioritas |
|---|------|-----|-----------|
| 1 | [README.md](./README.md) | Overview project, setup, struktur folder | 🔴 Wajib Baca |
| 2 | [ROADMAP.md](./ROADMAP.md) | Rencana fitur & milestone ke depan | 🔴 Wajib Baca |
| 3 | [CHANGELOG.md](./CHANGELOG.md) | Log perubahan setiap versi | 🔴 Wajib Baca |
| 4 | [COMPONENTS.md](./COMPONENTS.md) | Dokumentasi semua komponen React & props | 🟡 Developer |
| 5 | [API.md](./API.md) | Dokumentasi API routes (auth, prayer times) | 🟡 Developer |
| 6 | [THEMES.md](./THEMES.md) | Sistem tema (4 tema + dark mode) | 🟡 Developer |
| 7 | [TRANSLATION.md](./TRANSLATION.md) | Sistem multi-bahasa (EN, ID, AR + RTL) | 🟡 Developer |
| 8 | [AUTHENTICATION.md](./AUTHENTICATION.md) | Sistem auth (login, signup, roles) | 🟡 Developer |
| 9 | [DEPLOYMENT.md](./DEPLOYMENT.md) | Panduan deploy (Docker, Vercel, VPS, AWS) | 🟡 DevOps |
| 10 | [CONTRIBUTING.md](./CONTRIBUTING.md) | Panduan kontribusi, code style, PR | 🟡 Contributor |
| 11 | [TESTING.md](./TESTING.md) | Strategi testing & setup | 🟢 QA |
| 12 | [PERFORMANCE.md](./PERFORMANCE.md) | Optimasi performa (image, bundle, runtime) | 🟢 Optimization |
| 13 | [SEO.md](./SEO.md) | Search Engine Optimization | 🟢 Marketing |
| 14 | [SECURITY.md](./SECURITY.md) | Keamanan (auth, headers, env vars) | 🟢 Security |
| 15 | [ACCESSIBILITY.md](./ACCESSIBILITY.md) | Aksesibilitas & kontras warna | 🟢 UX |

---

## 🗂️ Kategori Dokumentasi

### 📌 Essentials — Baca pertama kali
Dokumen yang **wajib dibaca** sebelum mulai mengembangkan.

| File | Deskripsi |
|------|-----------|
| [README.md](./README.md) | Overview lengkap project: tech stack, cara install, cara run, dan struktur folder |
| [ROADMAP.md](./ROADMAP.md) | Rencana pengembangan dari v1.0 sampai v2.0, milestone timeline, dan status setiap fitur |
| [CHANGELOG.md](./CHANGELOG.md) | Histori semua perubahan yang pernah dilakukan, dikelompokkan per versi |

---

### 🧩 Architecture — Memahami kode
Dokumen untuk **memahami bagaimana kode bekerja**.

| File | Deskripsi |
|------|-----------|
| [COMPONENTS.md](./COMPONENTS.md) | Daftar semua komponen React, props yang diterima, hooks dan contexts yang digunakan |
| [API.md](./API.md) | Dokumentasi semua API endpoint: request/response format, demo accounts, rencana API baru |
| [THEMES.md](./THEMES.md) | Cara kerja sistem tema: 4 template, CSS custom properties, cara menambah tema baru |
| [TRANSLATION.md](./TRANSLATION.md) | Cara kerja multi-bahasa: file JSON, custom hook `useTranslations`, RTL support |
| [AUTHENTICATION.md](./AUTHENTICATION.md) | Sistem autentikasi: login/signup flow, role-based access, admin edit mode |

---

### 🚀 Operations — Deploy & kontribusi
Dokumen untuk **deploy, testing, dan kontribusi**.

| File | Deskripsi |
|------|-----------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Panduan deploy ke Docker, Vercel, Netlify, AWS, VPS + troubleshooting |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Panduan kontribusi: branch naming, code style, commit convention, PR template |
| [TESTING.md](./TESTING.md) | Strategi testing: unit test, integration test, E2E test, setup Jest & Cypress |

---

### 🛡️ Quality — Optimasi & keamanan
Dokumen untuk **meningkatkan kualitas** project.

| File | Deskripsi |
|------|-----------|
| [PERFORMANCE.md](./PERFORMANCE.md) | Optimasi performa: image optimization, code splitting, caching, bundle analysis |
| [SEO.md](./SEO.md) | SEO: meta tags, structured data, sitemap, robots.txt, Open Graph |
| [SECURITY.md](./SECURITY.md) | Keamanan: password hashing, JWT, security headers, XSS prevention, env vars |
| [ACCESSIBILITY.md](./ACCESSIBILITY.md) | Aksesibilitas: kontras warna WCAG, keyboard navigation, screen reader |

---

## 🔄 Cara Update Dokumentasi

1. **Setiap menambah fitur baru** → Update `CHANGELOG.md` dan `README.md`
2. **Setiap menambah komponen** → Update `COMPONENTS.md`
3. **Setiap menambah API endpoint** → Update `API.md`
4. **Setiap menambah terjemahan** → Update `TRANSLATION.md`
5. **Setiap release** → Update `CHANGELOG.md` dan `ROADMAP.md`
6. **Setiap deploy** → Pastikan `DEPLOYMENT.md` masih akurat

---

## 📊 Overview Project

```
Tech: Next.js 14 + TypeScript + Tailwind CSS
Sections: Resume | Showcase | Knowledge Base
Themes: Classic | Ocean | Forest | Sunset (+ dark mode)
Languages: English | Indonesia | Arabic (RTL)
Auth: Login/Signup + Admin Edit Mode
Deploy: Docker | Vercel | VPS
```

---

> **💡 Tip**: Bookmark file `DOCS.md` ini sebagai entry point untuk semua dokumentasi.
