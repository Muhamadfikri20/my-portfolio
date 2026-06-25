import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, mapSupabaseUser } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  // ─── State ───
  const user = ref(null)
  const isLoading = ref(true)
  const isEditMode = ref(false)
  const error = ref(null)
  let _subscription = null

  // ─── Getters ───
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // ─── Init (called once from main.js) ───
  async function init() {
    isLoading.value = true
    try {
      const session = await authService.getSession()
      user.value = mapSupabaseUser(session?.user)
    } catch (e) {
       
      console.error('[auth] getSession failed:', e)
    } finally {
      isLoading.value = false
    }

    // Subscribe to auth changes (login/logout/token refresh)
    const { data } = authService.onAuthStateChange((_event, session) => {
      user.value = mapSupabaseUser(session?.user)
      if (!session?.user) isEditMode.value = false
      isLoading.value = false
    })
    _subscription = data?.subscription
  }

  function dispose() {
    _subscription?.unsubscribe?.()
    _subscription = null
  }

  // ─── Actions ───
  async function login(email, password) {
    isLoading.value = true
    error.value = null
    try {
      const { data, error: err } = await authService.signIn(email, password)
      if (err) return { success: false, message: err.message }
      if (data?.user) {
        user.value = mapSupabaseUser(data.user)
        return { success: true, message: 'Login successful' }
      }
      return { success: false, message: 'Login failed' }
    } catch {
      return { success: false, message: 'Network error. Please try again.' }
    } finally {
      isLoading.value = false
    }
  }

  async function signup(name, email, password) {
    isLoading.value = true
    error.value = null
    try {
      const { data, error: err } = await authService.signUp(name, email, password)
      if (err) return { success: false, message: err.message }
      if (data?.user) {
        if (data.user.identities?.length === 0) {
          return {
            success: false,
            message: 'This email is already registered. Please sign in instead.',
          }
        }
        if (data.session) {
          user.value = mapSupabaseUser(data.user)
          return { success: true, message: 'Account created successfully!' }
        }
        return {
          success: true,
          message: 'Account created! Please check your email to confirm.',
        }
      }
      return { success: false, message: 'Signup failed' }
    } catch {
      return { success: false, message: 'Network error. Please try again.' }
    } finally {
      isLoading.value = false
    }
  }

  async function loginWithGoogle() {
    error.value = null
    const { error: err } = await authService.signInWithGoogle()
    if (err) return { success: false, message: err.message }
    return { success: true, message: '' }
  }

  async function logout() {
    try {
      await authService.signOut()
    } catch {
      // Ignore — still clear local state
    }
    user.value = null
    isEditMode.value = false
  }

  function toggleEditMode() {
    if (isAdmin.value) isEditMode.value = !isEditMode.value
  }

  return {
    // State
    user,
    isLoading,
    isEditMode,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    // Actions
    init,
    dispose,
    login,
    signup,
    loginWithGoogle,
    logout,
    toggleEditMode,
  }
})
