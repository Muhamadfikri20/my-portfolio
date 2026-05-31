# PRD: Migration Portfolio ke Standard hgis-vue

**Version**: 1.0 (Draft — pending User approval)
**Date**: 2026-05-31
**Status**: 🟡 Draft — menunggu approval User
**Author**: Agent Manager
**Project**: `/Users/fikri/DevEnv/Projects/explore/development/my-portfolio`

---

## 1. Overview

Mengganti **seluruh** stack & arsitektur project portfolio Rheyno Apria Pratama dari **Next.js 14 + React 18 + TypeScript + Tailwind 3 + Supabase (legacy contexts + partial Layered Architecture)** menjadi **standard hgis-vue**: Vue 3 SPA + Bun + Vite 7 + Vue Router 5 + Pinia 3 (setup stores) + Tailwind 4 (CSS-first) + Radix Vue / Reka UI + shadcn-vue + lucide-vue-next + zod + **JavaScript murni (bukan TypeScript)** + oxlint+eslint dual + jsconfig.json.

Reference implementation: `/Users/fikri/DevEnv/Projects/hgis-vue/`.

---

## 2. Goals

1. Stack baru **100% align dengan hgis-vue convention** — agar developer yang sudah familiar hgis-vue bisa langsung kontribusi tanpa context-switch.
2. Hilangkan **DUALISM architecture** (legacy `contexts/` + new layered) yang ada sekarang — ganti dengan **single architecture** Pinia setup stores.
3. **Mempertahankan semua fitur user-facing** yang ada saat ini:
   - 3 section (Resume / Showcase / Knowledge Base)
   - Sidebar navigation + Header
   - Auth (login/signup/logout + admin edit mode in-memory)
   - 4 tema × dark/light = 8 varian
   - 3 bahasa (en/id/ar) + RTL otomatis
   - Prayer Times countdown widget
   - Animated greeting
   - Editable text (admin-only inline edit)
4. **URL-based routing** (sekaligus eksekusi target Phase 5 yang sebelumnya tertunda).
5. Build & deploy pipeline (Dockerfile + opsional Bun companion server) sesuai pattern hgis-vue.

---

## 3. Non-Goals (Out of Scope)

- ❌ Tambah fitur baru (kanban CRUD klinik, FullCalendar, data table server-side, dll yang ada di skill `vue-data-table-server-side` / `clinic-ui-patterns`). Itu hgis-vue clinic-specific, tidak relevan untuk portfolio.
- ❌ Migrasi backend dari Supabase ke Odoo. Pattern `odoo-api-vite-proxy` + `callKw` di hgis-vue **tidak akan dipakai** — Supabase tetap backend auth. Yang di-adopt cuma struktur `services/api.js` wrapper-nya.
- ❌ Pertahankan TypeScript. **hgis-vue pakai JavaScript murni** (`jsconfig.json`, bukan `tsconfig.json`). TS akan didrop sesuai standard. Type checking gone — di-replace runtime validation pakai zod di boundary (API response, form input).
- ❌ Pertahankan SSR / ISR / Next.js Image optimization. Vue 3 SPA = client-side only. Trade-off: SEO tergantung pre-render (kalau perlu, eksplor `vite-plugin-prerender` di phase lanjut, tapi out-of-scope untuk migration v1).
- ❌ Pertahankan `next-intl` (sudah tidak dipakai juga di project saat ini). Ganti ke pattern `useTranslations` composable + i18n store.

---

## 4. User Stories

- Sebagai **Rheyno (portfolio owner)**, saya ingin website portfolio saya jalan persis seperti sekarang (semua fitur, semua section, semua tema, semua bahasa), tapi diatas stack hgis-vue, sehingga konsisten dengan project Vue lain saya.
- Sebagai **visitor**, saya tidak boleh merasakan perbedaan UX — semua interaksi (theme switch, language switch, login, edit mode, prayer countdown) harus jalan sama.
- Sebagai **developer (saya/agent)**, saya ingin satu arsitektur saja (Pinia stores), bukan dualism legacy contexts + new layered yang ada sekarang.
- Sebagai **Manager/agent framework**, saya ingin skill `my-portfolio` ter-update reflect stack baru setelah migration selesai.

---

## 5. Scope

