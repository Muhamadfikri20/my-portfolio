# ─────────────────────────────────────────────────────────────
# Stage 1: build with Bun
# ─────────────────────────────────────────────────────────────
FROM oven/bun:1.3-alpine AS builder
WORKDIR /app

# Copy lockfile + package.json first for layer caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY . .

# VITE_* env vars are baked at build time; provide them via:
#   docker build --build-arg VITE_SUPABASE_URL=... --build-arg VITE_SUPABASE_ANON_KEY=...
# or via docker-compose `args:` section.
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_ADMIN_EMAIL
ARG VITE_RAPIDAPI_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_ADMIN_EMAIL=$VITE_ADMIN_EMAIL
ENV VITE_RAPIDAPI_KEY=$VITE_RAPIDAPI_KEY

RUN bun run build

# ─────────────────────────────────────────────────────────────
# Stage 2: serve static via nginx (SPA history fallback)
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
