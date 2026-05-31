# Changelog

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
using [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-05-31

### Stack Migration — hgis-vue Standard

Complete rewrite from Next.js 14 + React 18 + TypeScript → **Vue 3.5 SPA + Bun + Vite 7 + Pinia 3 + Tailwind 4** per hgis-vue convention.

### Added
- **Vue 3 SPA** — Composition API + `<script setup>` throughout
- **Bun runtime** — 1.3.13+, replaces Node 18 in dev
- **Vite 7** — bundler with HMR, replaces Next.js
- **Vue Router 5** — URL-based routing (`/resume`, `/showcase`, `/knowledge`) with route group via DefaultLayout
- **Pinia 3 setup stores** — `auth`, `theme`, `language` (replaces 3 React Contexts)
- **Tailwind 4 CSS-first** — `@tailwindcss/vite` plugin, theme tokens via `@theme {}` block, 8 theme variants via CSS custom property cascade
- **shadcn-vue-style UI primitives** — Button, Card, Badge with `class-variance-authority`
- **lucide-vue-next** icons (replaces lucide-react + react-icons)
- **oxlint + ESLint 9 flat config** — dual linting per hgis-vue pattern
- Dockerfile multi-stage: `oven/bun:alpine` build → `nginx:alpine` serve `dist/`
- nginx.conf with SPA history fallback + gzip + cache headers + security headers
- `PRD-hgis-vue-migration.md` (580 lines) — full migration plan with 8 phases, 12 acceptance criteria, 10 decision points

### Changed
- Project structure: `app/` + `contexts/` + `components/` (legacy) + `presentation/` + `application/` + `domain/` + `infrastructure/` → consolidated `src/` per hgis-vue
- Environment variables: `NEXT_PUBLIC_*` → `VITE_*`
- Build output: `.next/standalone` → `dist/` (static)
- Port: 3000 (Next) → 5000 dev / 80 production via nginx
- Auth flow: AuthContext → `stores/auth.js` (init from Supabase session + onAuthStateChange subscription)
- Theme system: 165-line inline `themeConfigs` in `ThemeContext.tsx` → 8 CSS custom property variants in `assets/main.css`
- i18n: `infrastructure/i18n/messageLoader.ts` → `composables/useTranslations.js` (dot-notation + fallback en preserved)
- Prayer Times: server-side `app/api/prayer-times` route → client-side fetch with VITE_RAPIDAPI_KEY (per PRD DP-3=A)
- Editable text: still in-memory only (PRD DP-6 default — by design demo)

### Removed
- All React/Next.js dependencies (`next`, `react`, `react-dom`, `@types/*`, `next-intl`, `eslint-config-next`, `lucide-react`, `react-icons`, `autoprefixer`, `postcss`)
- TypeScript (`typescript`, `tsconfig.json`, `next-env.d.ts`) — hgis-vue uses JS + `jsconfig.json` (PRD DP-1)
- Legacy folders: `app/`, `contexts/`, `components/` (old), `hooks/`, `lib/` (old), `presentation/`, `application/`, `domain/`, `infrastructure/`, `messages/`
- `next.config.js`, legacy `tailwind.config.js` (Tailwind 4 CSS-first), `postcss.config.js`, `app/globals.css.backup`
- DUALISM architecture (legacy contexts + new layered coexisting) → single architecture Pinia stores

### Migration Phasing
- Phase 0: branch setup (`archive/nextjs-original` + `feature/hgis-vue-migration`)
- Phase 1: Scaffold Bun/Vite/Vue/Pinia/Tailwind 4 + tooling
- Phase 2: 8 theme variants via CSS custom properties
- Phase 3: Pinia stores + composables + services + locales
- Phase 4: Router + DefaultLayout + Sidebar + Header + widget scaffolds
- Phase 5: shadcn-vue UI primitives + 7 widget Vue SFC
- Phase 6: 3 views with i18n + filter logic + content port
- Phase 7: Dockerfile + nginx + docker-compose
- Phase 8: cleanup legacy + docs + skill update + merge

### Rollback
Branch `archive/nextjs-original` preserves complete v1.0.0 Next.js codebase. Pushed to remote.

---

## [1.0.0] — 2026-03-29

### Added
- Initial release on Next.js 14 + React 18 + TypeScript + Tailwind 3 + Supabase
- 3 sections (Resume, Showcase, Knowledge Base)
- 4 themes × dark/light
- 3 languages (EN/ID/AR) + RTL
- Supabase auth + admin edit mode
- Prayer time countdown widget
- Docker support (standalone mode)
