'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { AuthContextType } from '@/domain/models/User'
import { useAuthLogic } from '@/application/hooks/useAuth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Thin provider wrapper — delegates all logic to useAuthLogic hook.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthLogic()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
