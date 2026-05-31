# Rheyno Apria Pratama — Portfolio (v2 hgis-vue)

Modern, responsive portfolio website built on **Vue 3 SPA + Bun + Vite + Pinia + Tailwind 4** — the hgis-vue stack.

> v2.0.0 migrated from Next.js 14 + React + TypeScript. Original code preserved on branch `archive/nextjs-original`.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Vue 3.5 SPA (Composition API + `<script setup>`) |
| Runtime | Bun 1.3+ |
| Bundler | Vite 7 |
| Router | Vue Router 5 |
| State | Pinia 3 (setup stores) |
| Styling | Tailwind 4 (CSS-first via `@tailwindcss/vite`) + `tw-animate-css` |
| UI primitives | Radix Vue + Reka UI + class-variance-authority + clsx + tailwind-merge |
| Icons | lucide-vue-next |
| Auth | Supabase JS |
| Validation | zod |
| Language | JavaScript (no TypeScript) |
| Lint | oxlint + ESLint 9 flat config + plugin-vue |

---

## Features

- **3 routes** — `/resume`, `/showcase`, `/knowledge` (URL-based, browser back/forward, bookmarkable)
- **4 themes × dark/light = 8 variants** — Classic, Ocean Breeze, Forest Green, Sunset Glow
- **3 languages** — English, Bahasa Indonesia, Arabic (with RTL auto-flip)
- **Auth** — Supabase login/signup; admin role via email match `VITE_ADMIN_EMAIL`
- **Edit mode** — admin-only inline editing (in-memory, not persistent)
- **Prayer Times widget** — RapidAPI MuslimSalat with 10-min localStorage cache
- **Animated greeting** — 10 multilingual greetings rotating every 2.5s

---

## Getting Started

### Prerequisites
- Bun 1.3+ (`curl -fsSL https://bun.sh/install | bash`)

### Install & Run

```bash
bun install
bun run dev          # http://localhost:5000
```

### Build

```bash
bun run build        # output: dist/
bun run preview      # preview production build locally
```

### Lint

```bash
bun run lint         # oxlint + eslint (auto-fix)
```

---

## Environment Variables

Create `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
VITE_ADMIN_EMAIL=admin@example.com
VITE_RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY    # optional: enable Prayer widget
```

> Vite bakes `VITE_*` vars at build time. Server-side secrets are NOT supported in this SPA — use a serverless function or companion server if needed.

---

## Project Structure

```
my-portfolio/
├── index.html                       # Vite entry
├── src/
│   ├── main.js                      # createApp + pinia + router + main.css
│   ├── App.vue                      # <router-view/>
│   ├── assets/main.css              # Tailwind 4 + 8 theme variants + utility helpers
│   ├── components/
│   │   ├── ui/                      # shadcn-style: Button, Card, Badge
│   │   ├── layout/                  # Sidebar, Header
│   │   └── widgets/                 # AnimatedGreeting, AuthModal, EditableText, LanguageSwitcher, ThemeSwitcher, ThemeToggle, PrayerTimeCountdown
│   ├── composables/                 # useTranslations, usePrayerTimes
│   ├── config/                      # constants, api.endpoints
│   ├── data/                        # skills, projects, articles (hardcoded content)
│   ├── layouts/DefaultLayout.vue    # Sidebar + Header + <router-view/>
│   ├── lib/                         # supabase, utils (cn helper)
│   ├── locales/                     # en.json, id.json, ar.json
│   ├── router/index.js              # Vue Router 5 routes
│   ├── services/                    # authService, prayerService
│   ├── stores/                      # auth, theme, language (Pinia setup stores)
│   └── views/                       # ResumeView, ShowcaseView, KnowledgeView
├── public/                          # static assets
├── Dockerfile                       # Bun build → nginx serve dist
├── nginx.conf                       # SPA history fallback + gzip + cache headers
├── docker-compose.yml
├── vite.config.js
├── jsconfig.json
├── eslint.config.js
├── .oxlintrc.json
└── package.json
```

---

## Architecture

Single-architecture **Pinia setup stores** + **composables** consuming **services** consuming **lib/Supabase**.

```
View / Widget
    ↓ uses
Composable (useX) + Pinia Store (useXStore)
    ↓ delegates side effects to
Service (authService / prayerService)
    ↓ uses
lib (supabase, utils) + config (endpoints, constants)
```

See `ARCHITECTURE.md` for the full diagram.

---

## Deployment

### Docker (recommended)

```bash
docker build \
  --build-arg VITE_SUPABASE_URL=... \
  --build-arg VITE_SUPABASE_ANON_KEY=... \
  --build-arg VITE_ADMIN_EMAIL=... \
  --build-arg VITE_RAPIDAPI_KEY=... \
  -t my-portfolio .
docker run -p 80:80 my-portfolio

# or via docker-compose with .env file:
docker-compose up -d
```

### Vercel / Netlify

Both auto-detect Vite. Set `VITE_*` env vars in dashboard. Build command: `bun run build` (or `npm run build` if Bun unavailable in build env). Output: `dist/`.

---

## Contact

- Email: rheyno.apria@example.com
- GitHub: [github.com/rheynoapria](https://github.com/rheynoapria)
- LinkedIn: [linkedin.com/in/rheynoapria](https://linkedin.com/in/rheynoapria)

---

## License

MIT.
