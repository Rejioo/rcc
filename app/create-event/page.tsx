"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function CreateEventPage() {
  const { toast } = useToast()
  const [date, setDate] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Event created successfully!",
        description: "Your event has been created and is now live.",
      })
    }, 1500)
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
            <h1 className="text-xl font-bold">Create New Event</h1>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Fill out the form below to create a new biking event. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>

                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="title">
                      Event Title <span className="text-destructive">*</span>
                    </Label>
                    <Input id="title" placeholder="Enter event title" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="type">
                      Event Type <span className="text-destructive">*</span>
                    </Label>
                    <Select required>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mountain">Cruise/Ride</SelectItem>
                        <SelectItem value="road">Meet up</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>
                      Event Date <span className="text-destructive">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                        >
                          {date ? date.toDateString() : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startTime">
                        Start Time <span className="text-destructive">*</span>
                      </Label>
                      <Input id="startTime" type="time" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endTime">
                        End Time <span className="text-destructive">*</span>
                      </Label>
                      <Input id="endTime" type="time" required />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Location Details</h3>

                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="location">
                      Location Name <span className="text-destructive">*</span>
                    </Label>
                    <Input id="location"  required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">
                      Address <span className="text-destructive">*</span>
                    </Label>
                    <Input id="address" placeholder="Full address" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input id="city" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zipCode">
                        Zip Code <span className="text-destructive">*</span>
                      </Label>
                      <Input id="zipCode" required />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Event Details</h3>

                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="description">
                      Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide details about your event"
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Rider level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="maxParticipants">Max Participants</Label>
                      <Input id="maxParticipants" type="number" min="1" placeholder="Unlimited if blank" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="distance">Distance (miles)</Label>
                    <Input id="distance" type="number" min="0" step="0.1" placeholder="Enter distance" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="elevation">Bike CC Class</Label>
                    <Input id="elevation" type="number" min="0" placeholder="Enter bike class" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="List any required equipment or preparations (one per line)"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="image">Event Image</Label>
                    <Input id="image" type="file" accept="image/*" />
                    <p className="text-sm text-muted-foreground">Recommended size: 1200x600px. Max file size: 5MB.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}

