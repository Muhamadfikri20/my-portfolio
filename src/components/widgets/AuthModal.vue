<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/Button.vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  initialMode: { type: String, default: 'login' },
})
const emit = defineEmits(['close'])

const auth = useAuthStore()
const mode = ref(props.initialMode)
const email = ref('')
const password = ref('')
const name = ref('')
const message = ref('')
const submitting = ref(false)

watch(() => props.initialMode, (v) => { mode.value = v })

async function submit() {
  submitting.value = true
  message.value = ''
  const result = mode.value === 'login'
    ? await auth.login(email.value, password.value)
    : await auth.signup(name.value, email.value, password.value)
  message.value = result.message
  submitting.value = false
  if (result.success) {
    setTimeout(() => emit('close'), 600)
  }
}

async function continueWithGoogle() {
  submitting.value = true
  message.value = ''
  const result = await auth.loginWithGoogle()
  if (!result.success) {
    message.value = result.message
    submitting.value = false
  }
  // On success, Supabase redirects to Google — no further action needed here
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      @click.self="emit('close')"
    >
      <div class="bg-card text-card-foreground rounded-2xl p-6 w-full max-w-md border border-border shadow-soft-md">
      <div class="flex items-start justify-between mb-4">
        <h2 class="text-lg font-semibold text-foreground">
          {{ mode === 'login' ? 'Sign In' : 'Sign Up' }}
        </h2>
        <button
          type="button"
          aria-label="Close"
          class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          @click="emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
      <form
        class="space-y-3"
        @submit.prevent="submit"
      >
        <input
          v-if="mode === 'signup'"
          v-model="name"
          type="text"
          placeholder="Name"
          required
          class="input-base"
        >
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="input-base"
        >
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="input-base"
        >
        <Button
          type="submit"
          variant="primary"
          :disabled="submitting"
          class="w-full"
        >
          {{ submitting ? 'Loading...' : (mode === 'login' ? 'Sign In' : 'Sign Up') }}
        </Button>

        <!-- Divider -->
        <div class="flex items-center gap-3">
          <div class="flex-1 h-px bg-border" />
          <span class="text-xs text-muted-foreground">or</span>
          <div class="flex-1 h-px bg-border" />
        </div>

        <!-- Google OAuth -->
        <button
          type="button"
          :disabled="submitting"
          class="w-full flex items-center justify-center gap-2.5 h-10 px-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors text-sm font-medium text-foreground disabled:opacity-60"
          @click="continueWithGoogle"
        >
          <svg
            class="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <p
          v-if="message"
          class="text-sm text-center text-muted-foreground"
        >
          {{ message }}
        </p>
        <button
          type="button"
          class="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
          @click="mode = mode === 'login' ? 'signup' : 'login'"
        >
          {{ mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Sign in' }}
        </button>
      </form>
      </div>
    </div>
  </Teleport>
</template>
