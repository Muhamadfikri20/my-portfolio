# 🚀 Deployment Guide

Panduan lengkap untuk deploy portfolio website ke berbagai platform.

---

## 📋 Prerequisites

- Node.js 18+
- npm atau yarn
- Git
- Docker (untuk Docker deployment)

---

## 1. 🐳 Docker Deployment (Recommended)

### Build & Run

```bash
# Build image
docker build -t my-portfolio .

# Run container
docker run -p 3000:3000 my-portfolio
```

### Menggunakan Docker Compose

```bash
# Build dan jalankan
docker-compose up -d

# Stop
docker-compose down

# Rebuild setelah perubahan
docker-compose up -d --build
```

### Konfigurasi Docker

**Dockerfile** menggunakan multi-stage build:
1. **Stage 1 (deps)**: Install dependencies
2. **Stage 2 (builder)**: Build Next.js app
3. **Stage 3 (runner)**: Run production server (standalone mode)

**docker-compose.yml** konfigurasi:
- Port mapping: `3000:3000`
- Auto-restart: `unless-stopped`

---

## 2. ▲ Vercel (Easiest)

### Langkah-langkah:

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Import repository dari GitHub
   - Vercel otomatis mendeteksi Next.js

3. **Deploy**
   - Klik "Deploy"
   - Setiap push ke `main` akan auto-deploy

### Environment Variables (jika ada)
Tambahkan di Vercel Dashboard → Settings → Environment Variables:
```
# Contoh
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 3. 🌐 Netlify

### Langkah-langkah:

1. **Build command**: `npm run build`
2. **Publish directory**: `.next`
3. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

> **⚠️ Catatan**: Netlify memerlukan adapter untuk Next.js App Router. Gunakan `@netlify/plugin-nextjs`.

---

## 4. ☁️ AWS (EC2 / Amplify)

### AWS Amplify
```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

### AWS EC2 + Docker
```bash
# SSH ke EC2 instance
ssh -i your-key.pem ec2-user@your-ip

# Install Docker
sudo yum install docker -y
sudo service docker start

# Clone & run
git clone your-repo
cd my-portfolio
docker-compose up -d
```

---

## 5. 🖥️ VPS / Bare Metal

### Dengan PM2

```bash
# Install PM2
npm install -g pm2

# Build
npm run build

# Start dengan PM2
pm2 start npm --name "portfolio" -- start

# Auto-start on reboot
pm2 startup
pm2 save
```

### Dengan Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### SSL dengan Certbot
```bash
sudo certbot --nginx -d yourdomain.com
```

---

## 🔧 Build Configuration

### next.config.js
```javascript
const nextConfig = {
  output: 'standalone',  // Optimasi untuk Docker
}
```

### Production Build
```bash
# Build
npm run build

# Start production server
npm start
```

---

## 📊 Checklist Sebelum Deploy

- [ ] Semua dependencies terinstall (`npm install`)
- [ ] Build berhasil tanpa error (`npm run build`)
- [ ] Environment variables sudah diset
- [ ] Test di local production mode (`npm start`)
- [ ] Favicon dan meta tags sudah benar
- [ ] Responsive design berjalan
- [ ] Dark mode berfungsi
- [ ] Semua bahasa berfungsi
- [ ] Authentication flow berjalan

---

## 🆘 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Build gagal | Cek `npm run build` log untuk error |
| Port conflict | Ganti port di `docker-compose.yml` atau gunakan `-p 8080:3000` |
| CSS tidak load | Pastikan `tailwind.config.js` content paths benar |
| API routes gagal | Cek apakah `/api/*` routes ada dan benar |
| Docker image besar | Gunakan `.dockerignore` untuk exclude `node_modules`, `.git` |
