"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  MapPinIcon,
  SearchIcon,
  StarIcon,
  ChevronLeftIcon,
  GlobeIcon,
  HeartIcon,
  UserIcon,
  ThumbsUpIcon,
  CalendarIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for destinations
const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    description: "A tropical paradise with lush landscapes, spiritual retreats, and vibrant coastal culture",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1038&auto=format&fit=crop",
    continent: "Asia",
    rating: 4.8,
    type: ["beach", "cultural", "adventure"],
    bestTimeToVisit: "April to October",
    averageCost: "$40-100/day",
    highlights: ["Rice Terraces", "Temples", "Beaches", "Yoga Retreats"],
    featured: true,
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    description: "Picturesque white-washed buildings with blue domes overlooking the Aegean Sea",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1287&auto=format&fit=crop",
    continent: "Europe",
    rating: 4.9,
    type: ["romantic", "beach", "luxury"],
    bestTimeToVisit: "May to October",
    averageCost: "$100-200/day",
    highlights: ["Oia Sunset", "Caldera Views", "Wine Tasting", "Black Sand Beaches"],
    featured: true,
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    description: "A mesmerizing blend of ultramodern and traditional, where neon cityscapes meet ancient temples",
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1053&auto=format&fit=crop",
    continent: "Asia",
    rating: 4.7,
    type: ["urban", "cultural", "food"],
    bestTimeToVisit: "March to May, September to November",
    averageCost: "$100-200/day",
    highlights: ["Tokyo Skytree", "Shibuya Crossing", "Senso-ji Temple", "Tsukiji Market"],
    featured: true,
  },
  {
    id: 4,
    name: "New York",
    country: "USA",
    description: "The city that never sleeps offers iconic skylines, diverse neighborhoods, and cultural vibrancy",
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=1170&auto=format&fit=crop",
    continent: "North America",
    rating: 4.6,
    type: ["urban", "cultural", "food"],
    bestTimeToVisit: "April to June, September to November",
    averageCost: "$150-300/day",
    highlights: ["Times Square", "Central Park", "Statue of Liberty", "Broadway"],
    featured: true,
  },
  {
    id: 5,
    name: "Marrakech",
    country: "Morocco",
    description: "A sensory feast of colors, scents, and sounds in historic medinas and vibrant markets",
    image: "https://images.unsplash.com/photo-1577048982768-5cb3e7ddfa23?q=80&w=1632&auto=format&fit=crop",
    continent: "Africa",
    rating: 4.5,
    type: ["cultural", "exotic", "history"],
    bestTimeToVisit: "March to May, September to November",
    averageCost: "$30-80/day",
    highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace", "Souks"],
    featured: false,
  },
  {
    id: 6,
    name: "Machu Picchu",
    country: "Peru",
    description: "Ancient Incan citadel set high in the Andes Mountains with spectacular mountain vistas",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1170&auto=format&fit=crop",
    continent: "South America",
    rating: 4.9,
    type: ["adventure", "history", "hiking"],
    bestTimeToVisit: "May to September",
    averageCost: "$60-120/day",
    highlights: ["Inca Trail", "Sun Gate", "Temple of the Sun", "Sacred Valley"],
    featured: false,
  },
  {
    id: 7,
    name: "Kyoto",
    country: "Japan",
    description: "The cultural heart of Japan with over 1,600 Buddhist temples and 400 Shinto shrines",
    image: "https://images.unsplash.com/photo-1593095365764-8dc3da448719?q=80&w=1170&auto=format&fit=crop",
    continent: "Asia",
    rating: 4.8,
    type: ["cultural", "history", "spiritual"],
    bestTimeToVisit: "March to May, October to November",
    averageCost: "$80-150/day",
    highlights: ["Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Kinkaku-ji", "Gion District"],
    featured: false,
  },
  {
    id: 8,
    name: "Maldives",
    country: "Maldives",
    description: "Paradise overwater bungalows on pristine coral atolls with crystal clear turquoise waters",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1365&auto=format&fit=crop",
    continent: "Asia",
    rating: 4.9,
    type: ["luxury", "beach", "romantic"],
    bestTimeToVisit: "November to April",
    averageCost: "$200-500/day",
    highlights: ["Overwater Bungalows", "Coral Reefs", "Snorkeling", "Sunset Cruises"],
    featured: false,
  },
  {
    id: 9,
    name: "Venice",
    country: "Italy",
    description: "Romantic canal city with historic architecture, gondolas, and unique island geography",
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1170&auto=format&fit=crop",
    continent: "Europe",
    rating: 4.7,
    type: ["romantic", "cultural", "history"],
    bestTimeToVisit: "April to June, September to October",
    averageCost: "$120-250/day",
    highlights: ["Grand Canal", "St. Mark's Square", "Doge's Palace", "Gondola Rides"],
    featured: false,
  },
  {
    id: 10,
    name: "Cape Town",
    country: "South Africa",
    description: "Stunning coastal city at the foot of Table Mountain with diverse cultures and landscapes",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1171&auto=format&fit=crop",
    continent: "Africa",
    rating: 4.6,
    type: ["adventure", "urban", "nature"],
    bestTimeToVisit: "October to April",
    averageCost: "$70-150/day",
    highlights: ["Table Mountain", "Cape of Good Hope", "Robben Island", "V&A Waterfront"],
    featured: false,
  },
  {
    id: 11,
    name: "Reykjavik",
    country: "Iceland",
    description: "Gateway to Iceland's otherworldly landscapes of fire and ice, with vibrant cultural scene",
    image: "https://images.unsplash.com/photo-1504284769763-78de1c650894?q=80&w=1170&auto=format&fit=crop",
    continent: "Europe",
    rating: 4.7,
    type: ["adventure", "nature", "winter"],
    bestTimeToVisit: "June to August, February to March (Northern Lights)",
    averageCost: "$150-300/day",
    highlights: ["Northern Lights", "Blue Lagoon", "Golden Circle", "Hallgrímskirkja"],
    featured: false,
  },
  {
    id: 12,
    name: "Cairo",
    country: "Egypt",
    description: "Ancient civilization meets bustling metropolis with the iconic pyramids and rich history",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1170&auto=format&fit=crop",
    continent: "Africa",
    rating: 4.5,
    type: ["history", "cultural", "adventure"],
    bestTimeToVisit: "October to April",
    averageCost: "$30-80/day",
    highlights: ["Pyramids of Giza", "Egyptian Museum", "Khan el-Khalili Bazaar", "Nile River"],
    featured: false,
  },
]

