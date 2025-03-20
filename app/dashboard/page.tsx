"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, ChevronLeft, Edit, MapPin, MoreHorizontal, Plus, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Sample data for events
const myEvents = [
  {
    id: 1,
    title: "Mountain Trail Adventure",
    date: "April 15, 2025",
    location: "Blue Ridge Mountains",
    type: "mountain",
    participants: 45,
    maxParticipants: 75,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "City Night Ride",
    date: "May 2, 2025",
    location: "Downtown Metro",
    type: "road",
    participants: 120,
    maxParticipants: 150,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Weekend Trail Exploration",
    date: "March 10, 2025",
    location: "Forest Park",
    type: "mountain",
    participants: 28,
    maxParticipants: 30,
    status: "past",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const registeredEvents = [
  {
    id: 4,
    title: "Charity Cross-Country",
    date: "June 10, 2025",
    location: "Riverside Park",
    type: "cross",
    participants: 75,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Endurance Challenge",
    date: "July 8, 2025",
    location: "Desert Trails",
    type: "endurance",
    participants: 30,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function DashboardPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState(myEvents)
  const [deleteEventId, setDeleteEventId] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== deleteEventId))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Event deleted",
      description: "The event has been successfully deleted.",
    })
  }

  const openDeleteDialog = (id) => {
    setDeleteEventId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleCancelRegistration = (id) => {
    toast({
      title: "Registration cancelled",
      description: "Your registration has been cancelled.",
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
            <h1 className="text-xl font-bold">My Dashboard</h1>
          </div>
          <Link href="/create-event">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-6">
        <Tabs defaultValue="myEvents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="myEvents">My Events</TabsTrigger>
            <TabsTrigger value="registered">Registered Events</TabsTrigger>
          </TabsList>

          <TabsContent value="myEvents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Events I'm Organizing</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events
                .filter((event) => event.status === "upcoming")
                .map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="h-48 w-full object-cover"
                    />
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="line-clamp-1 text-lg">{event.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/events/${event.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/edit-event/${event.id}`}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Event
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => openDeleteDialog(event.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
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
                          {event.participants} / {event.maxParticipants} participants
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/events/${event.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          Manage Event
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
            </div>

            {events.filter((event) => event.status === "past").length > 0 && (
              <>
                <h3 className="mt-8 text-xl font-semibold">Past Events</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {events
                    .filter((event) => event.status === "past")
                    .map((event) => (
                      <Card key={event.id} className="overflow-hidden opacity-80">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="h-48 w-full object-cover"
                        />
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="line-clamp-1 text-lg">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
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
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Link href={`/events/${event.id}`} className="w-full">
                            <Button variant="outline" className="w-full">
                              View Summary
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="registered" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Events I'm Attending</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {registeredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="line-clamp-1 text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
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
                  </CardContent>
                  <CardFooter className="p-4 pt-0 gap-2">
                    <Link href={`/events/${event.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleCancelRegistration(event.id)}
                    >
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

