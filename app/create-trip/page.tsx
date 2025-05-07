"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  PlusCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  HeartIcon,
  StarIcon,
  PlusIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  UmbrellaIcon,
  MusicIcon,
  BedDoubleIcon,
  CameraIcon,
  UtensilsIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for destinations
const popularDestinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    description: "A tropical paradise with lush landscapes, spiritual retreats, and vibrant coastal culture",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1038&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    description: "Picturesque white-washed buildings with blue domes overlooking the Aegean Sea",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1287&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    description: "A mesmerizing blend of ultramodern and traditional, where neon cityscapes meet ancient temples",
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1053&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 4,
    name: "New York",
    country: "USA",
    description: "The city that never sleeps offers iconic skylines, diverse neighborhoods, and cultural vibrancy",
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=1170&auto=format&fit=crop",
    rating: 4.6,
  },
]

// Sample activities
const activityCategories = [
  { 
    name: "Sightseeing",
    icon: <CameraIcon className="h-5 w-5" />,
    activities: ["Historical Sites", "Landmarks", "Scenic Views", "Museums"],
  },
  { 
    name: "Dining",
    icon: <UtensilsIcon className="h-5 w-5" />,
    activities: ["Local Cuisine", "Fine Dining", "Street Food", "Cooking Classes"],
  },
  { 
    name: "Entertainment",
    icon: <MusicIcon className="h-5 w-5" />,
    activities: ["Live Shows", "Nightlife", "Concerts", "Cultural Performances"],
  },
  { 
    name: "Relaxation",
    icon: <UmbrellaIcon className="h-5 w-5" />,
    activities: ["Beach Days", "Spa Treatments", "Nature Walks", "Meditation"],
  },
  { 
    name: "Accommodation",
    icon: <BedDoubleIcon className="h-5 w-5" />,
    activities: ["Hotels", "Resorts", "Villas", "Unique Stays"],
  },
]

// Sample weather information
const weatherInfo = [
  { month: "January", icon: <CloudIcon />, temp: "18-24°C", description: "Mild, occasional rain" },
  { month: "February", icon: <CloudIcon />, temp: "18-25°C", description: "Mild, occasional rain" },
  { month: "March", icon: <CloudIcon />, temp: "19-26°C", description: "Warm, less rain" },
  { month: "April", icon: <SunIcon />, temp: "22-28°C", description: "Warm, low precipitation" },
  { month: "May", icon: <SunIcon />, temp: "24-30°C", description: "Hot, dry" },
  { month: "June", icon: <SunIcon />, temp: "26-32°C", description: "Hot, dry" },
  { month: "July", icon: <SunIcon />, temp: "27-33°C", description: "Very hot, dry" },
  { month: "August", icon: <SunIcon />, temp: "27-33°C", description: "Very hot, dry" },
  { month: "September", icon: <SunIcon />, temp: "25-31°C", description: "Hot, dry" },
  { month: "October", icon: <SunIcon />, temp: "22-28°C", description: "Warm, low precipitation" },
  { month: "November", icon: <CloudIcon />, temp: "20-26°C", description: "Mild, some rain" },
  { month: "December", icon: <CloudIcon />, temp: "18-24°C", description: "Mild, occasional rain" },
]

