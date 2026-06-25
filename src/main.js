import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useLanguageStore } from '@/stores/language'
import { useContentStore } from '@/stores/content'
import { reveal } from '@/directives/reveal'
import 'vue-sonner/style.css'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.directive('reveal', reveal)

// Eagerly instantiate stores so their hydrate-from-localStorage + DOM apply
// runs before first render (avoid FOUC for theme/lang).
useThemeStore()
useLanguageStore()
// Auth init is async — kick it off but don't block mount.
useAuthStore().init()
// Content load (Supabase → fallback static) — async, non-blocking.
useContentStore().load()

app.mount('#app')
