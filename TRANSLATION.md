# Translation Feature

This portfolio now supports multiple languages with a complete translation system.

## Supported Languages

- **English (en)** - Default language
- **Indonesian (id)** - Bahasa Indonesia
- **Arabic (ar)** - العربية (with RTL support)

## Features

### Language Switcher
- Globe icon in the header allows switching between languages
- Language preference is saved in localStorage
- Smooth transitions between languages

### RTL Support
- Arabic language automatically switches to right-to-left layout
- Sidebar positioning adjusts for RTL
- Text alignment and layout adapts to language direction

### Translation Coverage
- All UI text is translated
- Navigation labels and descriptions
- Resume content including experiences, education, and skills
- Header and sidebar content
- Button labels and tooltips

## File Structure

```
messages/
├── en.json    # English translations
├── id.json    # Indonesian translations
└── ar.json    # Arabic translations

contexts/
└── LanguageContext.tsx    # Language state management

hooks/
└── useTranslations.ts     # Translation hook

components/ui/
└── LanguageSwitcher.tsx   # Language selection component
```

## Usage

### Adding New Translations

1. Add the new key-value pair to all language files in `messages/`
2. Use the translation in components with `t('key.path')`
3. For objects/arrays, use `t('key.path', { returnObjects: true })`

### Example

```tsx
import { useTranslations } from '@/hooks/useTranslations'

function MyComponent() {
  const { t } = useTranslations()
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('description.text')}</p>
    </div>
  )
}
```

## Technical Implementation

- **Context-based state management** for language switching
- **Automatic RTL detection** based on selected language
- **Fallback system** to English if translation is missing
- **localStorage persistence** for user language preference
- **TypeScript support** with proper typing

## Browser Support

- Modern browsers with localStorage support
- RTL layout support for Arabic
- Responsive design maintained across all languages
