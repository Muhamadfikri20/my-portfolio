# 🧪 Testing Guide

Strategi dan panduan testing untuk portfolio website.

---

## 📋 Testing Strategy

### Jenis Test

| Level | Tool | Scope |
|-------|------|-------|
| Unit Test | Jest + React Testing Library | Komponen individual, hooks, utils |
| Integration Test | Jest + RTL | Interaksi antar komponen |
| E2E Test | Cypress / Playwright | User flow lengkap |
| Visual Test | Manual / Chromatic | UI consistency |

---

## 🛠️ Setup Testing

### Install Dependencies

```bash
# Jest + React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Jest config for Next.js
npm install --save-dev jest-environment-jsdom @types/jest ts-jest

# E2E (pilih salah satu)
npm install --save-dev cypress
# atau
npm install --save-dev @playwright/test
```

### Jest Configuration

Buat `jest.config.ts`:
```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

export default createJestConfig(config)
```

Buat `jest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

Tambahkan script di `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 📝 Test Cases

### 1. Unit Tests — Components

#### `Sidebar.test.tsx`
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from '@/components/Sidebar'

// Mock contexts
jest.mock('@/hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key: string) => key,
    language: 'en'
  })
}))

describe('Sidebar', () => {
  it('renders navigation items', () => {
    render(
      <Sidebar
        activeSection="resume"
        onSectionChange={jest.fn()}
        isOpen={false}
        onToggle={jest.fn()}
        onClose={jest.fn()}
      />
    )
    // Assert navigation items exist
  })

  it('calls onSectionChange when nav item clicked', () => {
    const mockChange = jest.fn()
    render(
      <Sidebar
        activeSection="resume"
        onSectionChange={mockChange}
        isOpen={false}
        onToggle={jest.fn()}
        onClose={jest.fn()}
      />
    )
    // Click and assert
  })
})
```

#### `ThemeSwitcher.test.tsx`
```typescript
describe('ThemeSwitcher', () => {
  it('displays all 4 themes')
  it('switches theme on click')
  it('saves theme to localStorage')
  it('toggles dark mode')
})
```

### 2. Unit Tests — Hooks

#### `useTranslations.test.ts`
```typescript
describe('useTranslations', () => {
  it('returns translation for valid key')
  it('falls back to English for missing translation')
  it('returns key string if no translation found')
  it('returns object when returnObjects is true')
})
```

### 3. Integration Tests

#### `PortfolioLayout.test.tsx`
```typescript
describe('PortfolioLayout', () => {
  it('shows ResumeSection by default')
  it('switches to ShowcaseSection when nav clicked')
  it('switches to KnowledgeBaseSection when nav clicked')
  it('opens sidebar on mobile menu click')
  it('closes sidebar when overlay clicked')
})
```

#### `Authentication Flow`
```typescript
describe('Auth Flow', () => {
  it('shows login modal on Sign In click')
  it('shows signup modal on Sign Up click')
  it('logs in with valid credentials')
  it('shows error with invalid credentials')
  it('shows user menu after login')
  it('shows edit mode toggle for admin')
  it('logs out successfully')
})
```

### 4. E2E Tests

#### `navigation.cy.ts` (Cypress)
```typescript
describe('Navigation', () => {
  it('should navigate between sections', () => {
    cy.visit('/')
    cy.get('[data-testid="nav-resume"]').should('be.visible')
    cy.get('[data-testid="nav-showcase"]').click()
    cy.contains('Projects').should('be.visible')
    cy.get('[data-testid="nav-knowledge"]').click()
    cy.contains('Knowledge').should('be.visible')
  })
})
```

---

## 🏃 Menjalankan Tests

```bash
# Semua unit tests
npm test

# Watch mode (auto-run saat file berubah)
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests (Cypress)
npx cypress open       # Interactive mode
npx cypress run        # Headless mode

# Type checking
npx tsc --noEmit
```

---

## ✅ Testing Checklist

### Sebelum setiap deploy, pastikan:

**Functionality:**
- [ ] Navigasi antar 3 section berfungsi
- [ ] Theme switching (4 tema + dark mode)
- [ ] Language switching (EN, ID, AR)
- [ ] RTL layout untuk bahasa Arab
- [ ] Login/signup flow
- [ ] Admin edit mode
- [ ] Download resume button
- [ ] Prayer time countdown

**Responsive:**
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)

**Cross-Browser:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Accessibility:**
- [ ] Keyboard navigation
- [ ] Screen reader (VoiceOver/NVDA)
- [ ] Color contrast check

---

## 📊 Coverage Goals

| Area | Target |
|------|--------|
| Components | > 80% |
| Hooks | > 90% |
| Contexts | > 85% |
| API Routes | > 90% |
| Overall | > 80% |
