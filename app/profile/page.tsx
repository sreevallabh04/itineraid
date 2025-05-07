"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  UserIcon,
  Settings2Icon,
  BellIcon,
  GlobeIcon,
  CameraIcon,
  ChevronLeftIcon,
  LogOutIcon,
  HeartIcon,
  MapPinIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock user data
const userPreferences = {
  notifications: {
    emailNotifications: true,
    tripReminders: true,
    specialOffers: false,
    appUpdates: true,
  },
  travelPreferences: {
    preferredActivities: ["Beach", "Cultural", "Food & Dining", "Nature"],
    favoriteDestinations: ["Japan", "Greece", "Peru"],
    accommodationStyle: ["Boutique Hotels", "Luxury Resorts"],
    currency: "USD",
    language: "English",
  },
  appearance: {
    darkMode: true,
    cinematic: true,
    reducedMotion: false,
  },
}

// Array of available travel activities for selection
const availableActivities = [
  "Beach",
  "Cultural",
  "Food & Dining",
  "Nature",
  "Adventure",
  "Urban",
  "Relaxation",
  "Historical",
  "Wildlife",
  "Photography",
  "Hiking",
  "Nightlife",
]

// Sample edit history for the "Activity" section
const activityHistory = [
  {
    date: "May 2, 2025",
    activity: "Added Tokyo itinerary",
    type: "create",
  },
  {
    date: "April 18, 2025",
    activity: "Updated Bali trip dates",
    type: "update",
  },
  {
    date: "March 30, 2025",
    activity: "Saved 3 new destinations",
    type: "save",
  },
  {
    date: "March 15, 2025",
    activity: "Created account",
    type: "account",
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [selectedActivities, setSelectedActivities] = useState(userPreferences.travelPreferences.preferredActivities)
  const [activeTab, setActiveTab] = useState("account")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  })

  useEffect(() => {
    // Check if user is authenticated using localStorage
    const storedUser = localStorage.getItem("itineraid_user")

    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.isAuthenticated) {
        setUser(userData)
        setFormData({
          name: userData.name || "Traveler",
          email: userData.email || "traveler@example.com",
          bio: userData.bio || "Travel enthusiast seeking memorable experiences around the globe.",
        })
      } else {
        router.push("/")
      }
    } else {
      router.push("/")
    }

    setLoading(false)
  }, [router])

  const handleActivityToggle = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity))
    } else {
      setSelectedActivities([...selectedActivities, activity])
    }
  }

  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    // For now, we'll update localStorage
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
      }
      localStorage.setItem("itineraid_user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      setEditMode(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSignOut = () => {
    // Remove user data from localStorage
    localStorage.removeItem("itineraid_user")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-lg border-b border-zinc-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <ChevronLeftIcon className="h-5 w-5" />
            <h1 className="text-xl font-bold">Profile & Settings</h1>
          </Link>

          <div className="flex items-center gap-3">
            {!editMode ? (
              <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveProfile}>
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 bg-zinc-900">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings2Icon className="h-4 w-4" />
              <span>Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-4">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your personal details and account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-zinc-700">
                      <AvatarImage src={user?.avatar || ""} alt={user?.name} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-600 to-violet-600">
                        {formData.name?.charAt(0) || "T"}
                      </AvatarFallback>
                    </Avatar>
                    {editMode && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        <CameraIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      {editMode ? (
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      ) : (
                        <div className="text-lg font-medium">{formData.name}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {editMode ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      ) : (
                        <div className="text-gray-300">{formData.email}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {editMode ? (
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full rounded-md bg-zinc-800 border-zinc-700 p-3 text-white"
                    />
                  ) : (
                    <div className="text-gray-300">{formData.bio}</div>
                  )}
                </div>

                <Separator className="bg-zinc-800" />

                <div className="pt-2">
                  <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-amber-500 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                    >
                      <HeartIcon className="h-4 w-4 mr-2" />
                      Manage Saved Trips
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-green-500 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                    >
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      View My Itineraries
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-500 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                      onClick={handleSignOut}
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage how you receive notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-400">Receive updates about your trips via email</p>
                  </div>
                  <Switch checked={userPreferences.notifications.emailNotifications} />
                </div>

                <Separator className="bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Trip Reminders</Label>
                    <p className="text-sm text-gray-400">Get reminded before your trips</p>
                  </div>
                  <Switch checked={userPreferences.notifications.tripReminders} />
                </div>

                <Separator className="bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Special Offers</Label>
                    <p className="text-sm text-gray-400">Receive notifications about special travel deals</p>
                  </div>
                  <Switch checked={userPreferences.notifications.specialOffers} />
                </div>

                <Separator className="bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">App Updates</Label>
                    <p className="text-sm text-gray-400">Be notified when new features are available</p>
                  </div>
                  <Switch checked={userPreferences.notifications.appUpdates} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize your travel style and interests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Preferred Activities</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableActivities.map((activity) => (
                      <Badge
                        key={activity}
                        variant="outline"
                        className={`cursor-pointer py-1 px-3 rounded-full ${
                          selectedActivities.includes(activity)
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-zinc-800 border-zinc-700 text-white"
                        }`}
                        onClick={() => handleActivityToggle(activity)}
                      >
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Favorite Destinations</Label>
                  <div className="flex flex-wrap gap-2">
                    {userPreferences.travelPreferences.favoriteDestinations.map((destination) => (
                      <Badge
                        key={destination}
                        className="bg-zinc-800 hover:bg-zinc-700 py-1 px-3 rounded-full"
                      >
                        {destination}
                      </Badge>
                    ))}
                    <Badge
                      variant="outline"
                      className="bg-transparent border-dashed border-zinc-600 hover:bg-zinc-800 py-1 px-3 rounded-full"
                    >
                      + Add Destination
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Preferred Accommodation</Label>
                  <div className="flex flex-wrap gap-2">
                    {userPreferences.travelPreferences.accommodationStyle.map((style) => (
                      <Badge key={style} className="bg-zinc-800 hover:bg-zinc-700 py-1 px-3 rounded-full">
                        {style}
                      </Badge>
                    ))}
                    <Badge
                      variant="outline"
                      className="bg-transparent border-dashed border-zinc-600 hover:bg-zinc-800 py-1 px-3 rounded-full"
                    >
                      + Add Style
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>App Settings</CardTitle>
                <CardDescription className="text-gray-400">Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MoonIcon className="h-5 w-5 text-indigo-400" />
                    <Label className="text-base">Dark Mode</Label>
                  </div>
                  <Switch checked={userPreferences.appearance.darkMode} />
                </div>

                <Separator className="bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CameraIcon className="h-5 w-5 text-indigo-400" />
                    <div>
                      <Label className="text-base">Cinematic Mode</Label>
                      <p className="text-sm text-gray-400">Enable visual effects and animations</p>
                    </div>
                  </div>
                  <Switch checked={userPreferences.appearance.cinematic} />
                </div>

                <Separator className="bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings2Icon className="h-5 w-5 text-indigo-400" />
                    <div>
                      <Label className="text-base">Reduced Motion</Label>
                      <p className="text-sm text-gray-400">Minimize motion effects throughout the app</p>
                    </div>
                  </div>
                  <Switch checked={userPreferences.appearance.reducedMotion} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">Your recent actions and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activityHistory.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-2">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        item.type === "create"
                          ? "bg-green-500/20 text-green-500"
                          : item.type === "update"
                          ? "bg-amber-500/20 text-amber-500"
                          : item.type === "save"
                          ? "bg-indigo-500/20 text-indigo-500"
                          : "bg-gray-500/20 text-gray-500"
                      }`}
                    >
                      {item.type === "create" ? (
                        <MapPinIcon className="h-5 w-5" />
                      ) : item.type === "update" ? (
                        <Settings2Icon className="h-5 w-5" />
                      ) : item.type === "save" ? (
                        <HeartIcon className="h-5 w-5" />
                      ) : (
                        <UserIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.activity}</p>
                      <p className="text-sm text-gray-400">{item.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
                <CardDescription className="text-gray-400">Overview of your activity on Itineraid</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-800 rounded-lg text-center">
                    <p className="text-4xl font-bold text-indigo-400">3</p>
                    <p className="text-sm text-gray-300">Trips Created</p>
                  </div>
                  <div className="p-4 bg-zinc-800 rounded-lg text-center">
                    <p className="text-4xl font-bold text-amber-400">12</p>
                    <p className="text-sm text-gray-300">Destinations Saved</p>
                  </div>
                  <div className="p-4 bg-zinc-800 rounded-lg text-center">
                    <p className="text-4xl font-bold text-green-400">42</p>
                    <p className="text-sm text-gray-300">Days Traveled</p>
                  </div>
                  <div className="p-4 bg-zinc-800 rounded-lg text-center">
                    <p className="text-4xl font-bold text-rose-400">4</p>
                    <p className="text-sm text-gray-300">Countries Visited</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Export Your Data</CardTitle>
                <CardDescription className="text-gray-400">
                  Download your personal data and activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  >
                    Export Travel History
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  >
                    Download Account Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}