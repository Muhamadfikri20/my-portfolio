<script setup>
// Phase 4 stub — full implementation in Phase 5
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

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
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="emit('close')"
  >
    <div class="bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === 'login' ? 'Sign In' : 'Sign Up' }}
      </h2>
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
          class="w-full border theme-border rounded-md px-3 py-2 bg-transparent"
        >
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full border theme-border rounded-md px-3 py-2 bg-transparent"
        >
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="w-full border theme-border rounded-md px-3 py-2 bg-transparent"
        >
        <button
          type="submit"
          :disabled="submitting"
          class="w-full theme-primary-bg text-white py-2 rounded-md font-medium disabled:opacity-50"
        >
          {{ submitting ? '...' : (mode === 'login' ? 'Sign In' : 'Sign Up') }}
        </button>
        <p
          v-if="message"
          class="text-sm text-center theme-text-secondary"
        >
          {{ message }}
        </p>
        <button
          type="button"
          class="w-full text-sm theme-text-secondary underline"
          @click="mode = mode === 'login' ? 'signup' : 'login'"
        >
          {{ mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>
