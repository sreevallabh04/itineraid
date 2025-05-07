"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { 
  User as FirebaseUser,
  onAuthStateChanged 
} from "firebase/auth"
import { 
  auth, 
  signIn, 
  signUp, 
  signOut, 
  signInWithGoogle 
} from "@/lib/firebase"

// Define the shape of our auth context
interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<FirebaseUser>
  signUp: (email: string, password: string, displayName: string) => Promise<FirebaseUser>
  signOut: () => Promise<boolean>
  signInWithGoogle: () => Promise<FirebaseUser>
  setError: (error: string | null) => void
}

// Create the auth context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Listen for auth state changes when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      setUser(user)
      setLoading(false)
    })

    // Clean up subscription
    return () => unsubscribe()
  }, [])

  // Handle sign in with email/password
  const handleSignIn = async (email: string, password: string) => {
    try {
      setError(null)
      return await signIn(email, password)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
      throw error
    }
  }

  // Handle sign up with email/password
  const handleSignUp = async (email: string, password: string, displayName: string) => {
    try {
      setError(null)
      return await signUp(email, password, displayName)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
      throw error
    }
  }

  // Handle sign in with Google
  const handleSignInWithGoogle = async () => {
    try {
      setError(null)
      return await signInWithGoogle()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
      throw error
    }
  }

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setError(null)
      await signOut()
      return true
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
      throw error
    }
  }

  // Create the value object
  const value = {
    user,
    loading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    signInWithGoogle: handleSignInWithGoogle,
    setError
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Create a hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}