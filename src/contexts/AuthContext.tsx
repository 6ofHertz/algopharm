
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { User, Session } from '@supabase/supabase-js'

export type UserRole = 'cashier' | 'pharmacist' | 'admin'

interface ExtendedUser extends User {
  name?: string
  role?: UserRole
}

interface AuthContextType {
  user: ExtendedUser | null
  session: Session | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signUp: (email: string, password: string, userData?: any) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  hasRole: (roles: UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        // Extend user with additional properties
        const extendedUser: ExtendedUser = {
          ...session.user,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
          role: session.user.user_metadata?.role || 'cashier'
        }
        setUser(extendedUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        const extendedUser: ExtendedUser = {
          ...session.user,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
          role: session.user.user_metadata?.role || 'cashier'
        }
        setUser(extendedUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      throw error
    }
  }

  const logout = async () => {
    // Clear local session data
    const { clearSession } = await import('@/lib/localStorage/sessionManager');
    clearSession();
    
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  }

  const signUp = async (email: string, password: string, userData?: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) {
      throw error
    }
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    })
    
    if (error) {
      throw error
    }
  }

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user?.role) return false
    return roles.includes(user.role)
  }

  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    signUp,
    register,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