const continents = ["All", "Asia", "Europe", "Africa", "North America", "South America", "Australia"]
const tripTypes = [
  "All Types",
  "beach",
  "adventure",
  "cultural",
  "urban",
  "romantic",
  "luxury",
  "food",
  "history",
  "nature",
]

export default function ExplorePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContinent, setSelectedContinent] = useState("All")
  const [selectedType, setSelectedType] = useState("All Types")
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedDestination, setSelectedDestination] = useState<any>(null)

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
    // Filter destinations based on searchQuery, selectedContinent and selectedType
    let filtered = [...destinations]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) || 
          dest.country.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query)
      )
    }

    if (selectedContinent !== "All") {
      filtered = filtered.filter((dest) => dest.continent === selectedContinent)
    }

    if (selectedType !== "All Types") {
      filtered = filtered.filter((dest) => dest.type.includes(selectedType))
    }

    if (activeTab === "featured") {
      filtered = filtered.filter((dest) => dest.featured)
    }

    setFilteredDestinations(filtered)
  }, [searchQuery, selectedContinent, selectedType, activeTab])

  const handleDestinationClick = (destination: any) => {
    setSelectedDestination(destination)
    // In a full app, this would go to a destination/:id page
    // router.push(`/destination/${destination.id}`)
  }

  const handleSignOut = () => {
    // Remove user data from localStorage
    localStorage.removeItem("itineraid_user")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading destinations...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-lg border-b border-zinc-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <ChevronLeftIcon className="h-5 w-5" />
            <h1 className="text-xl font-bold">Explore Destinations</h1>
          </Link>

          <Avatar className="bg-orange-500 cursor-pointer" onClick={handleSignOut}>
            <AvatarImage src={user?.avatar || ""} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || "T"}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search destinations, countries, or experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white h-12 rounded-lg w-full"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 bg-zinc-900">
              <TabsTrigger value="all">All Destinations</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filter Options */}
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Continent</label>
            <div className="flex flex-wrap gap-2">
              {continents.map((continent) => (
                <Badge
                  key={continent}
                  variant="outline"
                  className={`cursor-pointer py-1 px-3 rounded-full ${
                    selectedContinent === continent
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-zinc-900 border-zinc-800 text-white"
                  }`}
                  onClick={() => setSelectedContinent(continent)}
                >
                  {continent}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Trip Type</label>
            <div className="flex flex-wrap gap-2">
              {tripTypes.map((type) => (
                <Badge
                  key={type}
                  variant="outline"
                  className={`cursor-pointer py-1 px-3 rounded-full ${
                    selectedType === type
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-zinc-900 border-zinc-800 text-white"
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-zinc-900 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleDestinationClick(destination)}
              >
                <div className="relative h-56">
                  <Image src={destination.image} alt={destination.name} fill className="object-cover" />
                  {destination.featured && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                      Featured
                    </Badge>
                  )}
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
                <div className="p-4">
                  <p className="text-gray-300 text-sm line-clamp-2 mb-3">{destination.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {destination.type.slice(0, 3).map((type, index) => (
                      <Badge key={index} variant="outline" className="bg-zinc-800 border-0 text-xs">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <div>Best time: {destination.bestTimeToVisit}</div>
                    <div>{destination.averageCost}</div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <GlobeIcon className="mx-auto h-12 w-12 text-gray-500 mb-3" />
              <h3 className="text-xl font-medium mb-1">No destinations found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </main>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900 rounded-xl overflow-hidden max-w-2xl w-full relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-10 rounded-full bg-black/50 text-white"
                onClick={() => setSelectedDestination(null)}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>

              <div className="relative h-64 sm:h-80">
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

              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="font-bold">{selectedDestination.rating}/5</span>
                    <span className="text-gray-400 text-sm">(2,345 reviews)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-9 w-9 bg-zinc-800 text-rose-400 hover:bg-zinc-700"
                    >
                      <HeartIcon className="h-5 w-5" />
                    </Button>
                    <Button className="rounded-full h-9 px-4 bg-indigo-600 hover:bg-indigo-700">
                      Plan Trip
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-gray-300">{selectedDestination.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Highlights</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDestination.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <ThumbsUpIcon className="h-4 w-4 text-indigo-400" />
                        <span className="text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Best Time To Visit</h3>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-indigo-400" />
                      <span className="text-gray-300">{selectedDestination.bestTimeToVisit}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Average Cost</h3>
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-indigo-400" />
                      <span className="text-gray-300">{selectedDestination.averageCost}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-lg">
                  Create Cinematic Itinerary
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}