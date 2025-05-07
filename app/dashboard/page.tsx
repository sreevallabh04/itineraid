"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  CalendarIcon,
  MapPinIcon,
  FileMusicIcon,
  UsersIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

// Type Definitions
interface Activity {
  name: string;
  location: string;
  time: string;
  duration: string;
  pickup: string;
  image: string;
}

interface Accommodation {
  name: string;
  image: string;
  status: "Confirmed" | "Pending";
  rating: number;
  nights: number;
  veryGood: boolean;
  checkIn?: string; 
  checkOut?: string;
}

interface Flight {
  origin: string;
  originFull: string;
  destination: string;
  destinationFull: string;
  airline: string;
  flightNumber: string;
  departure?: string;
}

interface Destination {
  image: string;
  flight: Flight;
  accommodations: Accommodation[];
  activities: Activity[][];
}

type DestinationData = Record<string, Destination>;

interface TripDay {
  date: string;
  day: string;
  dayNum: string;
  month: string;
  activities: Activity[];
}

interface TripData {
  destination: string;
  startDate: string;
  endDate: string;
  duration: string;
  companions: string;
  activities: number; // Total number of activities
  flight: Flight;
  accommodations: Accommodation[];
  days: TripDay[];
}

interface User {
  name?: string;
  email?: string;
  avatar?: string;
  isAuthenticated?: boolean;
  selectedDestination?: string;
}

