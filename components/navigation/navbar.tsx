"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  MapPinIcon, 
  GlobeIcon, 
  UserIcon, 
  CalendarIcon,
  MenuIcon,
  PlusIcon,
  InfoIcon,
  HomeIcon,
  XIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function NavBar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    // Check if user is authenticated
    const storedUser = localStorage.getItem("itineraid_user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.isAuthenticated) {
          setUser(userData)
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [])

  // Don't render anything on the server
  if (!mounted) return null
  
  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon className="h-5 w-5" />,
      active: pathname === "/"
    },
    {
      name: "Explore",
      href: "/explore",
      icon: <GlobeIcon className="h-5 w-5" />,
      active: pathname === "/explore",
      requiresAuth: true
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <MapPinIcon className="h-5 w-5" />,
      active: pathname === "/dashboard",
      requiresAuth: true
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: <CalendarIcon className="h-5 w-5" />,
      active: pathname === "/calendar",
      requiresAuth: true
    },
    {
      name: "Create Trip",
      href: "/create-trip",
      icon: <PlusIcon className="h-5 w-5" />,
      active: pathname === "/create-trip",
      requiresAuth: true
    },
    {
      name: "About",
      href: "/about",
      icon: <InfoIcon className="h-5 w-5" />,
      active: pathname === "/about",
    }
  ]
  
  // Filter out links that require auth if user isn't authenticated
  const filteredLinks = navLinks.filter(link => 
    !link.requiresAuth || (link.requiresAuth && user)
  )
  
  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-zinc-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center rounded-lg">
            <GlobeIcon className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-white hidden sm:inline-block">ItinerAid</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {filteredLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={link.active ? "default" : "ghost"}
                size="sm"
                className={`flex items-center gap-2 ${
                  link.active 
                    ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Button>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-300">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-900 border-zinc-800 text-white p-0">
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center rounded-lg">
                      <GlobeIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-xl">ItinerAid</span>
                  </div>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <XIcon className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>
                
                <div className="space-y-1 mt-4">
                  {filteredLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <Button
                        variant={link.active ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          link.active 
                            ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {link.icon}
                        <span className="ml-3">{link.name}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-auto pt-6 border-t border-zinc-800">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="border border-zinc-700">
                        <AvatarImage src={user.avatar || ""} alt={user.name} />
                        <AvatarFallback className="bg-indigo-600">{user.name?.charAt(0) || "T"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name || "Traveler"}</p>
                        <Link href="/profile">
                          <p className="text-sm text-indigo-400 hover:underline">View Profile</p>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Sign In</Button>
                      <Button variant="outline" className="w-full border-zinc-700">Create Account</Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* User Menu */}
        <div className="hidden md:block">
          {user ? (
            <Link href="/profile">
              <Avatar className="border border-zinc-700 cursor-pointer hover:border-zinc-500 transition-colors">
                <AvatarImage src={user.avatar || ""} alt={user.name} />
                <AvatarFallback className="bg-indigo-600">{user.name?.charAt(0) || "T"}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/?signin=true">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/?signup=true">
                <Button variant="default" size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}