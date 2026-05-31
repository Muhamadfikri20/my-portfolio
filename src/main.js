import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useLanguageStore } from '@/stores/language'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Eagerly instantiate stores so their hydrate-from-localStorage + DOM apply
// runs before first render (avoid FOUC for theme/lang).
useThemeStore()
useLanguageStore()
// Auth init is async — kick it off but don't block mount.
useAuthStore().init()

app.mount('#app')
