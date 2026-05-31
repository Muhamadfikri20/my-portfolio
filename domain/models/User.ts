export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isEditMode: boolean
  toggleEditMode: () => void
}
