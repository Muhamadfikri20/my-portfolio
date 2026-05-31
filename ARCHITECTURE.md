# Architecture — Vue 3 SPA (hgis-vue standard)

> v2 of this project. Previous Next.js 14 + Layered Architecture documented at branch `archive/nextjs-original`, plus historical PRD at `docs/prd/PRD-hgis-vue-migration.md`.

---

## Stack Summary

| Layer | Tech |
|-------|------|
| Framework | Vue 3.5 SPA (Composition API + `<script setup>`) |
| Runtime | Bun 1.3+ |
| Bundler | Vite 7 |
| Router | Vue Router 5 |
| State | Pinia 3 (setup stores) |
| Styling | Tailwind 4 (CSS-first, `@tailwindcss/vite` plugin) + custom CSS properties for 8 theme variants |
| UI Primitives | Radix Vue + Reka UI + class-variance-authority + clsx + tailwind-merge |
| Icons | lucide-vue-next |
| Auth | Supabase JS |
| Validation | zod |
| Lint | oxlint + ESLint 9 flat + plugin-vue |
| Deploy | Multi-stage Docker — `oven/bun` build → `nginx:alpine` serve `dist/` |

---

## Single Architecture (No Dualism)

```
┌──────────────────────────────────────────────────────┐
│  Views (src/views/*.vue)                             │
│  Widgets (src/components/widgets/*.vue)              │
│  Layouts (src/layouts/*.vue)                         │
│  UI primitives (src/components/ui/*.vue)             │
└──────────────────────────────────────────────────────┘
                       ↓ consume
┌──────────────────────────────────────────────────────┐
│  Composables (src/composables/*.js)                  │
│  Stores (src/stores/*.js) — Pinia setup              │
└──────────────────────────────────────────────────────┘
                       ↓ delegate to
┌──────────────────────────────────────────────────────┐
│  Services (src/services/*.js)                        │
└──────────────────────────────────────────────────────┘
                       ↓ use
┌──────────────────────────────────────────────────────┐
│  Lib (src/lib/*.js) — supabase client, utils         │
│  Config (src/config/*.js) — constants, endpoints     │
│  Locales (src/locales/*.json)                        │
│  Data (src/data/*.js) — hardcoded portfolio content  │
└──────────────────────────────────────────────────────┘
```

Equivalent to "Layered Architecture" target from v1, but expressed in hgis-vue idiom:
- Views/Widgets ≈ presentation
- Composables + Stores ≈ application
- Services ≈ orchestration over infrastructure
- Lib + Config + Locales + Data ≈ infrastructure

No legacy contexts, no React. Single source of truth for state: Pinia stores.

---

## Stores (Pinia 3 — Setup API)

### `stores/auth.js`
- State: `user`, `isLoading`, `isEditMode`, `error`
- Getters: `isAuthenticated`, `isAdmin`
- Actions: `init()` (hydrate from Supabase session + subscribe), `login/signup/logout`, `toggleEditMode`
- Init triggered once from `main.js`

### `stores/theme.js`
- State: `currentTheme` (`'default'|'ocean'|'forest'|'sunset'`), `isDark`
- Hydrate from `localStorage['portfolio-theme']` + `['portfolio-dark-mode']`
- Watchers apply 11 CSS custom properties via class swap on `<html>` (`.theme-X` + `.dark`)
- Actions: `setTheme`, `toggleDarkMode`

### `stores/language.js`
- State: `language` (`'en'|'id'|'ar'`)
- Computed: `direction` (`'rtl'` for `ar`), `messages` (active locale JSON)
- Watchers apply `<html lang dir>` + `<body dir>` + persist
- Exposes `allMessages` for fallback lookup in `useTranslations`

---

## Routing (Vue Router 5)

```
/             → redirect /resume
/             ↦ DefaultLayout
  /resume     → ResumeView
  /showcase   → ShowcaseView
  /knowledge  → KnowledgeView
/* (catch)    → redirect /resume
```

Browser back/forward works. Bookmarkable URLs. SEO needs prerender step (not included — see ROADMAP).

---

## Theme System (4 × 2 = 8 variants)

