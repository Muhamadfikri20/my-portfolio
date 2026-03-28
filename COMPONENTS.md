# 🧩 Components Documentation

Dokumentasi lengkap semua komponen React yang ada di project ini.

---

## 📁 Struktur Komponen

```
components/
├── PortfolioLayout.tsx        # Layout utama
├── Sidebar.tsx                # Sidebar navigasi
├── Header.tsx                 # Header bar
├── sections/
│   ├── ResumeSection.tsx      # Section CV/resume
│   ├── ShowcaseSection.tsx    # Section portfolio
│   └── KnowledgeBaseSection.tsx # Section artikel
└── ui/
    ├── AnimatedGreeting.tsx    # Animasi sapaan
    ├── AuthModal.tsx           # Modal login/signup
    ├── EditableText.tsx        # Text editable (admin)
    ├── LanguageSwitcher.tsx    # Ganti bahasa
    ├── PrayerTimeCountdown.tsx # Countdown sholat
    ├── ThemeSwitcher.tsx       # Ganti tema
    └── ThemeToggle.tsx         # Toggle dark/light
```

---

## 🏗️ Layout Components

### `PortfolioLayout`
**File**: `components/PortfolioLayout.tsx`

Layout utama yang mengatur semua komponen.

| Prop | Type | Description |
|------|------|-------------|
| — | — | Tidak menerima props |

**State Internal:**
- `activeSection: SectionType` — Section yang aktif (`'resume'` | `'showcase'` | `'knowledge'`)
- `sidebarOpen: boolean` — Status sidebar di mobile

**Fungsi:**
- Mengatur navigasi antar section via state
- Handle responsive sidebar overlay
- Mendukung RTL layout (bahasa Arab)

---

### `Sidebar`
**File**: `components/Sidebar.tsx`

Sidebar navigasi di sisi kiri (atau kanan untuk RTL).

| Prop | Type | Description |
|------|------|-------------|
| `activeSection` | `SectionType` | Section yang sedang aktif |
| `onSectionChange` | `(section: SectionType) => void` | Callback ganti section |
| `isOpen` | `boolean` | Status terbuka di mobile |
| `onToggle` | `() => void` | Toggle sidebar |
| `onClose` | `() => void` | Tutup sidebar |

**Isi:**
- Profile section (foto, nama, title)
- Prayer time countdown widget
- Navigation items (Resume, Showcase, Knowledge)
- Footer (copyright)

---

### `Header`
**File**: `components/Header.tsx`

Header bar di bagian atas.

| Prop | Type | Description |
|------|------|-------------|
| `onMenuClick` | `() => void` | Callback buka menu mobile |
| `activeSection` | `'resume' \| 'showcase' \| 'knowledge'` | Section aktif |

**Fitur:**
- Judul section yang dinamis
- Language switcher
- Theme switcher
- Social links (Email, GitHub, LinkedIn)
- Authentication (Sign In / Sign Up / User menu)
- Download Resume button
- Admin edit mode toggle

---

## 📄 Section Components

### `ResumeSection`
**File**: `components/sections/ResumeSection.tsx`

Menampilkan CV/resume profesional.

**Konten:**
- Pengalaman kerja (timeline)
- Technical skills dengan visual skill bars
- Pendidikan
- Sertifikasi

---

### `ShowcaseSection`
**File**: `components/sections/ShowcaseSection.tsx`

Menampilkan portfolio project.

**Fitur:**
- Grid project cards
- Filter berdasarkan kategori
- Status indicator (Production, Open Source, Prototype)
- Teknologi tags
- Statistics dashboard

---

### `KnowledgeBaseSection`
**File**: `components/sections/KnowledgeBaseSection.tsx`

Menampilkan artikel dan tutorial.

**Fitur:**
- Artikel dengan search & filter
- Featured content
- Quick tutorials
- Newsletter signup
- Popular tags

---

## 🎨 UI Components

### `AnimatedGreeting`
**File**: `components/ui/AnimatedGreeting.tsx`

Animasi sapaan yang bergantian.

| Prop | Type | Description |
|------|------|-------------|
| — | — | Tidak menerima props |

---

### `AuthModal`
**File**: `components/ui/AuthModal.tsx`

Modal untuk login dan signup.

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Apakah modal terbuka |
| `onClose` | `() => void` | Callback tutup modal |
| `initialMode` | `'login' \| 'signup'` | Mode awal (login/signup) |

---

### `EditableText`
**File**: `components/ui/EditableText.tsx`

Komponen text yang bisa diedit oleh admin.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Nilai text saat ini |
| `onChange` | `(value: string) => void` | Callback saat text berubah |
| `className` | `string?` | CSS class tambahan |
| `as` | `string?` | HTML element tag |

> **💡 Hanya tampil edit button** saat user login sebagai admin dan edit mode aktif.

---

### `LanguageSwitcher`
**File**: `components/ui/LanguageSwitcher.tsx`

Dropdown untuk ganti bahasa.

| Prop | Type | Description |
|------|------|-------------|
| — | — | Menggunakan `useLanguage()` context |

**Bahasa Tersedia:** English 🇬🇧, Indonesia 🇮🇩, Arabic 🇸🇦

---

### `PrayerTimeCountdown`
**File**: `components/ui/PrayerTimeCountdown.tsx`

Widget countdown ke waktu sholat berikutnya.

| Prop | Type | Description |
|------|------|-------------|
| — | — | Menggunakan API `/api/prayer-times` |

---

### `ThemeSwitcher`
**File**: `components/ui/ThemeSwitcher.tsx`

Dropdown untuk ganti tema warna.

| Prop | Type | Description |
|------|------|-------------|
| — | — | Menggunakan `useTheme()` context |

**Tema Tersedia:** Classic, Ocean Breeze, Forest Green, Sunset Glow

---

### `ThemeToggle`
**File**: `components/ui/ThemeToggle.tsx`

Toggle button untuk dark/light mode.

| Prop | Type | Description |
|------|------|-------------|
| — | — | Menggunakan `useTheme()` context |

---

## 🪝 Hooks & Contexts

### `useTranslations()`
**File**: `hooks/useTranslations.ts`

```tsx
const { t, language } = useTranslations()
t('sidebar.profile.name')           // String
t('resume.skills', { returnObjects: true }) // Object/Array
```

### `useTheme()`
**File**: `contexts/ThemeContext.tsx`

```tsx
const { currentTheme, setTheme, themeConfig, isDark, toggleDarkMode } = useTheme()
```

### `useLanguage()`
**File**: `contexts/LanguageContext.tsx`

```tsx
const { language, setLanguage, direction } = useLanguage()
```

### `useAuth()`
**File**: `contexts/AuthContext.tsx`

```tsx
const { user, isAuthenticated, isLoading, login, signup, logout, isEditMode, toggleEditMode } = useAuth()
```
