"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  name: string
  email: string
  avatar: string
  isAuthenticated: boolean
}

type AuthContextType = {
  user: User | null
  login: () => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated using localStorage
    const storedUser = localStorage.getItem("itineraid_user")

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.isAuthenticated) {
          setUser(userData)
        }
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("itineraid_user")
      }
    }

    setLoading(false)
  }, [])

  const login = async () => {
    setLoading(true)
    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Create dummy user
      const dummyUser = {
        name: "Traveler",
        email: "traveler@example.com",
        avatar: "",
        isAuthenticated: true,
      }

      // Store user in state and localStorage
      setUser(dummyUser)
      localStorage.setItem("itineraid_user", JSON.stringify(dummyUser))

      router.push("/dashboard")
    } catch (error) {
      console.error("Error signing in:", error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("itineraid_user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