Tailwind 4 CSS-first config in `src/assets/main.css`:
- `@import "tailwindcss"`
- `@custom-variant dark (&:where(.dark, .dark *))` — class-based dark variant
- `@theme {}` block defines static palette (neutral/primary/semantic) + font/spacing tokens
- 8 sets of 11 CSS custom properties (color-primary, color-secondary, ..., color-error) defined via class combinators: `.theme-default`, `.theme-default.dark`, `.theme-ocean`, ...
- Theme-aware utility helpers `.theme-primary`, `.theme-text`, `.theme-surface`, `.sidebar-nav-item` consume `var(--color-*)`

**Why CSS vars over Tailwind dynamic colors?** Tailwind 4 utility classes are static at build time. Per-theme dynamic palette must use CSS variables. The static Tailwind palette (`bg-neutral-100`, `text-primary-600`) handles brand bits that don't change per theme.

---

## i18n (Custom Composable, no `vue-i18n`)

- `infrastructure/i18n/messageLoader.ts` from v1 ported to `src/composables/useTranslations.js`
- Dot-notation: `t('sidebar.profile.name')`
- Fallback chain: active locale → English → key itself (debug)
- Array/object support: `t('resume.experiences', { returnObjects: true })`
- RTL Arabic via `<html dir="rtl">` + Sidebar mirror (`right-0 border-l`)

3 locale JSONs in `src/locales/{en,id,ar}.json`.

---

## Data Flow Examples

### Login
```
AuthModal.vue
  → auth.login(email, password)         ← Pinia auth store
    → authService.signIn(...)           ← service wrapper
      → supabase.auth.signInWithPassword()  ← Supabase JS
    → mapSupabaseUser(rawUser)          ← maps to domain shape
  ← User stored in auth.user
```

### Theme switch
```
ThemeSwitcher.vue
  → theme.setTheme('ocean')             ← Pinia theme store
  ← watcher fires
    → applyToDOM('ocean', isDark)        ← class swap on <html>
    → localStorage.setItem('portfolio-theme', 'ocean')
  ← CSS custom properties update → re-render
```

### Prayer Times
```
PrayerTimeCountdown.vue
  → usePrayerTimes() composable
    → fetchPrayerTimes() service
      → localStorage cache hit (10min TTL) ?
        Yes → return cached
        No → fetch RapidAPI MuslimSalat /Jakarta.json
              with VITE_RAPIDAPI_KEY header
              → cache + return
    → countdown ref recomputes on 30s interval tick
```

---

## Build & Deploy

### Local
```bash
bun install
bun run dev    # http://localhost:5000
bun run build  # → dist/
bun run lint   # oxlint + eslint
```

### Docker
```bash
docker build \
  --build-arg VITE_SUPABASE_URL=... \
  --build-arg VITE_SUPABASE_ANON_KEY=... \
  --build-arg VITE_ADMIN_EMAIL=... \
  --build-arg VITE_RAPIDAPI_KEY=... \
  -t my-portfolio .
docker run -p 80:80 my-portfolio
```

Multi-stage:
1. **Builder** (`oven/bun:1.3-alpine`) — `bun install --frozen-lockfile` + `bun run build`
2. **Runner** (`nginx:1.27-alpine`) — copy `dist/` + `nginx.conf` (SPA history fallback + gzip + cache + security headers)

---

## Decisions

See `docs/prd/PRD-hgis-vue-migration.md` § 6 "Decision Points" for the 10 decisions (DP-1..DP-10) and their final values approved by user (all defaults).

Key:
- **JS not TypeScript** (DP-1) — hgis-vue convention
- **In-place rewrite** on `feature/hgis-vue-migration` branch (DP-2)
- **Client-side prayer fetch** with VITE_RAPIDAPI_KEY (DP-3)
- **Supabase retained** for auth (DP-4)
- **shadcn-vue patterns** for UI primitives (DP-5)
- **Edit mode in-memory** (DP-6)
- **95% visual parity** acceptable (DP-7)
- **Custom i18n composable**, no vue-i18n (DP-8)
- **Tailwind 4 CSS-first** (DP-9)
- **`archive/nextjs-original` branch** for rollback (DP-10)