export default function CreateTripPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDestination, setSelectedDestination] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [tripData, setTripData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    travelers: "2",
    budget: 50,
    interests: [] as string[],
    selectedActivities: [] as string[],
  })
  const [activeTab, setActiveTab] = useState("overview")
  const [filteredDestinations, setFilteredDestinations] = useState(popularDestinations)
  const [generatingItinerary, setGeneratingItinerary] = useState(false)

  useEffect(() => {
    // Check if user is authenticated using localStorage
    const storedUser = localStorage.getItem("itineraid_user")

    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.isAuthenticated) {
        setUser(userData)
      } else {
        router.push("/")
      }
    } else {
      router.push("/")
    }

    setLoading(false)
  }, [router])

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      setFilteredDestinations(
        popularDestinations.filter(
          (dest) =>
            dest.name.toLowerCase().includes(query) ||
            dest.country.toLowerCase().includes(query) ||
            dest.description.toLowerCase().includes(query)
        )
      )
    } else {
      setFilteredDestinations(popularDestinations)
    }
  }, [searchQuery])

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDestinationSelect = (destination: any) => {
    setSelectedDestination(destination)
    // Auto-fill trip name based on destination
    setTripData({
      ...tripData,
      name: `Trip to ${destination.name}`,
    })
    handleNextStep()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTripData({
      ...tripData,
      [name]: value,
    })
  }

  const handleSliderChange = (value: number[]) => {
    setTripData({
      ...tripData,
      budget: value[0],
    })
  }

  const toggleInterest = (interest: string) => {
    if (tripData.interests.includes(interest)) {
      setTripData({
        ...tripData,
        interests: tripData.interests.filter((i) => i !== interest),
      })
    } else {
      setTripData({
        ...tripData,
        interests: [...tripData.interests, interest],
      })
    }
  }

  const toggleActivity = (activity: string) => {
    if (tripData.selectedActivities.includes(activity)) {
      setTripData({
        ...tripData,
        selectedActivities: tripData.selectedActivities.filter((a) => a !== activity),
      })
    } else {
      setTripData({
        ...tripData,
        selectedActivities: [...tripData.selectedActivities, activity],
      })
    }
  }

  const handleCreateItinerary = () => {
    setGeneratingItinerary(true)
    // Simulate itinerary generation
    setTimeout(() => {
      // In a real app, we would submit to a backend
      // For now, we'll just navigate to the dashboard
      router.push("/dashboard")
    }, 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  if (generatingItinerary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Creating Your Cinematic Journey</h1>
            <p className="text-gray-400">We're crafting your perfect itinerary for {selectedDestination?.name}</p>
          </motion.div>

          <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
              className="absolute h-full bg-gradient-to-r from-indigo-500 to-purple-600"
            />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <MapPinIcon className="text-indigo-400 h-5 w-5" />
                <h3 className="font-medium">Analyzing best locations in {selectedDestination?.name}</h3>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  className="h-full bg-indigo-500"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <CalendarIcon className="text-purple-400 h-5 w-5" />
                <h3 className="font-medium">
                  Optimizing your {tripData.endDate && tripData.startDate
                    ? `${getTripDuration(tripData.startDate, tripData.endDate)}-day` 
                    : ""} itinerary
                </h3>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 2, delay: 0.6 }}
                  className="h-full bg-purple-500"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <CameraIcon className="text-rose-400 h-5 w-5" />
                <h3 className="font-medium">Adding cinematic experiences</h3>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 2.5, delay: 1 }}
                  className="h-full bg-rose-500"
                />
              </div>
            </motion.div>
          </div>

          <p className="text-center text-gray-400 mt-8">This may take a few moments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-lg border-b border-zinc-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <ChevronLeftIcon className="h-5 w-5" />
            <h1 className="text-xl font-bold">Create Trip</h1>
          </Link>

          <div className="text-sm text-gray-400">Step {currentStep} of 4</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="w-full bg-zinc-900 h-1 mb-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <div className={currentStep >= 1 ? "text-indigo-400" : ""}>Choose Destination</div>
            <div className={currentStep >= 2 ? "text-indigo-400" : ""}>Trip Details</div>
            <div className={currentStep >= 3 ? "text-indigo-400" : ""}>Preferences</div>
            <div className={currentStep >= 4 ? "text-indigo-400" : ""}>Activities</div>
          </div>
        </div>

        {/* Step 1: Destination Selection */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Where would you like to go?</h2>
              <p className="text-gray-400 mb-4">Choose your destination to start crafting your cinematic journey</p>
              
              <div className="relative mb-6">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-900 border-zinc-800 text-white h-12 rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredDestinations.map((destination) => (
                  <motion.div
                    key={destination.id}
                    whileHover={{ y: -5 }}
                    className="bg-zinc-900 rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => handleDestinationSelect(destination)}
                  >
                    <div className="relative h-48">
                      <Image src={destination.image} alt={destination.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-xl font-bold">{destination.name}</h3>
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="h-3 w-3 text-gray-400" />
                              <span className="text-sm text-gray-300">{destination.country}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
                            <StarIcon className="h-3 w-3 text-yellow-400" />
                            <span className="text-sm">{destination.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredDestinations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">No destinations found. Try another search term.</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
              <Button disabled={!selectedDestination} onClick={handleNextStep}>
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Trip Details */}
        {currentStep === 2 && selectedDestination && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/5">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image src={selectedDestination.image} alt={selectedDestination.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-3xl font-bold mb-1">{selectedDestination.name}</h2>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4 text-gray-300" />
                      <span className="text-lg text-gray-300">{selectedDestination.country}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-3/5 space-y-4">
                <div>
                  <Label htmlFor="name">Trip Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={tripData.name}
                    onChange={handleInputChange}
                    className="bg-zinc-900 border-zinc-800 mt-1"
                    placeholder="Give your trip a name"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={tripData.startDate}
                      onChange={handleInputChange}
                      className="bg-zinc-900 border-zinc-800 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={tripData.endDate}
                      onChange={handleInputChange}
                      className="bg-zinc-900 border-zinc-800 mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Select value={tripData.travelers} onValueChange={(value) => setTripData({ ...tripData, travelers: value })}>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 mt-1">
                      <SelectValue placeholder="Select number of travelers" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      <SelectItem value="1">1 (Solo)</SelectItem>
                      <SelectItem value="2">2 (Couple)</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="5+">5+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Budget Range</Label>
                    <span className="text-sm text-gray-400">
                      {tripData.budget < 30 ? "Budget" : tripData.budget < 70 ? "Moderate" : "Luxury"}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    value={[tripData.budget]}
                    onValueChange={handleSliderChange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Budget</span>
                    <span>Moderate</span>
                    <span>Luxury</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Best Time to Visit */}
            <div className="bg-zinc-900 rounded-xl p-4">
              <h3 className="text-lg font-medium mb-3">Best Time to Visit {selectedDestination.name}</h3>
              <div className="overflow-x-auto">
                <div className="flex gap-3 min-w-max pb-2">
                  {weatherInfo.map((month) => (
                    <div
                      key={month.month}
                      className="bg-zinc-800 rounded-lg p-3 w-32 flex flex-col items-center text-center"
                    >
                      <div className="text-gray-400 mb-1">{month.month}</div>
                      <div className="text-indigo-400 my-1">{month.icon}</div>
                      <div className="font-medium">{month.temp}</div>
                      <div className="text-xs text-gray-400 mt-1">{month.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button 
                disabled={!tripData.name || !tripData.startDate || !tripData.endDate}
                onClick={handleNextStep}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && selectedDestination && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Travel Preferences</h2>
              <p className="text-gray-400 mb-4">Customize your travel experience in {selectedDestination.name}</p>
              
              <div className="bg-zinc-900 rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">What interests you about this destination?</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Cultural Experience", "Local Cuisine", "Nature & Outdoors", "Photography", 
                      "Architecture", "Historical Sites", "Relaxation", "Adventure", "Shopping",
                      "Nightlife", "Art & Museums", "Local Festivals"].map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className={`cursor-pointer py-1 px-3 rounded-full ${
                          tripData.interests.includes(interest)
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-zinc-800 border-zinc-700 text-white"
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Travel Pace Preference</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Relaxed</span>
                      <span>Balanced</span>
                      <span>Active</span>
                    </div>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      className="my-4"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Dining Preferences</h3>
                  <Select>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select dining preferences" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      <SelectItem value="authentic">Local Authentic Cuisine</SelectItem>
                      <SelectItem value="various">Variety of Options</SelectItem>
                      <SelectItem value="familiar">Familiar International Dishes</SelectItem>
                      <SelectItem value="fine">Fine Dining Experiences</SelectItem>
                      <SelectItem value="street">Street Food Adventures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Accommodation Preferences</h3>
                  <Select>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select accommodation style" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      <SelectItem value="hotel">Standard Hotels</SelectItem>
                      <SelectItem value="boutique">Boutique Hotels</SelectItem>
                      <SelectItem value="luxury">Luxury Resorts</SelectItem>
                      <SelectItem value="local">Local Guesthouses</SelectItem>
                      <SelectItem value="unique">Unique Stays</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Activities */}
        {currentStep === 4 && selectedDestination && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose Your Activities</h2>
              <p className="text-gray-400 mb-4">Select activities to include in your itinerary</p>
              
              <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid grid-cols-5 bg-zinc-900">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="sightseeing">Sightseeing</TabsTrigger>
                  <TabsTrigger value="dining">Dining</TabsTrigger>
                  <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
                  <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-6">
                  {activityCategories.map((category) => (
                    <div key={category.name} className="bg-zinc-900 rounded-xl p-4">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        {category.icon}
                        {category.name}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.activities.map((activity) => (
                          <div
                            key={activity}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                              tripData.selectedActivities.includes(activity)
                                ? "bg-indigo-600/20 border border-indigo-500"
                                : "bg-zinc-800 border border-zinc-700"
                            }`}
                            onClick={() => toggleActivity(activity)}
                          >
                            <span>{activity}</span>
                            {tripData.selectedActivities.includes(activity) ? (
                              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
                                <CheckIcon className="h-4 w-4 text-white" />
                              </div>
                            ) : (
                              <div className="h-6 w-6 rounded-full border border-gray-500"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                {/* Add content for other tabs as needed */}
              </Tabs>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button 
                onClick={handleCreateItinerary}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
              >
                Create Cinematic Itinerary
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

// Calculate trip duration in days
const getTripDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end days
}

// Placeholder CheckIcon component
function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}