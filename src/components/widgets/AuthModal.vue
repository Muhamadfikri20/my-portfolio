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
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
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
</template>
