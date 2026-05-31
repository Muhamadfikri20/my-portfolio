import { supabase } from './client'
import type { User as SupabaseUser, Session, AuthChangeEvent } from '@supabase/supabase-js'

export interface AuthResult {
  success: boolean
  message: string
  user?: SupabaseUser
  session?: Session | null
}

/**
 * Repository for all Supabase auth operations.
 * Isolates Supabase dependency from the rest of the application.
 */
export const authRepository = {
  async signIn(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, message: error.message }
    }

    if (data.user) {
      return { success: true, message: 'Login successful', user: data.user, session: data.session }
    }

    return { success: false, message: 'Login failed' }
  },

  async signUp(name: string, email: string, password: string): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (error) {
      return { success: false, message: error.message }
    }

    if (data.user) {
      // Check if email confirmation is required
      if (data.user.identities?.length === 0) {
        return { success: false, message: 'This email is already registered. Please sign in instead.' }
      }

      // If email confirmation is disabled, user is immediately logged in
      if (data.session) {
        return { success: true, message: 'Account created successfully!', user: data.user, session: data.session }
      }

      // If email confirmation is enabled
      return { success: true, message: 'Account created! Please check your email to confirm your account.' }
    }

    return { success: false, message: 'Signup failed' }
  },

  async signOut(): Promise<void> {
    await supabase.auth.signOut()
  },

  async getSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => callback(event, session)
    )
    return subscription
  },
}