// Destination data with real images
const destinationData: DestinationData = {
  "Tokyo": {
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop",
    flight: {
      origin: "JFK",
      originFull: "New York, USA",
      destination: "NRT",
      destinationFull: "Narita, Tokyo",
      airline: "Japan Airlines",
      flightNumber: "JL7075",
    },
    accommodations: [
      {
        name: "Shinagawa Prince Hotel",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
        status: "Confirmed",
        rating: 4.9,
        nights: 3,
        veryGood: true,
      },
      {
        name: "Mercure Tokyo Hotel",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
        status: "Pending",
        rating: 4.7,
        nights: 4,
        veryGood: false,
      },
    ],
    activities: [
      [
        {
          name: "Senso-ji Temple & Nakamise Shopping Street",
          location: "Asakusa",
          time: "8:15 AM Morning",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1583116527329-7ea6f9a72b12?q=80&w=1974&auto=format&fit=crop",
        },
        {
          name: "Tokyo Sky Tree",
          location: "Sumida",
          time: "1:00 PM Afternoon",
          duration: "3 hours",
          pickup: "From Nakamise Street",
          image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1936&auto=format&fit=crop",
        },
        {
          name: "Kimono Wearing Experience",
          location: "Ginza",
          time: "Anytime before 8:00 PM",
          duration: "1-2 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Tsukiji Outer Market Tour",
          location: "Tsukiji",
          time: "7:00 AM",
          duration: "2 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1617647652542-132494a3b0c9?q=80&w=1974&auto=format&fit=crop",
        },
        {
          name: "Harajuku & Meiji Shrine",
          location: "Harajuku",
          time: "11:00 AM",
          duration: "4 hours",
          pickup: "From Tsukiji",
          image: "https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Mt. Fuji Day Trip",
          location: "Kawaguchiko",
          time: "7:30 AM",
          duration: "10 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1570459027562-4a916cc6b0a6?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Tokyo Disneyland",
          location: "Urayasu",
          time: "9:00 AM",
          duration: "Full day",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1563347581-9e5ee67336ee?q=80&w=1932&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Akihabara Electronics District",
          location: "Akihabara",
          time: "10:00 AM",
          duration: "4 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop",
        },
        {
          name: "Robot Restaurant Show",
          location: "Shinjuku",
          time: "7:30 PM",
          duration: "2 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1636&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Shinjuku Gyoen National Garden",
          location: "Shinjuku",
          time: "9:00 AM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1561679030-0c5d1e35a1db?q=80&w=1974&auto=format&fit=crop",
        },
        {
          name: "Tokyo Metropolitan Government Building",
          location: "Shinjuku",
          time: "2:00 PM",
          duration: "2 hours",
          pickup: "From Garden",
          image: "https://images.unsplash.com/photo-1569874173757-37abf20fa214?q=80&w=2070&auto=format&fit=crop",
        },
      ],
    ],
  },
  "Bali": {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop",
    flight: {
      origin: "JFK",
      originFull: "New York, USA",
      destination: "DPS",
      destinationFull: "Denpasar, Bali",
      airline: "Singapore Airlines",
      flightNumber: "SQ23",
    },
    accommodations: [
      {
        name: "Four Seasons Resort Bali",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
        status: "Confirmed",
        rating: 4.9,
        nights: 3,
        veryGood: true,
      },
      {
        name: "Ubud Luxury Villas",
        image: "https://images.unsplash.com/photo-1618245318763-453825cd2ffa?q=80&w=1935&auto=format&fit=crop",
        status: "Pending",
        rating: 4.8,
        nights: 4,
        veryGood: true,
      },
    ],
    activities: [
      [
        {
          name: "Tegallalang Rice Terraces",
          location: "Ubud",
          time: "8:30 AM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1531592937781-344ad608fabf?q=80&w=1974&auto=format&fit=crop",
        },
        {
          name: "Sacred Monkey Forest Sanctuary",
          location: "Ubud",
          time: "1:00 PM",
          duration: "2 hours",
          pickup: "From Rice Terraces",
          image: "https://images.unsplash.com/photo-1544651575-59dca5302ace?q=80&w=1964&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Uluwatu Temple Sunset",
          location: "Uluwatu",
          time: "4:00 PM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1533662708914-62223371c448?q=80&w=1974&auto=format&fit=crop",
        },
        {
          name: "Kecak Fire Dance Performance",
          location: "Uluwatu",
          time: "7:00 PM",
          duration: "1 hour",
          pickup: "From Temple",
          image: "https://images.unsplash.com/photo-1518982380512-5a3c6708d544?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Ubud Market Shopping",
          location: "Ubud Center",
          time: "9:00 AM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1588625500633-a0cd518f0f60?q=80&w=1780&auto=format&fit=crop",
        },
        {
          name: "Balinese Cooking Class",
          location: "Ubud",
          time: "2:00 PM",
          duration: "4 hours",
          pickup: "From Market",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Bali Swing & Coffee Plantation",
          location: "Ubud Outskirts",
          time: "10:00 AM",
          duration: "5 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1574781527179-c9297a63a17f?q=80&w=1974&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Waterfall Trek",
          location: "Munduk",
          time: "8:00 AM",
          duration: "Full day",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1592364395653-83e648b22c4a?q=80&w=1974&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Beach Day at Nusa Penida",
          location: "Nusa Penida",
          time: "8:00 AM",
          duration: "Full day",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c76?q=80&w=1974&auto=format&fit=crop",
        },
      ],
    ],
  },
  "Santorini": {
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1974&auto=format&fit=crop",
    flight: {
      origin: "JFK",
      originFull: "New York, USA",
      destination: "JTR",
      destinationFull: "Thira, Santorini",
      airline: "Emirates",
      flightNumber: "EK209",
    },
    accommodations: [
      {
        name: "Oia Collection Suites",
        image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1925&auto=format&fit=crop",
        status: "Confirmed",
        rating: 4.9,
        nights: 4,
        veryGood: true,
      },
      {
        name: "Fira Blue Domes Hotel",
        image: "https://images.unsplash.com/photo-1535983947-1e973dc784c9?q=80&w=1974&auto=format&fit=crop",
        status: "Pending",
        rating: 4.8,
        nights: 3,
        veryGood: true,
      },
    ],
    activities: [
      [
        {
          name: "Oia Sunset Experience",
          location: "Oia",
          time: "6:00 PM",
          duration: "2 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1557632580-001c0e3cccb1?q=80&w=1964&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Caldera Private Boat Tour",
          location: "Fira Port",
          time: "10:00 AM",
          duration: "5 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1556356189-ed780a12ae4a?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Wine Tasting Tour",
          location: "Santo Wines",
          time: "3:00 PM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1535920527002-b35e96722969?q=80&w=1974&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Red Beach Excursion",
          location: "Akrotiri",
          time: "11:00 AM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1504748567181-1f92516cb2e7?q=80&w=1974&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Ancient Thira Visit",
          location: "Kamari",
          time: "9:00 AM",
          duration: "4 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1591254893979-0ae16dbfccdf?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Greek Cooking Class",
          location: "Fira",
          time: "4:00 PM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
        },
      ],
    ],
  },
  "New York": {
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=2070&auto=format&fit=crop",
    flight: {
      origin: "LAX",
      originFull: "Los Angeles, USA",
      destination: "JFK",
      destinationFull: "New York, USA",
      airline: "Delta",
      flightNumber: "DL414",
    },
    accommodations: [
      {
        name: "The Plaza Hotel",
        image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop",
        status: "Confirmed",
        rating: 4.8,
        nights: 3,
        veryGood: true,
      },
      {
        name: "W New York Downtown",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
        status: "Pending",
        rating: 4.7,
        nights: 4,
        veryGood: true,
      },
    ],
    activities: [
      [
        {
          name: "Central Park Bike Tour",
          location: "Central Park",
          time: "9:00 AM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1576487236230-eaacc1173f79?q=80&w=1974&auto=format&fit=crop",
        },
        {
          name: "Metropolitan Museum of Art",
          location: "Upper East Side",
          time: "1:00 PM",
          duration: "4 hours",
          pickup: "From Central Park",
          image: "https://images.unsplash.com/photo-1575468130797-ae159b401c62?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Statue of Liberty & Ellis Island",
          location: "Battery Park",
          time: "9:00 AM",
          duration: "5 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1576450267600-fb5c48dada68?q=80&w=1964&auto=format&fit=crop",
        },
        {
          name: "One World Observatory",
          location: "Financial District",
          time: "3:00 PM",
          duration: "2 hours",
          pickup: "From Ferry Terminal",
          image: "https://images.unsplash.com/photo-1582541233783-dc585c948fcb?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Broadway Show: The Lion King",
          location: "Times Square",
          time: "7:00 PM",
          duration: "2.5 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1536509636250-dfe14a0abb80?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "Brooklyn Bridge Walk",
          location: "Brooklyn Bridge",
          time: "10:00 AM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1570554886111-e9207a0d3759?q=80&w=1974&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "High Line & Chelsea Market",
          location: "Chelsea",
          time: "11:00 AM",
          duration: "4 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1570521462033-3015e76e7432?q=80&w=1967&auto=format&fit=crop",
        },
      ],
      [
        {
          name: "MoMA Visit",
          location: "Midtown",
          time: "1:00 PM",
          duration: "3 hours",
          pickup: "From Hotel",
          image: "https://images.unsplash.com/photo-1591804774178-c1a3d27f963f?q=80&w=2070&auto=format&fit=crop",
        },
      ],
    ],
  },
};

