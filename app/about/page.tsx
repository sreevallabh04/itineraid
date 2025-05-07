"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeftIcon,
  GlobeIcon,
  HeartIcon,
  LightbulbIcon,
  MailIcon,
  MapIcon,
  MessageSquareIcon,
  PhoneIcon,
  StarIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Company features
const features = [
  {
    icon: <VideoIcon className="h-6 w-6 text-indigo-400" />,
    title: "Cinematic Experiences",
    description: "Transform ordinary travel plans into cinematic journeys with visually stunning itineraries.",
  },
  {
    icon: <MapIcon className="h-6 w-6 text-rose-400" />,
    title: "Personalized Itineraries",
    description: "Create custom travel plans tailored to your interests, preferences, and travel style.",
  },
  {
    icon: <StarIcon className="h-6 w-6 text-amber-400" />,
    title: "Curated Destinations",
    description: "Discover handpicked destinations with insider recommendations for authentic experiences.",
  },
  {
    icon: <GlobeIcon className="h-6 w-6 text-emerald-400" />,
    title: "Global Coverage",
    description: "Explore thousands of destinations worldwide with detailed information and recommendations.",
  },
]

// Team members
const teamMembers = [
  {
    name: "Sophia Rodriguez",
    role: "Founder & CEO",
    bio: "Former travel photographer with a passion for storytelling through journey experiences.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop",
  },
  {
    name: "Marcus Chen",
    role: "Chief Experience Officer",
    bio: "Cinematographer turned travel tech enthusiast, focused on creating immersive digital experiences.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop",
  },
  {
    name: "Aisha Patel",
    role: "Head of Destination Research",
    bio: "Cultural anthropologist who has visited over 60 countries documenting unique travel experiences.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
  },
  {
    name: "James Wilson",
    role: "Chief Technology Officer",
    bio: "Software engineer with expertise in AI and machine learning for travel recommendation systems.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
  },
]

// Testimonials
const testimonials = [
  {
    quote: "ItinerAid transformed our honeymoon from a standard trip to an unforgettable cinematic adventure through Italy.",
    author: "Michael & Sarah",
    location: "Tokyo, Japan Trip",
    avatar: "https://images.unsplash.com/photo-1499080683149-95d99eb1a9c1?q=80&w=1400&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote: "The personalized recommendations were spot on! I discovered hidden gems I would have never found on my own.",
    author: "Emma L.",
    location: "Bali Solo Journey",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1374&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote: "As a family of four, planning was always stressful until we found ItinerAid. Now travel planning is actually fun!",
    author: "Rodriguez Family",
    location: "Spain Family Adventure",
    avatar: "https://images.unsplash.com/photo-1484712401471-05c7215830eb?q=80&w=1470&auto=format&fit=crop",
    rating: 4,
  },
]

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-lg border-b border-zinc-800 px-4 py-3">
        <div className="container-responsive max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 fade-in-animation">
            <ChevronLeftIcon className="h-5 w-5" />
            <h1 className="text-xl font-bold">About ItinerAid</h1>
          </Link>
        </div>
      </header>

      <main className="container-responsive max-w-5xl mx-auto py-6 slide-up-animation">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="relative h-[40vh] rounded-2xl overflow-hidden mb-8">
            <Image 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop" 
              alt="Cinematic travel landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-bold mb-3 max-w-2xl"
              >
                Transforming Travel into Cinematic Experiences
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl text-gray-300 max-w-2xl"
              >
                Creating personalized journeys that tell your unique story, frame by breathtaking frame.
              </motion.p>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
            <h2 className="text-2xl font-bold mb-5">Our Mission</h2>
            <p className="text-gray-300 mb-5">
              At ItinerAid, we believe travel should be more than just visiting places—it should be an immersive, 
              cinematic experience that tells your unique story. Founded in 2023, our mission is to transform how 
              people plan, experience, and remember their journeys by combining cutting-edge technology with a 
              filmmaker's perspective.
            </p>
            <p className="text-gray-300">
              We're passionate about helping travelers craft personalized adventures that capture the essence of 
              destinations through a cinematic lens. Whether you're seeking the perfect shot for your memories, 
              immersing yourself in local cultures, or simply wanting a seamlessly planned journey, ItinerAid 
              turns your travel dreams into crafted experiences worthy of the silver screen.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <Badge className="mb-2 bg-indigo-600 text-white border-0">Our Features</Badge>
            <h2 className="text-3xl font-bold mb-3">What Makes Us Different</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Our unique approach combines cinematic vision with personalized travel planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-800 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <Badge className="mb-2 bg-rose-600 text-white border-0">Our Team</Badge>
            <h2 className="text-3xl font-bold mb-3">Meet the Visionaries</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              A diverse team of travel enthusiasts, tech innovators, and creative minds
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center"
              >
                <Avatar className="h-20 w-20 mx-auto mb-4 border-2 border-zinc-700">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-indigo-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <Badge className="mb-2 bg-amber-600 text-white border-0">Testimonials</Badge>
            <h2 className="text-3xl font-bold mb-3">What Our Travelers Say</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Real experiences from travelers who turned their journeys into cinematic memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-zinc-700"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-zinc-700">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-10">
          <Card className="bg-gradient-to-br from-indigo-900/50 to-violet-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
              <CardDescription className="text-gray-300">
                Have questions or feedback? We'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-900/50 rounded-full">
                      <MailIcon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-gray-400">hello@itineraid.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-900/50 rounded-full">
                      <PhoneIcon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-900/50 rounded-full">
                      <MessageSquareIcon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-gray-400">Available Mon-Fri, 9am-5pm PST</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 w-full">
                      Start Your Journey
                    </Button>
                  </Link>
                  <p className="text-gray-400 text-sm mt-3 text-center">
                    Begin planning your cinematic travel experience today
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-zinc-800 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400 text-sm">© 2025 ItinerAid. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="ghost" size="sm">Privacy Policy</Button>
            <Button variant="ghost" size="sm">Terms of Service</Button>
            <Button variant="ghost" size="sm">Cookie Policy</Button>
          </div>
        </div>
      </footer>
    </div>
  )
}