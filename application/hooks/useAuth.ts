'use client'

import { useState, useEffect } from 'react'
import type { User } from '@/domain/models/User'
import { authService, mapSupabaseUser } from '@/application/services/authService'
import { authRepository } from '@/infrastructure/supabase/authRepository'

/**
 * Auth hook — manages auth state and exposes auth operations.
 * Consumes authService (application layer) and authRepository (infrastructure layer).
 */
export function useAuthLogic() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)

  // Check for existing session and listen to auth changes
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const session = await authRepository.getSession()
        if (session?.user) {
          setUser(mapSupabaseUser(session.user))
        }
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth state changes
    const subscription = authRepository.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user))
      } else {
        setUser(null)
        setIsEditMode(false)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const result = await authService.login(email, password)
      if (result.user) {
        setUser(result.user)
      }
      return { success: result.success, message: result.message }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      const result = await authService.signup(name, email, password)
      if (result.user) {
        setUser(result.user)
      }
      return { success: result.success, message: result.message }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
    setIsEditMode(false)
  }

  const toggleEditMode = () => {
    if (user?.role === 'admin') {
      setIsEditMode(!isEditMode)
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    isEditMode,
    toggleEditMode,
  }
}
