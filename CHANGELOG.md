# 📝 Changelog

Semua perubahan penting pada project ini didokumentasikan di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
dan project ini menggunakan [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-03-29

### ✨ Added
- **Core Layout**: Sidebar navigation + Header + Content area
- **Resume Section**: Pengalaman kerja, skill bars, pendidikan
- **Showcase Section**: Portfolio project dengan filter kategori dan status (Production, Open Source, Prototype)
- **Knowledge Base Section**: Artikel teknis, search, tutorial, newsletter signup, popular tags
- **Multi-Theme System**: 4 tema (Classic, Ocean Breeze, Forest Green, Sunset Glow) + dark/light mode
- **Multi-Language**: Support 3 bahasa (English, Indonesia, Arabic) dengan RTL support
- **Authentication**: Login/signup system dengan role-based access (admin/user)
- **Admin Edit Mode**: Inline content editing untuk admin users
- **Prayer Time Countdown**: Widget countdown waktu sholat di sidebar
- **Animated Greeting**: Animasi sapaan
- **Responsive Design**: Mobile, tablet, desktop support
- **Docker Support**: Dockerfile + docker-compose.yml
- **Design System**: CSS custom properties, theme-aware classes
- **Accessibility**: WCAG AA compliant, keyboard navigation, screen reader support
- **SEO**: Meta tags, Open Graph, semantic HTML

### 🏗️ Technical
- Next.js 14 dengan App Router
- TypeScript untuk type safety
- Tailwind CSS untuk styling
- React Context untuk state management (Theme, Language, Auth)
- Custom `useTranslations` hook dengan fallback system
- Standalone output untuk Docker deployment

---

## Template untuk Release Selanjutnya

```markdown
## [X.X.X] - YYYY-MM-DD

### ✨ Added
- Fitur baru yang ditambahkan

### 🔄 Changed
- Perubahan pada fitur yang sudah ada

### 🐛 Fixed
- Bug yang diperbaiki

### 🗑️ Removed
- Fitur yang dihapus

### ⚠️ Deprecated
- Fitur yang akan dihapus di versi mendatang

### 🔒 Security
- Perbaikan keamanan
```
