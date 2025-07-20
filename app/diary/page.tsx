"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, BookOpen, Plus, CalendarIcon, Droplets, Sprout, Bug, Scissors, Sun } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface DiaryEntry {
  id: string
  date: string
  crop: string
  activity: string
  description: string
  weather: string
  notes: string
}

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [formData, setFormData] = useState({
    crop: "",
    activity: "",
    description: "",
    weather: "",
    notes: "",
  })

  useEffect(() => {
    const savedEntries = localStorage.getItem("crop_diary")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: format(selectedDate, "yyyy-MM-dd"),
      ...formData,
    }

    const updatedEntries = [newEntry, ...entries]
    setEntries(updatedEntries)
    localStorage.setItem("crop_diary", JSON.stringify(updatedEntries))

    // Reset form
    setFormData({
      crop: "",
      activity: "",
      description: "",
      weather: "",
      notes: "",
    })
    setShowAddForm(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case "watering":
        return <Droplets className="h-4 w-4 text-blue-500" />
      case "planting":
        return <Sprout className="h-4 w-4 text-green-500" />
      case "pesticide":
        return <Bug className="h-4 w-4 text-red-500" />
      case "harvesting":
        return <Scissors className="h-4 w-4 text-orange-500" />
      default:
        return <Sun className="h-4 w-4 text-yellow-500" />
    }
  }

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "watering":
        return "bg-blue-100 text-blue-800"
      case "planting":
        return "bg-green-100 text-green-800"
      case "pesticide":
        return "bg-red-100 text-red-800"
      case "harvesting":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Crop Diary</h1>
              </div>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Entry Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Entry</CardTitle>
              <CardDescription>Record your daily farming activities and observations</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(selectedDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crop">Crop</Label>
                    <Input
                      id="crop"
                      placeholder="e.g., Tomato, Rice, Cotton"
                      value={formData.crop}
                      onChange={(e) => handleInputChange("crop", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity</Label>
                    <Select value={formData.activity} onValueChange={(value) => handleInputChange("activity", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planting">Planting</SelectItem>
                        <SelectItem value="watering">Watering</SelectItem>
                        <SelectItem value="fertilizing">Fertilizing</SelectItem>
                        <SelectItem value="pesticide">Pesticide Application</SelectItem>
                        <SelectItem value="weeding">Weeding</SelectItem>
                        <SelectItem value="harvesting">Harvesting</SelectItem>
                        <SelectItem value="observation">General Observation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weather">Weather</Label>
                    <Select value={formData.weather} onValueChange={(value) => handleInputChange("weather", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select weather" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunny">Sunny</SelectItem>
                        <SelectItem value="cloudy">Cloudy</SelectItem>
                        <SelectItem value="rainy">Rainy</SelectItem>
                        <SelectItem value="windy">Windy</SelectItem>
                        <SelectItem value="humid">Humid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the activity performed..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any observations, issues, or reminders..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Save Entry
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Entries List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recent Entries</h2>
            <Badge variant="secondary">{entries.length} entries</Badge>
          </div>

          {entries.length > 0 ? (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getActivityIcon(entry.activity)}
                        <div>
                          <h3 className="font-semibold text-lg">{entry.crop}</h3>
                          <p className="text-sm text-gray-600">{format(new Date(entry.date), "MMMM d, yyyy")}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getActivityColor(entry.activity)}>{entry.activity}</Badge>
                        <Badge variant="outline">{entry.weather}</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-gray-700">{entry.description}</p>
                      {entry.notes && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <strong>Notes:</strong> {entry.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No diary entries yet</h3>
                <p className="text-gray-600 mb-4">
                  Start recording your farming activities to track your crop progress
                </p>
                <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Entry
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