// Generate current dates for trip
const generateTripDates = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 1); // Trip starts tomorrow
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // 7-day trip
  
  // Format dates
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  
  // Get day name
  const getDayName = (date: Date): string => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
  };
  
  // Get month name
  const getMonthName = (date: Date): string => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[date.getMonth()];
  };
  
  // Generate days array for the trip
  const days = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    days.push({
      date: formatDate(currentDate),
      day: getDayName(currentDate),
      dayNum: currentDate.getDate().toString(),
      month: getMonthName(currentDate),
      activities: [], // Will be filled with destination-specific activities
    });
  }
  
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    formattedDeparture: `${formatDate(startDate)}, 10:50 am`,
    days: days,
    duration: "7 Days"
  };
};

// Generate trip data based on selected destination
const generateTripData = (destination: string = "Tokyo"): TripData => {
  const dates = generateTripDates();
  const destData = destinationData[destination] || destinationData["Tokyo"];
  
  // Calculate accommodations with real check-in/out dates
  const accommodations: Accommodation[] = destData.accommodations.map((acc: Accommodation, index: number) => {
    // Calculate check-in date (first day for first accommodation, halfway through for second)
    const checkInDate = new Date();
    checkInDate.setDate(checkInDate.getDate() + 1 + (index === 0 ? 0 : 3));
    
    // Calculate check-out date based on nights
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + acc.nights);
    
    // Format dates with time
    const formatDateTime = (date: Date, isCheckIn: boolean): string => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const time = isCheckIn ? "2:00 pm" : "11:00 am";
      return `${day}.${month}.${year}, ${time}`;
    };
    
    return {
      ...acc,
      checkIn: formatDateTime(checkInDate, true),
      checkOut: formatDateTime(checkOutDate, false)
    };
  });
  
  // Generate days with activities
  const tripDays: TripDay[] = dates.days.map((day, index: number) => {
    // Get activities for this day (cycling through available activities if needed)
    const dayActivities: Activity[] = destData.activities[index % destData.activities.length] || [];
    return {
      ...day,
      activities: dayActivities
    };
  });
  
  return {
    destination: destination.toUpperCase(),
    startDate: dates.startDate,
    endDate: dates.endDate,
    duration: dates.duration,
    companions: "2 (You & Partner)",
    activities: destData.activities.flat().length,
    flight: {
      departure: dates.formattedDeparture,
      ...destData.flight
    },
    accommodations: accommodations,
    days: tripDays
  };
};

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeDay, setActiveDay] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [selectedDestination, setSelectedDestination] = useState("Tokyo")
  const [tripData, setTripData] = useState<TripData | null>(null)

  useEffect(() => {
    // Check if user is authenticated using localStorage
    const storedUser = localStorage.getItem("itineraid_user")

    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.isAuthenticated) {
        setUser(userData)
        
        // Get selected destination from user data if it exists
        if (userData.selectedDestination) {
          setSelectedDestination(userData.selectedDestination)
        }
      } else {
        router.push("/")
      }
    } else {
      router.push("/")
    }
    
    setLoading(false)
    
    // Initialize audio
    if (typeof window !== "undefined") {
      const audioElement = new Audio("/ambient-music.mp3")
      audioElement.loop = true
      setAudio(audioElement)
    }

    return () => {
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [router])

  // Generate trip data based on selected destination
  useEffect(() => {
    if (!loading) {
      setTripData(generateTripData(selectedDestination))
    }
  }, [selectedDestination, loading])

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play().catch((e) => console.log("Audio playback error:", e))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSignOut = () => {
    // Remove user data from localStorage
    localStorage.removeItem("itineraid_user")
    router.push("/")
  }

  const downloadItinerary = async () => {
    const element = document.getElementById("itinerary-content")
    if (element) {
      try {
        const canvas = await html2canvas(element)
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF("p", "mm", "a4")
        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
        pdf.save(`itineraid-${selectedDestination.toLowerCase()}-trip.pdf`)
      } catch (error) {
        console.error("Error generating PDF:", error)
      }
    }
  }

  if (loading || !tripData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading your journey...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-lg border-b border-zinc-800 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Hello {user?.name || "Traveler"}!</h1>
            <p className="text-sm text-gray-400">Ready for your {tripData.destination} adventure?</p>
          </div>

          <Avatar className="bg-gradient-to-tr from-indigo-500 to-purple-600">
            <AvatarImage src={user?.avatar || ""} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || "T"}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6" id="itinerary-content">
        {/* Trip Overview Card */}
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3">Your Upcoming Trip</h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="overflow-hidden rounded-xl border-0 bg-transparent">
              <div className="relative h-48 overflow-hidden rounded-xl">
                <Image 
                  src={destinationData[selectedDestination]?.image || destinationData["Tokyo"].image} 
                  alt={`${selectedDestination} Skyline`} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-md"
                      onClick={downloadItinerary}
                      title="Download itinerary"
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold">{tripData.destination}</h2>
                    <p className="text-sm text-gray-300">
                      {tripData.startDate} - {tripData.endDate}
                    </p>
                    <div className="flex gap-3 mt-3">
                      <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 text-xs">
                        <ClockIcon className="h-3 w-3 text-lime-400" />
                        <span>{tripData.duration}</span>
                        <span className="text-gray-400 text-[10px]">Duration</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 text-xs">
                        <UsersIcon className="h-3 w-3 text-lime-400" />
                        <span>{tripData.companions}</span>
                        <span className="text-gray-400 text-[10px]">Group Size</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 text-xs">
                        <MapPinIcon className="h-3 w-3 text-lime-400" />
                        <span>{tripData.activities}</span>
                        <span className="text-gray-400 text-[10px]">Activities</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Flight Details */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Flight Details</h2>
            <Button variant="link" className="text-xs text-indigo-400 h-auto p-0">
              See all
            </Button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-indigo-600 to-violet-600 border-0 rounded-xl overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm">{tripData.flight.departure}</div>
                  <div className="relative w-24 h-16">
                    <Image 
                      src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
                      alt="Airplane" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-xl font-bold">{tripData.flight.origin}</div>
                    <div className="text-xs text-indigo-200">{tripData.flight.originFull}</div>
                  </div>

                  <div className="flex items-center gap-2 px-2">
                    <div className="h-[2px] w-4 bg-white/50 rounded-full"></div>
                    <ArrowRightIcon className="h-4 w-4" />
                    <div className="h-[2px] w-4 bg-white/50 rounded-full"></div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold">{tripData.flight.destination}</div>
                    <div className="text-xs text-indigo-200">{tripData.flight.destinationFull}</div>
                  </div>
                </div>
                
                <div className="mt-3 pt-2 border-t border-white/10 text-xs">
                  <span className="text-indigo-200">Flight: </span> 
                  <span className="text-white">{tripData.flight.airline} {tripData.flight.flightNumber}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Accommodations */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Accommodation</h2>
            <Button variant="link" className="text-xs text-lime-400 h-auto p-0">
              See all
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {tripData.accommodations.map((accommodation: Accommodation, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-zinc-900 border-0 rounded-xl overflow-hidden h-full">
                  <div className="relative h-24">
                    <Image
                      src={accommodation.image}
                      alt={accommodation.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-sm">
                        {accommodation.veryGood ? "★ Very Good" : "★ Good"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium line-clamp-1">{accommodation.name}</h3>
                    <div className="mt-1 space-y-1">
                      <div className="text-xs text-gray-400">
                        Check in: <span className="text-white">{accommodation.checkIn}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Check out: <span className="text-white">{accommodation.checkOut}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs">{accommodation.nights} Nights</div>
                        <div className="flex items-center">
                          {accommodation.status === "Confirmed" ? (
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircleIcon className="h-4 w-4 text-orange-500" />
                          )}
                          <span className="text-xs ml-1">{accommodation.status}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Activities</h2>
            <Button variant="link" className="text-xs text-lime-400 h-auto p-0">
              See all
            </Button>
          </div>

          <div className="mb-3 flex gap-2">
            <Badge className="bg-lime-500 text-black rounded-full px-3 py-1">Day Plan</Badge>
            <Badge className="bg-zinc-800 text-white rounded-full px-3 py-1">{tripData.activities} Activities</Badge>
          </div>

          {/* Day selector */}
          <div className="overflow-x-auto pb-2 mb-4">
            <div className="flex gap-2 min-w-max">
              {tripData.days.map((day: TripDay, index: number) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`flex flex-col items-center justify-center min-w-[50px] py-1 px-2 rounded-md ${
                    activeDay === index ? "bg-lime-500 text-black" : "bg-zinc-900 text-white"
                  }`}
                >
                  <span className="text-xs font-medium">{day.day}</span>
                  <span className="text-lg font-bold">{day.dayNum}</span>
                  <span className="text-[10px] font-medium">{day.month}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Day activities */}
          <div className="bg-zinc-900 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lime-500 font-medium">Day {activeDay + 1}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{tripData.days[activeDay].date}</span>
              <span className="text-lime-500 ml-auto">🍃 {tripData.days[activeDay].activities.length} Activities</span>
            </div>

            <div className="space-y-4">
              {tripData.days[activeDay].activities.length > 0 ? (
                tripData.days[activeDay].activities.map((activity: Activity, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-black/40 rounded-xl overflow-hidden"
                  >
                    <div className="relative h-32">
                      <Image
                        src={activity.image}
                        alt={activity.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{activity.name}</h3>
                      {activity.location && <p className="text-xs text-gray-400 mt-1">{activity.location}</p>}
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-xs">
                          <span className="text-gray-400 w-16">Timing:</span>
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="text-gray-400 w-16">Duration:</span>
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="text-gray-400 w-16">Pick up:</span>
                          <span>{activity.pickup}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No activities scheduled for this day.</p>
                  <p className="text-sm mt-2">This is a free day to explore on your own!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Bottom navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-800 py-2">
        <div className="max-w-md mx-auto flex justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-1">
            <MapPinIcon className="h-5 w-5 text-lime-500" />
            <span className="text-xs">Trips</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-1"
            onClick={() => router.push("/calendar")}
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="text-xs">Calendar</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-1"
            onClick={toggleMusic}
          >
            <FileMusicIcon className="h-5 w-5" />
            <span className="text-xs">{isPlaying ? "Pause" : "Music"}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-1"
            onClick={() => router.push("/profile")}
          >
            <UsersIcon className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </footer>
    </div>
  )
}
