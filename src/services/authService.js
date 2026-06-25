import { supabase } from '@/lib/supabase'
import { ADMIN_EMAIL } from '@/config/constants'

/**
 * Map Supabase user → portfolio domain User entity.
 */
export function mapSupabaseUser(sbUser) {
  if (!sbUser) return null
  return {
    id: sbUser.id,
    email: sbUser.email || '',
    name:
      sbUser.user_metadata?.name ||
      sbUser.email?.split('@')[0] ||
      'User',
    role: sbUser.email === ADMIN_EMAIL ? 'admin' : 'user',
  }
}

export const authService = {
  async getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  },

  async signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password })
  },

  async signUp(name, email, password) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
  },

  async signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  },

  async signOut() {
    return supabase.auth.signOut()
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },
}
