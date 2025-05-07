"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/AuthContext"
import { 
  UserIcon, 
  MailIcon, 
  KeyIcon, 
  LogInIcon, 
  UserPlusIcon,
  AlertCircleIcon,
  LoaderIcon
} from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "register"
  destination?: string
}

export function AuthModal({ isOpen, onClose, defaultTab = "login", destination }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  
  const { signIn, signUp, signInWithGoogle, error, setError } = useAuth()
  const router = useRouter()

  // Clear errors when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value as "login" | "register")
    setError(null)
    setLocalError(null)
  }

  // Handle login with email/password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setLocalError("Please enter both email and password")
      return
    }
    
    setLoading(true)
    setLocalError(null)
    
    try {
      await signIn(email, password)
      
      if (destination) {
        // Store destination preference if provided
        localStorage.setItem(
          "itineraid_user_preference",
          JSON.stringify({
            selectedDestination: destination
          })
        )
      }
      
      onClose()
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      // Error is handled by the auth context
    } finally {
      setLoading(false)
    }
  }
  
  // Handle registration with email/password
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !password) {
      setLocalError("Please fill in all fields")
      return
    }
    
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters")
      return
    }
    
    setLoading(true)
    setLocalError(null)
    
    try {
      await signUp(email, password, name)
      
      if (destination) {
        // Store destination preference if provided
        localStorage.setItem(
          "itineraid_user_preference",
          JSON.stringify({
            selectedDestination: destination
          })
        )
      }
      
      onClose()
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration error:", error)
      // Error is handled by the auth context
    } finally {
      setLoading(false)
    }
  }
  
  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true)
    setLocalError(null)
    
    try {
      await signInWithGoogle()
      
      if (destination) {
        // Store destination preference if provided
        localStorage.setItem(
          "itineraid_user_preference",
          JSON.stringify({
            selectedDestination: destination
          })
        )
      }
      
      onClose()
      router.push("/dashboard")
    } catch (error) {
      console.error("Google sign-in error:", error)
      // Error is handled by the auth context
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {activeTab === "login" ? "Welcome Back!" : "Join ItinerAid"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            {activeTab === "login" 
              ? "Continue your cinematic journey planning" 
              : "Sign up to create breathtaking travel experiences"}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login" className="data-[state=active]:bg-indigo-600">
              <LogInIcon className="h-4 w-4 mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-indigo-600">
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Register
            </TabsTrigger>
          </TabsList>
          
          {/* Login Form */}
          <TabsContent value="login" className="space-y-4">
            {(error || localError) && (
              <Alert variant="destructive" className="bg-red-900/30 border-red-900 text-red-200">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error || localError}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="text-xs text-indigo-400 h-auto p-0">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-xs text-gray-400">
                <span className="bg-zinc-900 px-2">OR CONTINUE WITH</span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-zinc-700 hover:bg-zinc-800"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </TabsContent>
          
          {/* Register Form */}
          <TabsContent value="register" className="space-y-4">
            {(error || localError) && (
              <Alert variant="destructive" className="bg-red-900/30 border-red-900 text-red-200">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error || localError}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-400">Password must be at least 6 characters</p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-xs text-gray-400">
                <span className="bg-zinc-900 px-2">OR CONTINUE WITH</span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-zinc-700 hover:bg-zinc-800"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="text-xs text-gray-400 text-center pt-4 border-t border-zinc-800">
          By continuing, you agree to our <Button variant="link" className="p-0 h-auto text-indigo-400 text-xs">Terms of Service</Button> and <Button variant="link" className="p-0 h-auto text-indigo-400 text-xs">Privacy Policy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}