import Link from "next/link"
import { CalendarDays, Filter, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for events
const events = [
  {
    id: 1,
    title: "Mountain Trail Adventure",
    date: "April 15, 2025",
    location: "Blue Ridge Mountains",
    type: "mountain",
    participants: 45,
    image: "/placeholder.svg?height=200&width=400",
    description: "A challenging mountain biking event through scenic trails with varying difficulty levels.",
  },
  {
    id: 2,
    title: "City Night Ride",
    date: "May 2, 2025",
    location: "Downtown Metro",
    type: "road",
    participants: 120,
    image: "/placeholder.svg?height=200&width=400",
    description: "Experience the city lights on this nighttime group ride through the metropolitan area.",
  },
  {
    id: 3,
    title: "Charity Cross-Country",
    date: "June 10, 2025",
    location: "Riverside Park",
    type: "cross",
    participants: 75,
    image: "/placeholder.svg?height=200&width=400",
    description: "A fundraising event featuring cross-country trails to support local environmental initiatives.",
  },
  {
    id: 4,
    title: "Endurance Challenge",
    date: "July 8, 2025",
    location: "Desert Trails",
    type: "endurance",
    participants: 30,
    image: "/placeholder.svg?height=200&width=400",
    description: "Test your limits in this long-distance endurance ride through challenging terrain.",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">BikeEvents</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/create-event">
              <Button>Create Event</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container py-6">
        <section className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Upcoming Biking Events</h2>
              <p className="text-muted-foreground">Discover and join biking events in your area</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-[300px]">
                <Input placeholder="Search events..." className="pr-10" />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="mountain">Mountain</TabsTrigger>
            <TabsTrigger value="road">Road</TabsTrigger>
            <TabsTrigger value="cross">Cross-Country</TabsTrigger>
            <TabsTrigger value="endurance">Endurance</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
          {["mountain", "road", "cross", "endurance"].map((type) => (
            <TabsContent key={type} value={type} className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {events
                  .filter((event) => event.type === type)
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}

function EventCard({ event }) {
  return (
    <Card className="overflow-hidden">
      <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
      <CardHeader>
        <CardTitle className="line-clamp-1">{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-1 h-4 w-4" />
            {event.date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            {event.participants} participants
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/events/${event.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

