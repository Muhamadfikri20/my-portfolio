# 📡 API Documentation

Dokumentasi untuk semua API routes yang tersedia di portfolio website.

---

## 🔗 Base URL

```
Development: http://localhost:3000/api
Production:  https://yourdomain.com/api
```

---

## 🔐 Authentication API

### POST `/api/auth/login`

Login dengan email dan password.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  },
  "token": "demo-token-admin-123"
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### POST `/api/auth/signup`

Registrasi akun baru.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "user": {
    "id": "generated-uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "generated-jwt-token"
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

## 🕌 Prayer Times API

### GET `/api/prayer-times`

Mendapatkan jadwal waktu sholat.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `latitude` | `number` | No | Latitude lokasi (default: lokasi server) |
| `longitude` | `number` | No | Longitude lokasi (default: lokasi server) |

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "fajr": "04:30",
    "dhuhr": "12:00",
    "asr": "15:15",
    "maghrib": "18:00",
    "isha": "19:15"
  },
  "date": "2026-03-29",
  "timezone": "Asia/Jakarta"
}
```

---

## 📊 Response Format

Semua API menggunakan format response yang konsisten:

### Success
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error
```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

---

## 🔑 Authentication Flow

```
1. User submit login/signup form
2. Frontend POST ke /api/auth/login atau /api/auth/signup
3. Server validasi credentials
4. Server return user data + token
5. Frontend simpan token di localStorage
6. Token digunakan untuk authenticated requests
```

---

## ⚠️ Demo Mode

> **Penting**: API saat ini masih dalam **demo mode** dengan in-memory storage.

**Demo Accounts:**

| Email | Password | Role |
|-------|----------|------|
| `admin@example.com` | `admin123` | Admin |
| `user@example.com` | `user123` | User |

---

## 🔮 Rencana API Masa Depan

- [ ] `GET /api/projects` — List semua project
- [ ] `POST /api/projects` — Create project (admin)
- [ ] `PUT /api/projects/:id` — Update project (admin)
- [ ] `DELETE /api/projects/:id` — Delete project (admin)
- [ ] `GET /api/articles` — List semua artikel
- [ ] `POST /api/contact` — Submit contact form
- [ ] `GET /api/analytics` — Dashboard analytics
