"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  HeartIcon,
  GroupIcon as FriendsIcon,
  HomeIcon,
  ChevronDownIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LandingPage() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [companions, setCompanions] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const fullText = "Create Cinematic Travel Memories"
  
  // Background images for the slideshow
  const backgroundImages = [
    "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542052125323-9fb309905879?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop"
  ]

  // Typewriter effect and background image rotation
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    }
    
    // Rotate background images every 5 seconds
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)
    
    return () => {
      clearInterval(imageInterval)
    }
  }, [typedText])

  const handleContinue = async () => {
    setIsLoading(true)
    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Use selected destination or default to Tokyo
      const selectedDestination = destination || "Tokyo"

      // Store user data in localStorage to simulate authentication
      localStorage.setItem(
        "itineraid_user",
        JSON.stringify({
          name: "Traveler",
          email: "traveler@example.com",
          avatar: "",
          isAuthenticated: true,
          selectedDestination: selectedDestination
        }),
      )

      router.push("/dashboard")
    } catch (error) {
      console.error("Error signing in", error)
    } finally {
      setIsLoading(false)
    }
  }

  const popularDestinations = [
    { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1038&auto=format&fit=crop" },
    { name: "Santorini", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1287&auto=format&fit=crop" },
    { name: "Tokyo", image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1053&auto=format&fit=crop" },
    { name: "New York", image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=1170&auto=format&fit=crop" }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
      {/* Background image slideshow with overlay */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundImages.map((img, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImageIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${img})` }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md mx-auto flex flex-col items-start px-4 z-10">
        {/* Status Bar - Mockup */}
        <div className="w-full flex justify-between items-center mb-12 text-xs">
          <div>9:41</div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 15.5V8.5C3 7.67157 3.67157 7 4.5 7H19.5C20.3284 7 21 7.67157 21 8.5V15.5C21 16.3284 20.3284 17 19.5 17H4.5C3.67157 17 3 16.3284 3 15.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path d="M23 10V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="h-3 w-3">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 7V12L15 15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="h-3 w-3">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="6" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5" />
                <path d="M17 6V4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 6V4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 10H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-300"
        >
          {typedText}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-gray-300 mb-8 text-lg"
        >
          Craft journeys that tell your story, frame by breathtaking frame
        </motion.p>

        {/* Travel Prompts */}
        <div className="w-full space-y-6 mb-8 backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-zinc-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-2"
          >
            <label className="block text-white font-medium">Where will your story unfold?</label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 bg-zinc-900 border-zinc-800 text-white h-14 rounded-lg"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="space-y-2"
          >
            <label className="block text-white font-medium">How long is your adventure?</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="pl-10 bg-zinc-900 border-zinc-800 text-white h-14 rounded-lg">
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="weekend">Weekend Getaway (2-3 days)</SelectItem>
                  <SelectItem value="week">One Week</SelectItem>
                  <SelectItem value="twoweeks">Two Weeks</SelectItem>
                  <SelectItem value="month">One Month</SelectItem>
                  <SelectItem value="custom">Custom Duration</SelectItem>
                </SelectContent>
              </Select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="space-y-2"
          >
            <label className="block text-white font-medium">Who are the characters in your journey?</label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={companions === "solo" ? "default" : "outline"}
                onClick={() => setCompanions("solo")}
                className={`flex items-center justify-center gap-2 h-14 rounded-lg ${
                  companions === "solo"
                    ? "bg-indigo-600 hover:bg-indigo-700 border-0"
                    : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white"
                }`}
              >
                <UserIcon className="h-5 w-5" />
                <span>Solo</span>
              </Button>
              <Button
                variant={companions === "couple" ? "default" : "outline"}
                onClick={() => setCompanions("couple")}
                className={`flex items-center justify-center gap-2 h-14 rounded-lg ${
                  companions === "couple"
                    ? "bg-indigo-600 hover:bg-indigo-700 border-0"
                    : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white"
                }`}
              >
                <HeartIcon className="h-5 w-5" />
                <span>Couple</span>
              </Button>
              <Button
                variant={companions === "family" ? "default" : "outline"}
                onClick={() => setCompanions("family")}
                className={`flex items-center justify-center gap-2 h-14 rounded-lg ${
                  companions === "family"
                    ? "bg-indigo-600 hover:bg-indigo-700 border-0"
                    : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white"
                }`}
              >
                <HomeIcon className="h-5 w-5" />
                <span>Family</span>
              </Button>
              <Button
                variant={companions === "friends" ? "default" : "outline"}
                onClick={() => setCompanions("friends")}
                className={`flex items-center justify-center gap-2 h-14 rounded-lg ${
                  companions === "friends"
                    ? "bg-indigo-600 hover:bg-indigo-700 border-0"
                    : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white"
                }`}
              >
                <FriendsIcon className="h-5 w-5" />
                <span>Friends</span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="w-full"
        >
          <Button
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-lg text-lg font-medium"
          >
            {isLoading ? "Loading..." : "Begin Your Journey"}
          </Button>
        </motion.div>
      </div>
    
      {/* Popular Destinations Section */}
      <div className="w-full max-w-4xl mx-auto mt-16 z-10 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-2xl font-bold mb-6 text-center"
        >
          Popular Destinations
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 + (index * 0.1) }}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => {
                  setDestination(destination.name);
                  // Scroll back to the top to help user proceed with their selection
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
              <div className="relative h-40">
                <Image 
                  src={destination.image} 
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-lg font-bold text-white">{destination.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
