"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { AuthModal } from "@/components/auth/AuthModal"
import {
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  HeartIcon,
  GroupIcon as FriendsIcon,
  HomeIcon,
  ChevronDownIcon,
  GlobeIcon,
  PlaneTakeoffIcon,
  StarIcon,
  CameraIcon,
  GemIcon,
  ArrowRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [companions, setCompanions] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
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

  const handleContinue = () => {
    setIsLoading(true)
    
    // Use selected destination or default to Tokyo
    const selectedDestination = destination || "Tokyo"
    
    // Brief delay for button animation
    setTimeout(() => {
      setIsLoading(false)
      // Open auth modal with selected destination
      setIsAuthModalOpen(true)
    }, 300)
  }
  
  // Handle auth modal close
  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false)
  }

  const popularDestinations = [
    { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1038&auto=format&fit=crop" },
    { name: "Santorini", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1287&auto=format&fit=crop" },
    { name: "Tokyo", image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1053&auto=format&fit=crop" },
    { name: "New York", image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=1170&auto=format&fit=crop" }
  ]

  // Features section data
  const features = [
    {
      title: "Cinematic Trip Planning",
      description: "Create beautiful, visual travel itineraries that capture the essence of your journey",
      icon: <CameraIcon className="h-10 w-10 text-indigo-400" />,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1740&auto=format&fit=crop"
    },
    {
      title: "Personalized Experiences",
      description: "Customized recommendations based on your travel style and preferences",
      icon: <GemIcon className="h-10 w-10 text-rose-400" />,
      image: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?q=80&w=1740&auto=format&fit=crop"
    },
    {
      title: "Global Destinations",
      description: "Explore thousands of destinations with curated local insights",
      icon: <GlobeIcon className="h-10 w-10 text-amber-400" />,
      image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1734&auto=format&fit=crop"
    }
  ]
  
  // Testimonials data
  const testimonials = [
    {
      quote: "ItinerAid transformed our honeymoon into a cinematic experience we'll never forget",
      author: "Michael & Sarah",
      destination: "Santorini, Greece",
      avatar: "https://images.unsplash.com/photo-1499080683149-95d99eb1a9c1?q=80&w=1400&auto=format&fit=crop"
    },
    {
      quote: "The personalized recommendations were spot on! Found hidden gems I would've missed",
      author: "Emma L.",
      destination: "Tokyo, Japan",
      avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1374&auto=format&fit=crop"
    },
    {
      quote: "Planning family trips used to be stressful until we found ItinerAid. Now it's fun!",
      author: "Rodriguez Family",
      destination: "Barcelona, Spain",
      avatar: "https://images.unsplash.com/photo-1484712401471-05c7215830eb?q=80&w=1470&auto=format&fit=crop"
    }
  ]
  
  return (
    <div className="flex flex-col text-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 relative">
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
        
        <div className="container-responsive max-w-md mx-auto flex flex-col items-start z-10 fade-in-animation">

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-300"
          >
            {typedText}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gray-300 mb-8 text-xl"
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

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="w-full flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={handleContinue}
              disabled={isLoading}
              className="flex-1 h-14 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-lg text-lg font-medium"
            >
              {isLoading ? "Loading..." : "Begin Your Journey"}
            </Button>
            
            <Link href="/explore" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full h-14 border-zinc-700 hover:bg-zinc-800 rounded-lg text-lg font-medium"
              >
                Explore Destinations
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
        >
          <p className="text-sm">Scroll to discover more</p>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 10 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          >
            <ChevronDownIcon className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-indigo-600/20 text-indigo-400 border-indigo-600/30">OUR FEATURES</Badge>
            <h2 className="text-4xl font-bold mb-4">Reimagine Your Travel Experience</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              ItinerAid combines cinematic visuals with intelligent itinerary planning to 
              create journeys that are as beautiful as they are memorable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800"
              >
                <div className="relative h-48">
                  <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="bg-black/60 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mb-3">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <Button variant="link" className="p-0 h-auto text-indigo-400 flex items-center gap-1">
                    Learn More <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Destinations Section */}
      <section className="py-24 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <Badge className="mb-4 px-3 py-1 bg-rose-600/20 text-rose-400 border-rose-600/30">DESTINATIONS</Badge>
              <h2 className="text-4xl font-bold mb-3">Popular Destinations</h2>
              <p className="text-gray-400 max-w-xl">
                Discover the world's most captivating places, from exotic islands to historic cities
              </p>
            </div>
            <Link href="/explore">
              <Button className="bg-rose-600 hover:bg-rose-700">
                View All Destinations
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-xl h-80 cursor-pointer group"
                onClick={() => {
                  setDestination(destination.name);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Image 
                  src={destination.image} 
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-gray-300 mb-3">Explore iconic landmarks</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-black/30 backdrop-blur-sm border-white/20 hover:bg-black/50"
                  >
                    Plan Your Trip
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 -left-20 h-80 w-80 bg-indigo-600 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 -right-20 h-80 w-80 bg-violet-600 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-amber-600/20 text-amber-400 border-amber-600/30">TESTIMONIALS</Badge>
            <h2 className="text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Real experiences from travelers who transformed their journeys with ItinerAid
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-6 border border-zinc-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden relative">
                    <Image src={testimonial.avatar} alt={testimonial.author} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-indigo-400 text-sm">{testimonial.destination}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-4 px-3 py-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0">START TODAY</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Create Your Cinematic Travel Story?</h2>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of travelers who have transformed their journeys from ordinary trips to extraordinary adventures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleContinue}
                className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-lg font-medium"
              >
                Create Your Itinerary
              </Button>
              <Link href="/about">
                <Button 
                  variant="outline" 
                  className="h-14 px-8 border-zinc-700 hover:bg-zinc-800 text-lg font-medium"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        defaultTab="login"
        destination={destination || "Tokyo"}
      />
    </div>
  )
}