### In Scope (akan dieksekusi)
- Setup project structure baru sesuai `src/` hgis-vue pattern.
- Migrasi semua component React/TSX → Vue 3 SFC (`<script setup>`).
- Migrasi 3 Context (Auth/Theme/Language) → 3 Pinia setup stores.
- Migrasi state-based section nav → Vue Router 5 dengan URL-based routes.
- Migrasi custom i18n (`messageLoader.ts`) → composable `useTranslations` + i18n store dengan pattern serupa (dot-notation + fallback en).
- Migrasi 4 tema × dark/light system → theme store dengan CSS custom properties (mekanisme sama, syntax beda).
- Migrasi Supabase auth (`@/lib/supabase.ts`) → `services/supabase.js` + `stores/auth.js` setup store.
- Migrasi Next.js API route `/api/prayer-times` → **Bun companion server** ATAU **direct client-side fetch** (lihat Decision Point #3).
- Re-write Dockerfile sesuai Bun runtime + Vite build output.
- Linting: oxlint + eslint v9 flat config + plugin-vue.
- Replace `lucide-react` → `lucide-vue-next`.
- Replace `react-icons` → import langsung SVG atau pakai equivalent Vue icon lib.
- shadcn-vue scaffold untuk reusable UI: Button, Dialog (AuthModal), Dropdown (LanguageSwitcher/ThemeSwitcher), Input, dll.

### Out of Scope (TIDAK dieksekusi)
- Tambah fitur klinik-specific dari skill hgis-vue (FullCalendar, RBAC permission TTL cache, Odoo callKw, dll).
- Migrasi data layer ke Odoo.
- Test coverage end-to-end Playwright (kalau perlu, follow-up PRD).
- SSR/prerender untuk SEO.

---

## 6. Decision Points (BUTUH APPROVAL USER)

> Default jawaban saya ditandai **[default]**. Kalau setuju semua default, tinggal balas "approved" — saya lanjut. Kalau ada yang mau diubah, sebutkan nomornya.

### DP-1: TypeScript vs JavaScript
- **[default] JavaScript murni** sesuai hgis-vue standard (jsconfig.json, no .ts).
- Alternatif: pertahankan TypeScript (lebih aman, tapi melanggar "standard hgis-vue").

### DP-2: In-place rewrite vs sibling project
- **[default] In-place** di branch baru `feature/hgis-vue-migration`. Setelah Phase 8 final + smoke test, merge ke `main`. Old Next.js code dihapus di Phase 8 commit "feat: drop next.js artifacts post hgis-vue migration".
- Alternatif: bikin folder sibling `my-portfolio-vue/`, parallel sampai final cutover. Lebih aman tapi double maintenance.

### DP-3: Prayer Times API
- **[default A] Direct client-side fetch** ke RapidAPI dari Vue component (pakai `VITE_RAPIDAPI_KEY` env), bukan via server proxy. Tradeoff: API key terexpose di network tab, tapi RapidAPI key untuk public endpoint usually rate-limited per key, dan portfolio bukan production-critical app.
- [B] **Bun companion server** (pattern hgis-vue `bun-companion-server.md`) hosting endpoint `/api/prayer-times` yang proxy ke RapidAPI server-side. Lebih aman tapi nambah deploy artifact + supervisord+nginx kompleksitas.
- [C] Tetap pakai Next.js cuma untuk API route → BATAL, melanggar "refactor SEMUA ke hgis-vue".

### DP-4: Supabase backend
- **[default] Tetap Supabase**. Pattern yang di-adopt cuma struktur `services/` + setup store auth. Tidak migrate ke Odoo.
- Alternatif: drop Supabase, simpan auth state local-only (demo mode). Lebih simpel tapi kehilangan persistensi user.

### DP-5: shadcn-vue Component Library
- **[default] Adopt shadcn-vue** untuk AuthModal (Dialog), ThemeSwitcher (DropdownMenu), LanguageSwitcher (DropdownMenu), Input form login/signup. Install Radix Vue + Reka UI + class-variance-authority + clsx + tailwind-merge.
- Alternatif: bikin component custom from scratch (lebih ringan tapi reinvent the wheel).

### DP-6: Editable Text Persistence
- **[default] Tetap in-memory** (sesuai design saat ini di `AUTHENTICATION.md` Future Enhancements). Edit mode admin cuma React-state.
- Alternatif: bikin persistent via Supabase row. Tapi itu fitur baru → buat PRD terpisah.

### DP-7: Visual Pixel-Perfect Parity?
- **[default] Visual ~95% sama**, micro-styling differences acceptable (mis. ikon size 18px vs 20px, transition duration, border radius). Substansi UX, theme palette, layout, copy: 100% sama.
- Alternatif: pixel-perfect dengan screenshot diff. Effort >2x.

### DP-8: i18n Library
- **[default] Custom composable** persis seperti sekarang (dot-notation resolver + fallback en), cuma di-port ke Vue. Tidak pakai `vue-i18n` (sesuai prinsip hgis-vue: minimize deps).
- Alternatif: adopt `vue-i18n` (battle-tested, tapi nambah dep + API beda).

### DP-9: Tailwind Version
- **[default] Tailwind 4** sesuai hgis-vue (CSS-first via `@tailwindcss/vite`, custom properties di CSS). Theme variant didefinisikan di CSS layer, bukan tailwind.config.
- Alternatif: stay di Tailwind 3 (gampang tapi off-standard).

### DP-10: Backup Old Code
- **[default] Branch preservation**: branch `archive/nextjs-original` dibuat sebelum mulai migration, push ke remote untuk rollback safety. Branch `main` setelah merge migration = post-migration only.
- Alternatif: hapus old code total (rollback via git history saja). Lebih bersih tapi risiko regression hilang rollback shortcut.

---

## 7. Technical Design

### 7.1 Stack Comparison

| Aspek | Sekarang (Next.js) | Target (hgis-vue) |
|---|---|---|
| Framework | Next.js 14 App Router | Vue 3 SPA |
| Runtime | Node 18 | **Bun 1.x** |
| Bundler | Next.js (Webpack/Turbopack) | **Vite 7** |
| Language | TypeScript 5 | **JavaScript** (jsconfig) |
| Router | App Router (file-based) | **Vue Router 5** (config-based) |
| State | React Context (3 contexts) | **Pinia 3 setup stores** |
| Styling | Tailwind 3 + tailwind.config.js | **Tailwind 4** (CSS-first via `@tailwindcss/vite`) |
| UI Components | custom + lucide-react + react-icons | **shadcn-vue + Radix Vue + Reka UI + lucide-vue-next** |
| Forms validation | manual | **zod** |
| Linting | eslint-config-next | **oxlint + eslint 9 flat config + plugin-vue** |
| API | `/app/api/*` server routes | **`services/api.js` wrapper** + (opsional) Bun companion server |
| Auth | `@supabase/supabase-js` di context | **`@supabase/supabase-js` di `stores/auth.js`** |
| i18n | custom `messageLoader.ts` | **custom composable `useTranslations`** + i18n store |
| Build | `next build` (standalone) | **`vite build`** (`dist/`) |
| Deploy | Docker `node:18-alpine` standalone | **Docker `oven/bun` atau `node:20-alpine` serve `dist/` via nginx** |
| Port | 3000 | **5000** (default hgis-vue dev), production via nginx 80/443 |

### 7.2 New Folder Structure (Post-Migration)

```
my-portfolio/
├── index.html                       # Vite entry HTML
├── package.json                     # Bun deps (vue, vite, pinia, tailwindcss, etc.)
├── bun.lockb                        # Bun lockfile
├── vite.config.js                   # Plugins: vue, vueJsx, vueDevTools, tailwindcss
├── jsconfig.json                    # Path alias @/* → src/*
├── eslint.config.js                 # Flat config + plugin-vue + oxlint
├── .oxlintrc.json
├── tailwind.config.js               # OPSIONAL (Tailwind 4 mostly CSS-first)
├── Dockerfile                       # Multi-stage Bun build → static dist/ via nginx
├── docker-compose.yml
├── .env / .env.local                # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_RAPIDAPI_KEY, VITE_ADMIN_EMAIL
├── public/
│   ├── favicon.svg
│   └── assets/
│       └── icons/...
└── src/
    ├── main.js                      # createApp + pinia + router + main.css
    ├── App.vue                      # Root component (router-view)
    ├── assets/
    │   └── main.css                 # @import "tailwindcss" + theme tokens + 11 CSS custom props
    ├── components/
    │   ├── ui/                      # shadcn-vue: Button, Dialog, DropdownMenu, Input, Label, Card
    │   ├── layout/
    │   │   ├── Sidebar.vue
    │   │   └── Header.vue
    │   └── widgets/
    │       ├── PrayerTimeCountdown.vue
    │       ├── AnimatedGreeting.vue
    │       ├── EditableText.vue
    │       ├── ThemeSwitcher.vue
    │       ├── LanguageSwitcher.vue
    │       └── ThemeToggle.vue
    ├── composables/
    │   ├── useTranslations.js       # t('key.path') with dot-notation + fallback
    │   ├── useTheme.js              # applyTheme + CSS vars
    │   └── usePrayerTimes.js        # countdown logic
    ├── config/
    │   ├── api.endpoints.js         # Supabase endpoints, RapidAPI url
    │   └── constants.js             # ADMIN_EMAIL, LOCALSTORAGE_KEYS
    ├── layouts/
    │   └── DefaultLayout.vue        # Sidebar + Header + <router-view/>
    ├── lib/
    │   ├── utils.js                 # cn() helper (clsx + tailwind-merge)
    │   └── supabase.js              # createClient instance
    ├── router/
    │   └── index.js                 # routes: /resume, /showcase, /knowledge + auth guard
    ├── services/
    │   ├── authService.js           # signIn/signUp/signOut/getSession wrappers
    │   └── prayerService.js         # fetch RapidAPI + parse
    ├── stores/
    │   ├── auth.js                  # user, isLoggedIn, isEditMode, login/logout/signup
    │   ├── theme.js                 # currentTheme, isDark, setTheme, toggleDarkMode, applyToDOM
    │   └── language.js              # language, direction, setLanguage, messages cache
    ├── locales/                     # i18n JSON
    │   ├── en.json
    │   ├── id.json
    │   └── ar.json
    ├── views/
    │   ├── ResumeView.vue
    │   ├── ShowcaseView.vue
    │   └── KnowledgeView.vue
    └── data/                        # hardcoded portfolio content (currently di section TSX)
        ├── skills.js
        ├── experiences.js (atau pakai i18n returnObjects)
        ├── projects.js
        └── articles.js
```

### 7.3 Files yang Akan Dibuat / Dimodifikasi / Dihapus

| File | Action | Notes |
|------|--------|-------|
| `package.json` | REWRITE | Replace deps total: vue, vue-router, pinia, vite, @vitejs/plugin-vue, tailwindcss@4, @tailwindcss/vite, radix-vue, reka-ui, lucide-vue-next, zod, @vueuse/core, @supabase/supabase-js (keep), clsx (keep), class-variance-authority, tailwind-merge, vue-sonner, oxlint, eslint, eslint-plugin-vue, eslint-plugin-oxlint, npm-run-all2. Drop semua react/next/typescript deps. |
| `next.config.js` | DELETE | Tidak dipakai |
| `tsconfig.json` | DELETE | Replace `jsconfig.json` |
| `next-env.d.ts` | DELETE | |
| `app/` | DELETE | Replace `index.html` + `src/main.js` + `src/router/` |
| `contexts/` | DELETE | Logic pindah ke `src/stores/` |
| `components/` (lama) | DELETE | Re-implement di `src/components/` Vue SFC |
| `hooks/useTranslations.ts` | DELETE | Replace `src/composables/useTranslations.js` |
| `lib/supabase.ts` | DELETE | Replace `src/lib/supabase.js` |
| `presentation/` `application/` `domain/` `infrastructure/` | DELETE | DUALISM hilang, replace setup stores Pinia |
| `messages/*.json` | MOVE | → `src/locales/*.json` |
| `Design.json` | KEEP | Reference design tokens |
| `ARCHITECTURE.md`, `ARCHITECTURE_PLAN.md` | REWRITE | Update reflect hgis-vue stack |
| `README.md`, `DEPLOYMENT.md`, `AUTHENTICATION.md`, `THEMES.md`, `TRANSLATION.md`, `CHANGELOG.md` | UPDATE | Adjust commands, paths, conventions |
| `COMPONENTS.md`, `API.md` | REWRITE | Reflect new component & service layer |
| `Dockerfile`, `docker-compose.yml` | REWRITE | Bun build → static dist/ via nginx |
| `tailwind.config.js` | REWRITE | Tailwind 4 minimal config OR delete (CSS-first) |
| `postcss.config.js` | DELETE | Tailwind 4 pakai Vite plugin |
| `.env.local` | UPDATE | Rename `NEXT_PUBLIC_*` → `VITE_*` |
| `.gitignore` | UPDATE | Add `dist/`, remove `.next/` |

### 7.4 Component Migration Map

| React/TSX Component | Vue SFC Equivalent | Notes |
|---|---|---|
| `app/layout.tsx` (RootLayout) | `src/App.vue` + `src/main.js` providers | createApp + pinia + router |
| `app/page.tsx` | `src/router/index.js` redirect → `/resume` | |
| `components/PortfolioLayout.tsx` | `src/layouts/DefaultLayout.vue` | Strip useState section nav; use `<router-view/>` |
| `components/Header.tsx` | `src/components/layout/Header.vue` | |
| `components/Sidebar.tsx` | `src/components/layout/Sidebar.vue` | `<router-link>` nav, RTL via store.direction |
| `components/sections/ResumeSection.tsx` | `src/views/ResumeView.vue` | |
| `components/sections/ShowcaseSection.tsx` | `src/views/ShowcaseView.vue` | |
| `components/sections/KnowledgeBaseSection.tsx` | `src/views/KnowledgeView.vue` | |
| `components/ui/AuthModal.tsx` | `src/components/widgets/AuthModal.vue` (pakai shadcn-vue Dialog) | |
| `components/ui/AnimatedGreeting.tsx` | `src/components/widgets/AnimatedGreeting.vue` | |
| `components/ui/EditableText.tsx` | `src/components/widgets/EditableText.vue` | |
| `components/ui/LanguageSwitcher.tsx` | `src/components/widgets/LanguageSwitcher.vue` (DropdownMenu shadcn-vue) | |
| `components/ui/PrayerTimeCountdown.tsx` | `src/components/widgets/PrayerTimeCountdown.vue` | |
| `components/ui/ThemeSwitcher.tsx` | `src/components/widgets/ThemeSwitcher.vue` (DropdownMenu) | |
| `components/ui/ThemeToggle.tsx` | `src/components/widgets/ThemeToggle.vue` | |

### 7.5 Store Design

#### `stores/auth.js`
- State: `user`, `isLoggedIn`, `loading`, `error`, `isEditMode`
- Hydrate: cek `supabase.auth.getSession()` di `init()` + listen `onAuthStateChange`
- Actions: `login(email, pw)`, `signup(name, email, pw)`, `logout()`, `toggleEditMode()`
- Getters: `isAdmin` (computed dari email match `VITE_ADMIN_EMAIL`)
- localStorage: hanya `portfolio_remembered_email` (session di-handle Supabase)

#### `stores/theme.js`
- State: `currentTheme` (`'default' | 'ocean' | 'forest' | 'sunset'`), `isDark`
- Hydrate: `localStorage['portfolio-theme']` + `localStorage['portfolio-dark-mode']`
- Watch: keduanya watched → apply CSS custom props ke document root + persist localStorage
- Actions: `setTheme(theme)`, `toggleDarkMode()`
- Getters: `themeConfig` (computed lookup dari `THEME_CONFIGS` constant)

#### `stores/language.js`
- State: `language` (`'en' | 'id' | 'ar'`), `messages` (record)
- Hydrate: `localStorage['portfolio-language']` (default 'en')
- Watch: `language` → set `document.documentElement.lang` + `dir` + persist
- Actions: `setLanguage(lang)`
- Getters: `direction` (computed `lang === 'ar' ? 'rtl' : 'ltr'`)

#### `composables/useTranslations.js`
```js
import { useLanguageStore } from '@/stores/language'

export function useTranslations() {
  const lang = useLanguageStore()
  function t(key, opts = {}) {
    return opts.returnObjects
      ? resolveObject(lang.language, key, lang.messages)
      : resolveString(lang.language, key, lang.messages)
  }
  return { t, language: computed(() => lang.language) }
}
```

### 7.6 Route Design

```js
// src/router/index.js
const routes = [
  { path: '/', redirect: '/resume' },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      { path: 'resume', name: 'resume', component: () => import('@/views/ResumeView.vue') },
      { path: 'showcase', name: 'showcase', component: () => import('@/views/ShowcaseView.vue') },
      { path: 'knowledge', name: 'knowledge', component: () => import('@/views/KnowledgeView.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/resume' },
]
```
Tidak ada `requiresAuth` route — portfolio public. Auth opt-in untuk edit mode admin.

### 7.7 Environment Variables (Rename)

| Old (Next.js) | New (Vite) |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `VITE_SUPABASE_URL` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `VITE_SUPABASE_ANON_KEY` |
| `NEXT_PUBLIC_ADMIN_EMAIL` | `VITE_ADMIN_EMAIL` |
| `RAPIDAPI_KEY` (server-only) | `VITE_RAPIDAPI_KEY` (jika DP-3=A) atau tetap server-side jika DP-3=B |

### 7.8 Build & Deploy

#### Dockerfile Baru (DP-2 default: in-place rewrite)
```dockerfile
# Stage 1: build dengan Bun
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Stage 2: serve static via nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### `nginx.conf` (untuk SPA history fallback)
```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

#### Scripts `package.json`
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "run-s lint:*",
    "lint:oxlint": "oxlint . --fix",
    "lint:eslint": "eslint . --fix --cache"
  }
}
```

---

## 8. Phased Execution Plan (8 Phase)

### Phase 0: Approval + Branch Setup (5 menit)
- User approve PRD (atau redirect).
- Buat branch `archive/nextjs-original` dari `main` HEAD (DP-10).
- Buat branch `feature/hgis-vue-migration` dari `main`.
- Push kedua branch ke remote.

### Phase 1: Scaffold + Tooling (30–45 menit)
- `bun init` di branch baru, install semua dep hgis-vue (lihat 7.1).
- Create `vite.config.js`, `jsconfig.json`, `index.html`, `eslint.config.js`, `.oxlintrc.json`.
- Create skeleton folders sesuai 7.2.
- Verify: `bun run dev` listening di port 5000, dummy `<App>` render "Hello".
- Verify: `bun run lint` zero error.
- Verify: `bun run build` produce `dist/`.

### Phase 2: Tailwind 4 + Design Tokens + CSS Custom Properties (30 menit)
- `src/assets/main.css`: `@import "tailwindcss";` + define theme tokens layer + 11 CSS vars (`--color-primary` dst).
- Port 4 theme palette (default/ocean/forest/sunset × light/dark) ke CSS layer dengan data attribute selectors atau class-based: `.theme-ocean.dark { --color-primary: #0ea5e9; ... }`.
- Verify: theme switch via JS toggle class works.

### Phase 3: Pinia Stores + Composables (1–1.5 jam)
- `stores/auth.js`, `stores/theme.js`, `stores/language.js` per design 7.5.
- `composables/useTranslations.js`, `composables/useTheme.js`, `composables/usePrayerTimes.js`.
- `lib/supabase.js` (`createClient`), `lib/utils.js` (`cn()`).
- `services/authService.js`, `services/prayerService.js`.
- Init store di `main.js` (auth check session, theme apply).
- Smoke test: login → user appears in store, theme switch → DOM CSS vars change, lang switch → document.dir change.

### Phase 4: Router + Layout (45 menit)
- `src/router/index.js` per 7.6.
- `src/layouts/DefaultLayout.vue` (Sidebar + Header + `<router-view/>`).
- `src/components/layout/Sidebar.vue` (port content dari React Sidebar.tsx — `<router-link>` nav, profile section, prayer widget slot).
- `src/components/layout/Header.vue` (port).
- Verify: nav `/resume` ↔ `/showcase` ↔ `/knowledge` works, browser back/forward works.

### Phase 5: shadcn-vue UI Components + Widgets (1–1.5 jam)
- `src/components/ui/`: Button.vue, Dialog.vue, DropdownMenu.vue, Input.vue, Label.vue, Card.vue (pattern shadcn-vue).
- Port widgets one-by-one (in order: ThemeToggle → ThemeSwitcher → LanguageSwitcher → AnimatedGreeting → EditableText → AuthModal → PrayerTimeCountdown).
- Verify: setiap widget render + interactive.

### Phase 6: Views (Section Content) (1.5–2 jam)
- `src/data/skills.js`, `projects.js`, `articles.js` — extract dari TSX section data arrays.
- `src/locales/{en,id,ar}.json` — copy dari `messages/*.json` legacy + `infrastructure/i18n/messages/*.json` (yang sama atau take latest).
- `src/views/ResumeView.vue`, `ShowcaseView.vue`, `KnowledgeView.vue` — port markup.
- Verify: 3 view render dengan content lengkap (resume timeline, project cards, article list), translasi 3 bahasa works, RTL Arabic works.

### Phase 7: Prayer Times + Deploy Config (45 menit)
- DP-3 default A: client-side fetch di `prayerService.js` pakai `VITE_RAPIDAPI_KEY`.
- DP-3 alternative B: setup `bun-companion-server.md` pattern (kalau user pilih B).
- Rewrite `Dockerfile` per 7.8, create `nginx.conf`.
- Smoke test: `bun run build` → `docker build` → `docker run` → port 80 serves SPA dengan history fallback.

### Phase 8: Cleanup + Docs Update + Skill Refresh (30–45 menit)
- DELETE legacy files: `app/`, `contexts/`, `components/` (old), `hooks/`, `lib/` (old TS), `presentation/`, `application/`, `domain/`, `infrastructure/`, `messages/`, `next.config.js`, `tsconfig.json`, `next-env.d.ts`, `postcss.config.js`, `tailwind.config.js` (kalau Tailwind 4 CSS-first murni).
- UPDATE: `ARCHITECTURE.md` (rewrite total reflect hgis-vue), `ARCHITECTURE_PLAN.md` (mark all phases done atau archive), `README.md`, `DEPLOYMENT.md`, `AUTHENTICATION.md`, `THEMES.md`, `TRANSLATION.md`, `COMPONENTS.md`, `API.md`, `CHANGELOG.md` (add v2.0.0 entry).
- UPDATE skill source: `agents/workflows/data/skills/my_portfolio_project.md` — rewrite reflect hgis-vue stack, hapus dualism, update folder structure, update aturan edit.
- UPDATE registry: section entry skill di `skills_registry.md` (move dari "Frontend — Next.js Layered Architecture" ke "Frontend — Vue Stack Core" atau buat sub-section baru "Frontend — Vue Static SPA").
- UPDATE memory decisions log: entry 2026-XX-XX migration done.
- Final commit + merge ke `main`.

### Total Estimate
**~6–8 jam kerja aktif** (8 phase) — best case kalau tidak ada blocker. Realistis: 8–10 jam karena bound-to-have minor regressions (RTL edge case, theme CSS var miss-fire, Supabase auth state race condition saat init, prayer fetch timing).

---

## 9. Acceptance Criteria

### AC-1: Stack Migrated Sesuai Standard hgis-vue
- **Given** project di branch `feature/hgis-vue-migration` setelah Phase 8.
- **When** developer inspect `package.json` + folder structure.
- **Then** sesuai 7.1 dan 7.2 — zero `react`/`next`/`typescript` di deps, ada `vue`/`vite`/`pinia`, `src/` folder match hgis-vue pattern, `jsconfig.json` (not tsconfig).

### AC-2: Visual Parity 95%+
- **Given** dev server jalan di port 5000.
- **When** buka `/resume`, `/showcase`, `/knowledge`.
- **Then** layout sidebar+header sama dengan Next.js version, color palette sama per tema, typography sama, copy 3 bahasa sama, RTL Arabic flip layout works.

### AC-3: Auth Flow Functional
- **Given** user belum login.
- **When** klik Sign In → input `admin@example.com` / `admin123` → submit.
- **Then** Supabase auth success, store `auth.user` populated, `isAdmin === true`, Edit Mode button visible di Header.

### AC-4: Theme Switching
- **Given** theme `default` aktif.
- **When** user klik Theme Switcher → pilih `ocean`.
- **Then** 11 CSS custom props update di document root, color theme-aware berubah seketika, preference tersimpan di `localStorage['portfolio-theme']`, persist after refresh.

### AC-5: Dark Mode Toggle
- **Given** light mode aktif.
- **When** user klik ThemeToggle.
- **Then** class `.dark` ditambahkan ke `<html>`, palette dark dari themeConfig applied, persist di `localStorage['portfolio-dark-mode']`.

### AC-6: Language Switch + RTL
- **Given** lang `en`.
- **When** user pilih `ar` di LanguageSwitcher.
- **Then** semua copy berubah ke Arabic, `<html dir="rtl">`, sidebar mirror ke kanan, persist di `localStorage['portfolio-language']`.

### AC-7: Prayer Times Widget
- **Given** `VITE_RAPIDAPI_KEY` di-set di `.env.local`.
- **When** sidebar render.
- **Then** PrayerTimeCountdown fetch waktu sholat Jakarta, tampilkan countdown ke prayer berikutnya, update tiap detik.

### AC-8: URL-Based Routing
- **Given** app loaded.
- **When** user klik nav `/showcase` → klik `/knowledge` → klik browser back.
- **Then** URL berubah sesuai route, browser back kembali ke `/showcase`, no full page reload (SPA navigation).

### AC-9: Build & Deploy
- **Given** project at HEAD `feature/hgis-vue-migration`.
- **When** `bun run build` → `docker build -t my-portfolio .` → `docker run -p 80:80 my-portfolio`.
- **Then** build sukses tanpa error, container serve static via nginx port 80, SPA history fallback works (refresh di `/showcase` tidak 404).

### AC-10: Linting Clean
- **Given** semua source code di `src/`.
- **When** `bun run lint`.
- **Then** zero error dari oxlint + eslint.

### AC-11: Skill `my-portfolio` Up-to-Date
- **Given** Phase 8 done.
- **When** Manager future session invoke skill `my-portfolio`.
- **Then** content reflect hgis-vue stack (BUKAN Next.js + DUALISM warning lagi).

### AC-12: Dualism Eliminated
- **Given** post-migration.
- **When** `grep -r "contexts/" src/`.
- **Then** zero match. Tidak ada dualism legacy + new architecture coexist.

---

## 10. Edge Cases & Risks

| Edge Case | Mitigation |
|---|---|
| Supabase `onAuthStateChange` listener double-fire saat init | Pakai pattern hydrate-then-listen di store init, guard dengan flag |
| RTL Arabic — beberapa Tailwind utility (e.g., `ml-4`) tidak otomatis flip | Pakai logical properties (`ms-4`/`me-4`) atau conditional class via direction store |
| Theme CSS custom property tidak terhydrate sebelum first paint (FOUC) | Apply theme class + initial vars via inline script di `index.html` sebelum `main.js` |
| RapidAPI rate limit kena saat client-side fetch (DP-3=A) | Cache prayer response di localStorage 5–10 menit TTL |
| Image asset `/assets/icons/tech/postgrsql.webp` (typo) — pastikan path tetap kerja | Copy `public/assets/` apa adanya, jangan rename |
| Supabase anon key di `VITE_*` env — terexpose di bundle (sama kondisi `NEXT_PUBLIC_*`, anon key public-safe) | Keep |
| Editable text in-memory state — hilang saat user navigate | OK by design (DP-6=default), tidak diubah |
| Vite dev port 5000 vs Docker production port 80 — local dev jangan bentrok dengan service lain | Document port di README |
| Drop TypeScript = no compile-time error untuk shape mismatch | Add zod runtime validation di service boundary (response shape) |
| `next-intl` di `package.json` lama — pastikan deleted bareng | Phase 8 cleanup |
| `globals.css.backup` — keep atau delete? | DELETE bersama `app/` (legacy artifact) |

---

## 11. Rollback Plan

Kalau migration ternyata harus dibatalkan:
1. `git checkout main && git branch -D feature/hgis-vue-migration` (kalau belum merge).
2. Atau `git revert <merge-commit>` (kalau sudah merge).
3. Atau `git checkout archive/nextjs-original` untuk reference original Next.js code.

Tidak ada destructive operation pada `main` sebelum AC-1 s/d AC-12 sudah terverifikasi.

---

## 12. Post-Migration Follow-ups (Out of THIS PRD)

- Add Playwright E2E test (pakai skill `bun-test-patterns-vue.md`).
- Add prerender plugin untuk SEO (`vite-plugin-prerender` atau `vue-meta`).
- Add image optimization (`vite-plugin-imagemin`).
- Migrate editable text ke persistent backend (PRD baru).
- Setup CI/CD via GitHub Actions (build → deploy ke Vercel/Netlify/VPS).

---

## 13. Checklist Completion

- [ ] DP-1 s/d DP-10 approved User
- [ ] Phase 0 — branch archive + feature created
- [ ] Phase 1 — scaffold + tooling done, `bun run dev/build/lint` works
- [ ] Phase 2 — Tailwind 4 + 4 tema CSS vars
- [ ] Phase 3 — 3 Pinia stores + composables
- [ ] Phase 4 — router + layout + sidebar+header
- [ ] Phase 5 — shadcn-vue UI + 7 widget ported
- [ ] Phase 6 — 3 view + i18n 3 bahasa + RTL Arabic
- [ ] Phase 7 — prayer widget + Dockerfile + nginx
- [ ] Phase 8 — cleanup + docs + skill + memory + merge
- [ ] AC-1 Stack Migrated
- [ ] AC-2 Visual Parity 95%+
- [ ] AC-3 Auth Flow
- [ ] AC-4 Theme Switch
- [ ] AC-5 Dark Mode
- [ ] AC-6 Language + RTL
- [ ] AC-7 Prayer Times
- [ ] AC-8 URL Routing
- [ ] AC-9 Build & Deploy
- [ ] AC-10 Linting Clean
- [ ] AC-11 Skill Up-to-Date
- [ ] AC-12 Dualism Eliminated

---

**PRD ini perlu approval User sebelum eksekusi.**
Balas "approved" (assume semua default DP-1..DP-10) untuk lanjut ke Phase 0, atau sebutkan DP yang mau diubah + jawaban-nya.
