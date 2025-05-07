"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { 
  PlaneTakeoffIcon, 
  PlaneLandingIcon, 
  Hotel, 
  UtensilsCrossed,
  Camera,
  MapPinIcon,
  Plus,
  CalendarDaysIcon,
  Share2Icon
} from "lucide-react";

interface TravelEvent {
  title: string;
  type: "flight" | "accommodation" | "activity" | "trip-start" | "trip-end";
  time?: string;
  location?: string;
  description?: string;
  image?: string;
  color?: string;
}

type TravelCalendarEvents = Record<string, TravelEvent[]>;

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [view, setView] = React.useState<"calendar" | "list" | "upcoming">("calendar");
  const [yearMonth, setYearMonth] = React.useState<string>(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`);
  
  // Travel-themed events
  const [events, setEvents] = React.useState<TravelCalendarEvents>({
    "2025-05-10": [
      { 
        title: "Flight to Bali", 
        type: "flight", 
        time: "10:30 AM", 
        location: "JFK → DPS",
        description: "Thai Airways TG745",
        color: "indigo"
      }
    ],
    "2025-05-11": [
      { 
        title: "Check-in: Ubud Jungle Resort", 
        type: "accommodation", 
        time: "2:00 PM", 
        location: "Ubud, Bali",
        description: "Villa with private pool",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1038&auto=format&fit=crop",
        color: "emerald"
      }
    ],
    "2025-05-12": [
      { 
        title: "Sacred Monkey Forest", 
        type: "activity", 
        time: "10:00 AM", 
        location: "Ubud",
        description: "Guided tour of the sanctuary",
        color: "amber"
      },
      { 
        title: "Traditional Balinese Dinner", 
        type: "activity", 
        time: "7:00 PM", 
        location: "Warung Enak",
        description: "Authentic local cuisine",
        color: "rose"
      }
    ],
    "2025-05-15": [
      { 
        title: "Bali Rice Terraces Photography", 
        type: "activity", 
        time: "Sunrise", 
        location: "Tegallalang",
        description: "Bring camera gear and tripod",
        color: "amber"
      }
    ],
    "2025-05-20": [
      { 
        title: "Check-out: Ubud Jungle Resort", 
        type: "accommodation", 
        time: "11:00 AM", 
        location: "Ubud, Bali",
        color: "emerald"
      },
      { 
        title: "Check-in: Beachfront Villa", 
        type: "accommodation", 
        time: "3:00 PM", 
        location: "Seminyak, Bali",
        description: "Ocean view suite",
        image: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?q=80&w=1481&auto=format&fit=crop",
        color: "emerald"
      }
    ],
    "2025-05-25": [
      { 
        title: "Flight to Tokyo", 
        type: "flight", 
        time: "1:45 PM", 
        location: "DPS → NRT",
        description: "Japan Airlines JL726",
        color: "indigo"
      }
    ],
    "2025-05-26": [
      { 
        title: "Tokyo Adventure Begins", 
        type: "trip-start", 
        location: "Tokyo, Japan",
        description: "2 week exploration of Japan",
        image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1053&auto=format&fit=crop",
        color: "violet"
      }
    ],
    "2025-06-10": [
      { 
        title: "Return Flight Home", 
        type: "flight", 
        time: "11:20 AM", 
        location: "NRT → JFK",
        description: "Direct flight, 14hrs",
        color: "indigo"
      }
    ],
    "2025-07-15": [
      { 
        title: "Santorini Summer Trip", 
        type: "trip-start", 
        location: "Santorini, Greece",
        description: "10 days in the Greek Islands",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1287&auto=format&fit=crop",
        color: "sky"
      }
    ],
    "2025-07-25": [
      { 
        title: "Santorini Trip Ends", 
        type: "trip-end", 
        location: "Santorini, Greece",
        color: "sky"
      }
    ],
    "2025-09-03": [
      { 
        title: "New York Autumn Weekend", 
        type: "trip-start", 
        location: "New York, USA",
        description: "Urban photography tour",
        image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=1170&auto=format&fit=crop",
        color: "orange"
      }
    ],
  });

  const getEventsForDate = (selectedDate: Date | undefined): TravelEvent[] => {
    if (!selectedDate) return [];
    const dateString = selectedDate.toISOString().split("T")[0];
    return events[dateString] || [];
  };

  const getTypeIcon = (type: TravelEvent['type']) => {
    switch (type) {
      case 'flight':
        return <PlaneTakeoffIcon className="h-4 w-4" />;
      case 'accommodation':
        return <Hotel className="h-4 w-4" />;
      case 'activity':
        return <Camera className="h-4 w-4" />;
      case 'trip-start':
        return <PlaneLandingIcon className="h-4 w-4" />;
      case 'trip-end':
        return <PlaneTakeoffIcon className="h-4 w-4" />;
      default:
        return <CalendarDaysIcon className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: TravelEvent['type'], color?: string) => {
    const baseClasses = "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ";
    let classes = "";
    
    switch (color) {
      case 'indigo':
        classes = "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
        break;
      case 'emerald':
        classes = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
        break;
      case 'amber':
        classes = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
        break;
      case 'rose':
        classes = "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
        break;
      case 'violet':
        classes = "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400";
        break;
      case 'sky':
        classes = "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400";
        break;
      case 'orange':
        classes = "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
        break;
      default:
        classes = "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
    
    return (
      <span className={baseClasses + classes}>
        {getTypeIcon(type)}
        <span>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</span>
      </span>
    );
  };

  // Get all upcoming trips (trip-start events)
  const upcomingTrips = Object.entries(events)
    .filter(([date, eventsArr]) => {
      const eventDate = new Date(date);
      const today = new Date();
      return eventDate >= today && eventsArr.some(e => e.type === 'trip-start');
    })
    .map(([date, eventsArr]) => {
      const tripEvent = eventsArr.find(e => e.type === 'trip-start');
      return { date, event: tripEvent! };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Get all events for the current month view
  const getAllMonthEvents = () => {
    const [year, month] = yearMonth.split('-').map(Number);
    const allEvents: {date: string; events: TravelEvent[]}[] = [];
    
    Object.entries(events).forEach(([date, eventsArr]) => {
      const eventDate = new Date(date);
      if (eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month) {
        allEvents.push({ date, events: eventsArr });
      }
    });
    
    return allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const selectedDateEvents = getEventsForDate(date);
  const monthEvents = getAllMonthEvents();

  // Get month name for display
  const getMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Travel Calendar</h1>
          <p className="text-muted-foreground">Plan and visualize your adventures across the globe</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Share2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs value={view} className="w-full">
        <TabsContent value="calendar" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Calendar View</CardTitle>
                <Select value={yearMonth} onValueChange={setYearMonth}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={getMonthName(yearMonth)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-05">May 2025</SelectItem>
                    <SelectItem value="2025-06">June 2025</SelectItem>
                    <SelectItem value="2025-07">July 2025</SelectItem>
                    <SelectItem value="2025-08">August 2025</SelectItem>
                    <SelectItem value="2025-09">September 2025</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full"
                  initialFocus
                  modifiers={{
                    booked: Object.keys(events).map(date => new Date(date)),
                  }}
                  modifiersStyles={{
                    booked: { 
                      fontWeight: 'bold',
                      backgroundColor: 'var(--primary-50)',
                      color: 'var(--primary)',
                      border: '2px solid var(--primary)'
                    }
                  }}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Select a date"}
                </CardTitle>
                <CardDescription>
                  {selectedDateEvents.length > 0 
                    ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''} scheduled` 
                    : "No events scheduled"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event, index) => (
                      <div key={index} className="flex gap-4 p-3 bg-secondary/50 rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{event.title}</h4>
                              {event.time && (
                                <p className="text-sm text-muted-foreground">{event.time}</p>
                              )}
                            </div>
                            {getTypeBadge(event.type, event.color)}
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                              <MapPinIcon className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          
                          {event.description && (
                            <p className="text-sm mt-2">{event.description}</p>
                          )}
                          
                          {event.image && (
                            <div className="mt-3 rounded-md overflow-hidden relative h-24">
                              <Image 
                                src={event.image} 
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarDaysIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <p className="mt-2 text-muted-foreground">
                      No travel plans for this day
                    </p>
                    <Button size="sm" variant="outline" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Add Travel Event
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview: {getMonthName(yearMonth)}</CardTitle>
              <CardDescription>All your travel events for this month</CardDescription>
            </CardHeader>
            <CardContent>
              {monthEvents.length > 0 ? (
                <div className="space-y-6">
                  {monthEvents.map(({ date, events }) => (
                    <div key={date} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <h3 className="font-semibold mb-3">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </h3>
                      <div className="space-y-3">
                        {events.map((event, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                            <div className={`flex-shrink-0 mt-1 rounded-full p-2 bg-${event.color || 'gray'}-500/10`}>
                              {getTypeIcon(event.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <h4 className="font-medium">{event.title}</h4>
                                {event.time && (
                                  <Badge variant="outline">{event.time}</Badge>
                                )}
                              </div>
                              
                              {event.location && (
                                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                  <MapPinIcon className="h-3 w-3" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                              
                              {event.description && (
                                <p className="text-sm mt-2">{event.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarDaysIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-lg">No events for {getMonthName(yearMonth)}</p>
                  <p className="text-muted-foreground">Try selecting a different month or add new travel plans</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTrips.length > 0 ? (
              upcomingTrips.map(({ date, event }, index) => (
                <Card key={index} className="overflow-hidden">
                  {event.image && (
                    <div className="relative h-48 w-full">
                      <Image 
                        src={event.image} 
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm">
                          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {event.description && (
                      <p className="text-sm">{event.description}</p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button size="sm">Edit Trip</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <PlaneTakeoffIcon className="mx-auto h-16 w-16 text-muted-foreground opacity-30" />
                <h3 className="mt-4 text-xl font-medium">No upcoming trips</h3>
                <p className="text-muted-foreground mt-1">Time to plan your next adventure!</p>
                <Button className="mt-6">
                  <Plus className="mr-2 h-4 w-4" /> Plan New Trip
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
