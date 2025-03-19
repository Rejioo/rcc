"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, ChevronLeft, MapPin, Share2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Sample event data - in a real app, this would come from an API or database
const events = [
  {
    id: 1,
    title: "Mountain Trail Adventure",
    date: "April 15, 2025",
    time: "8:00 AM - 4:00 PM",
    location: "Blue Ridge Mountains",
    address: "123 Mountain Trail, Blue Ridge, GA 30513",
    type: "mountain",
    participants: 45,
    maxParticipants: 75,
    image: "/placeholder.svg?height=400&width=800",
    description:
      "A challenging mountain biking event through scenic trails with varying difficulty levels. This event is perfect for intermediate to advanced riders looking to test their skills on natural terrain. The route includes technical descents, rocky sections, and beautiful forest paths.",
    organizer: "Mountain Biking Association",
    difficulty: "Intermediate to Advanced",
    distance: "25 miles",
    elevation: "2,500 ft",
    requirements: [
      "Mountain bike in good condition",
      "Helmet (mandatory)",
      "Water and snacks",
      "Repair kit",
      "Weather-appropriate clothing",
    ],
    schedule: [
      { time: "7:00 AM", activity: "Check-in opens" },
      { time: "7:45 AM", activity: "Safety briefing" },
      { time: "8:00 AM", activity: "Ride begins" },
      { time: "12:00 PM", activity: "Lunch break at halfway point" },
      { time: "4:00 PM", activity: "Estimated finish time" },
      { time: "5:00 PM", activity: "Awards and social gathering" },
    ],
  },
  {
    id: 2,
    title: "City Night Ride",
    date: "May 2, 2025",
    location: "Downtown Metro",
    type: "road",
    participants: 120,
    image: "/placeholder.svg?height=400&width=800",
    description: "Experience the city lights on this nighttime group ride through the metropolitan area.",
  },
  {
    id: 3,
    title: "Charity Cross-Country",
    date: "June 10, 2025",
    location: "Riverside Park",
    type: "cross",
    participants: 75,
    image: "/placeholder.svg?height=400&width=800",
    description: "A fundraising event featuring cross-country trails to support local environmental initiatives.",
  },
  {
    id: 4,
    title: "Endurance Challenge",
    date: "July 8, 2025",
    location: "Desert Trails",
    type: "endurance",
    participants: 30,
    image: "/placeholder.svg?height=400&width=800",
    description: "Test your limits in this long-distance endurance ride through challenging terrain.",
  },
]

export default function EventPage({ params }) {
  const { toast } = useToast()
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyContact: "",
  })

  // Find the event based on the ID from the URL params
  const event = events.find((e) => e.id === Number.parseInt(params.id)) || events[0]

  const handleRegister = (e) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    toast({
      title: "Registration successful!",
      description: `You've registered for ${event.title}. Check your email for confirmation.`,
    })
    setIsRegistering(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleShare = () => {
    // In a real app, this would use the Web Share API or copy to clipboard
    toast({
      title: "Link copied!",
      description: "Event link has been copied to your clipboard.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Event Details</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="h-[300px] w-full object-cover md:h-[400px]"
              />
            </div>

            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold">{event.title}</h1>
              <div className="mb-4 flex flex-wrap gap-4">
                <div className="flex items-center text-muted-foreground">
                  <CalendarDays className="mr-1 h-5 w-5" />
                  {event.date} {event.time && `• ${event.time}`}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-5 w-5" />
                  {event.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-1 h-5 w-5" />
                  {event.participants} registered
                  {event.maxParticipants && ` / ${event.maxParticipants} max`}
                </div>
              </div>
              <Separator className="my-4" />
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4 space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Description</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  {event.organizer && (
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Organizer</h3>
                      <p className="text-muted-foreground">{event.organizer}</p>
                    </div>
                  )}
                  {(event.difficulty || event.distance || event.elevation) && (
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Ride Details</h3>
                      <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                        {event.difficulty && <li>Difficulty: {event.difficulty}</li>}
                        {event.distance && <li>Distance: {event.distance}</li>}
                        {event.elevation && <li>Elevation Gain: {event.elevation}</li>}
                      </ul>
                    </div>
                  )}
                  {event.address && (
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Location</h3>
                      <p className="text-muted-foreground">{event.address}</p>
                      <div className="mt-2 h-[200px] rounded-md bg-muted">
                        {/* Map would go here in a real application */}
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          Interactive Map
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="requirements" className="mt-4">
                  {event.requirements ? (
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">What to Bring</h3>
                      <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                        {event.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specific requirements listed for this event.</p>
                  )}
                </TabsContent>
                <TabsContent value="schedule" className="mt-4">
                  {event.schedule ? (
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Event Schedule</h3>
                      <div className="space-y-3">
                        {event.schedule.map((item, index) => (
                          <div key={index} className="flex">
                            <div className="w-24 font-medium">{item.time}</div>
                            <div className="flex-1 text-muted-foreground">{item.activity}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Detailed schedule will be provided closer to the event date.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Registration</h3>
                {event.maxParticipants && event.participants >= event.maxParticipants ? (
                  <div className="text-center">
                    <p className="mb-2 text-muted-foreground">This event is fully booked.</p>
                    <Button variant="outline" className="w-full">
                      Join Waitlist
                    </Button>
                  </div>
                ) : (
                  <Dialog open={isRegistering} onOpenChange={setIsRegistering}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Register Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Register for {event.title}</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to secure your spot in this event.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleRegister}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="emergencyContact">Emergency Contact</Label>
                            <Input
                              id="emergencyContact"
                              name="emergencyContact"
                              value={formData.emergencyContact}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Complete Registration</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Event Details</h3>
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{event.time}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium capitalize">{event.type} Biking</span>
                    </div>
                    {event.difficulty && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span className="font-medium">{event.difficulty}</span>
                      </div>
                    )}
                    {event.distance && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Distance:</span>
                        <span className="font-medium">{event.distance}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

