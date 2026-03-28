# Theme System Documentation

Portfolio website ini sekarang memiliki sistem tema yang canggih dengan 4 template menarik yang bisa dipilih pengguna.

## 🎨 **4 Template Tema Tersedia**

### 1. **Classic** (Default)
- **Warna**: Biru profesional (#3b82f6, #6366f1, #8b5cf6)
- **Gaya**: Clean dan professional
- **Cocok untuk**: Presentasi bisnis, portfolio profesional

### 2. **Ocean Breeze** 
- **Warna**: Biru laut yang menenangkan (#0ea5e9, #06b6d4, #0891b2)
- **Gaya**: Calming blue tones inspired by the ocean
- **Cocok untuk**: Desainer, developer yang suka warna biru

### 3. **Forest Green**
- **Warna**: Hijau alami (#059669, #047857, #065f46)
- **Gaya**: Natural green tones for a calming experience
- **Cocok untuk**: Environmental, health, atau nature-related portfolios

### 4. **Sunset Glow**
- **Warna**: Orange dan pink hangat (#f97316, #ea580c, #dc2626)
- **Gaya**: Warm orange and pink tones like a beautiful sunset
- **Cocok untuk**: Creative, artistic, atau warm personality portfolios

## 🌙 **Dark Mode Support**

Setiap tema memiliki versi dark mode yang otomatis disesuaikan:
- **Light Mode**: Warna terang dengan kontras yang baik
- **Dark Mode**: Warna gelap yang nyaman untuk mata
- **Auto-save**: Pilihan tema dan dark mode tersimpan otomatis

## 🎯 **Fitur Theme System**

### **Theme Switcher**
- **Lokasi**: Header sebelah language switcher
- **Icon**: Palette (🎨)
- **Fitur**:
  - Preview warna tema
  - Nama dan deskripsi tema
  - Toggle dark/light mode
  - Auto-save preferences

### **CSS Custom Properties**
Sistem menggunakan CSS custom properties untuk perubahan tema yang smooth:
```css
--color-primary: #3b82f6
--color-secondary: #6366f1
--color-accent: #8b5cf6
--color-background: #ffffff
--color-surface: #f8fafc
--color-text: #1e293b
--color-text-secondary: #64748b
--color-border: #e2e8f0
```

### **Theme-Aware Classes**
```css
.theme-primary          /* Warna primary */
.theme-secondary        /* Warna secondary */
.theme-accent          /* Warna accent */
.theme-background      /* Warna background */
.theme-surface         /* Warna surface */
.theme-text            /* Warna text utama */
.theme-text-secondary  /* Warna text secondary */
.theme-border          /* Warna border */
```

## 🔧 **Cara Menggunakan**

### **Untuk User:**
1. Klik ikon palette (🎨) di header
2. Pilih tema dari 4 opsi yang tersedia
3. Toggle dark/light mode sesuai preferensi
4. Tema akan tersimpan otomatis

### **Untuk Developer:**
```tsx
import { useTheme } from '@/contexts/ThemeContext'

function MyComponent() {
  const { currentTheme, setTheme, themeConfig, isDark, toggleDarkMode } = useTheme()
  
  return (
    <div className="theme-primary-bg theme-text">
      <h1>Current theme: {themeConfig.displayName}</h1>
      <button onClick={() => setTheme('ocean')}>
        Switch to Ocean theme
      </button>
    </div>
  )
}
```

## 📱 **Responsive Design**

- **Desktop**: Theme switcher dengan preview lengkap
- **Mobile**: Theme switcher tetap tersedia di header
- **Tablet**: Layout menyesuaikan ukuran layar

## 🎨 **Customization**

### **Menambah Tema Baru:**
1. Tambahkan konfigurasi di `themeConfigs` di `ThemeContext.tsx`
2. Definisikan warna untuk light dan dark mode
3. Tambahkan opsi di `ThemeSwitcher.tsx`
4. Test di semua komponen

### **Mengubah Warna Tema:**
Edit konfigurasi tema di `ThemeContext.tsx`:
```typescript
ocean: {
  name: 'ocean',
  displayName: 'Ocean Breeze',
  description: 'Calming blue tones',
  colors: {
    primary: '#0ea5e9',    // Ganti warna primary
    secondary: '#06b6d4',  // Ganti warna secondary
    // ... dst
  }
}
```

## 🚀 **Performance**

- **CSS Variables**: Perubahan tema instant tanpa reload
- **localStorage**: Preferences tersimpan di browser
- **Smooth Transitions**: Animasi halus saat ganti tema
- **Optimized**: Hanya CSS yang diperlukan yang dimuat

## 🔄 **Integration dengan Translation**

Theme system terintegrasi dengan sistem translate:
- Theme switcher mendukung semua bahasa
- Dark mode toggle text dalam bahasa yang dipilih
- Konsisten dengan design system

## 📊 **Browser Support**

- **Modern Browsers**: Full support
- **CSS Custom Properties**: Required
- **localStorage**: Required untuk save preferences
- **Responsive**: Mobile-first design

---

**Sistem tema ini memberikan fleksibilitas maksimal untuk personalisasi portfolio sesuai dengan preferensi dan kepribadian pengguna!** 🎨✨
