# 🤝 Contributing Guide

Terima kasih telah tertarik untuk berkontribusi! Berikut panduan untuk berkontribusi di project ini.

---

## 📋 Daftar Isi

- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Code Style](#-code-style)
- [Commit Convention](#-commit-convention)
- [Pull Request](#-pull-request)
- [Project Structure](#-project-structure)

---

## 🚀 Getting Started

### 1. Fork & Clone
```bash
# Fork repository di GitHub, lalu clone
git clone https://github.com/YOUR-USERNAME/my-portfolio.git
cd my-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```

### 4. Buka Browser
```
http://localhost:3000
```

---

## 🔄 Development Workflow

### Branch Naming Convention

```
feature/nama-fitur      # Fitur baru
fix/nama-bug            # Bug fix
docs/nama-dokumentasi   # Update dokumentasi
style/nama-styling      # Perubahan UI/styling
refactor/nama-refactor  # Refactoring kode
```

### Langkah Kontribusi

```bash
# 1. Buat branch baru dari main
git checkout -b feature/fitur-baru

# 2. Kerjakan perubahan
# ... edit files ...

# 3. Test perubahan
npm run build

# 4. Commit
git add .
git commit -m "feat: tambah fitur baru"

# 5. Push
git push origin feature/fitur-baru

# 6. Buat Pull Request di GitHub
```

---

## 🎨 Code Style

### TypeScript
- Gunakan **TypeScript** untuk semua file baru (`.tsx` / `.ts`)
- Definisikan **interface/type** untuk semua props
- Hindari penggunaan `any` — gunakan type yang spesifik
- Gunakan **optional chaining** (`?.`) dan **nullish coalescing** (`??`)

### React
- Gunakan **functional components** dengan hooks
- Tandai client components dengan `'use client'`
- Pisahkan logika di **custom hooks** jika kompleks
- Gunakan **React Context** untuk state global

### Styling
- Gunakan **Tailwind CSS** classes
- Gunakan **CSS custom properties** (`var(--color-primary)`) untuk theme-aware styling
- Gunakan **theme-aware classes** (`theme-text`, `theme-primary`, dll.)
- Support **dark mode** dengan `dark:` prefix

### File Naming
```
PascalCase.tsx     # React components
camelCase.ts       # Hooks, utilities
kebab-case/        # Directories (kecuali components)
UPPER_CASE.md      # Documentation files
```

### Import Order
```tsx
// 1. React & Next.js
import { useState } from 'react'
import type { Metadata } from 'next'

// 2. External libraries
import { User, Mail } from 'lucide-react'
import clsx from 'clsx'

// 3. Internal contexts & hooks
import { useTheme } from '@/contexts/ThemeContext'
import { useTranslations } from '@/hooks/useTranslations'

// 4. Internal components
import Sidebar from './Sidebar'

// 5. Types
import type { SectionType } from './PortfolioLayout'
```

---

## 📝 Commit Convention

Mengikuti [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

### Types

| Type | Keterangan |
|------|------------|
| `feat` | Fitur baru |
| `fix` | Bug fix |
| `docs` | Perubahan dokumentasi |
| `style` | Perubahan styling (CSS, format) |
| `refactor` | Refactoring kode |
| `test` | Menambah/update test |
| `chore` | Maintenance (deps, config) |
| `perf` | Performance improvement |

### Contoh
```
feat(auth): tambah OAuth login dengan Google
fix(sidebar): perbaiki sidebar tidak tertutup di mobile
docs(readme): update installation steps
style(header): perbaiki spacing di mobile view
refactor(theme): simplify theme switching logic
```

---

## 🔀 Pull Request

### Sebelum Submit PR
- [ ] Code sudah di-test secara lokal
- [ ] `npm run build` berhasil tanpa error
- [ ] Responsive design dicek (mobile, tablet, desktop)
- [ ] Dark mode dicek
- [ ] Semua bahasa dicek (EN, ID, AR)
- [ ] Tidak ada console errors

### PR Template
```markdown
## Deskripsi
Jelaskan perubahan yang dilakukan.

## Jenis Perubahan
- [ ] Bug fix
- [ ] Fitur baru
- [ ] Breaking change
- [ ] Dokumentasi

## Screenshots (jika ada UI changes)

## Checklist
- [ ] Code sudah di-review sendiri
- [ ] Build berhasil
- [ ] Responsive design dicek
```

---

## 📁 Project Structure

Lihat [COMPONENTS.md](./COMPONENTS.md) untuk detail setiap komponen.

```
my-portfolio/
├── app/              # Next.js App Router (pages, layouts, API)
├── components/       # React components
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── messages/         # Translation JSON files
├── public/           # Static assets
└── *.md              # Documentation files
```

---

## ❓ Pertanyaan?

Jika ada pertanyaan, buat **Issue** di GitHub repository atau hubungi maintainer langsung.
