import type { User } from '@/domain/models/User'
import { authRepository, type AuthResult } from '@/infrastructure/supabase/authRepository'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@example.com'

/**
 * Map a Supabase user to our domain User model.
 */
export function mapSupabaseUser(supabaseUser: SupabaseUser): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
    role: supabaseUser.email === ADMIN_EMAIL ? 'admin' : 'user',
  }
}

/**
 * Auth service — orchestrates authentication operations.
 * Does not depend on React.
 */
export const authService = {
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    const result: AuthResult = await authRepository.signIn(email, password)

    if (!result.success) {
      return { success: false, message: result.message }
    }

    if (result.user) {
      return { success: true, message: result.message, user: mapSupabaseUser(result.user) }
    }

    return { success: false, message: 'Login failed' }
  },

  async signup(name: string, email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    const result: AuthResult = await authRepository.signUp(name, email, password)

    if (!result.success) {
      return { success: false, message: result.message }
    }

    if (result.user && result.session) {
      return { success: true, message: result.message, user: mapSupabaseUser(result.user) }
    }

    // Email confirmation required — no user to return yet
    return { success: result.success, message: result.message }
  },

  async logout(): Promise<void> {
    await authRepository.signOut()
  },
}
