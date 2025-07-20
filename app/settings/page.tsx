"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Settings, User, Globe, Volume2, Bell, Shield, Download, Trash2, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { voiceAssistant } from "@/lib/voice-assistant"

interface UserSettings {
  name: string
  phone: string
  email: string
  village: string
  crops: string
  language: string
  voiceEnabled: boolean
  notificationsEnabled: boolean
  offlineMode: boolean
  autoSync: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    name: "",
    phone: "",
    email: "",
    village: "",
    crops: "",
    language: "english",
    voiceEnabled: true,
    notificationsEnabled: true,
    offlineMode: true,
    autoSync: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("farmer_user")
    const appLanguage = localStorage.getItem("app_language")

    if (userData) {
      const user = JSON.parse(userData)
      setSettings({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        village: user.village || "",
        crops: user.crops || "",
        language: appLanguage || user.language || "english",
        voiceEnabled: localStorage.getItem("voice_enabled") !== "false",
        notificationsEnabled: localStorage.getItem("notifications_enabled") !== "false",
        offlineMode: localStorage.getItem("offline_mode") !== "false",
        autoSync: localStorage.getItem("auto_sync") === "true",
      })
    }
  }, [])

  const handleSave = async () => {
    setIsLoading(true)

    // Update user data
    const userData = JSON.parse(localStorage.getItem("farmer_user") || "{}")
    const updatedUser = {
      ...userData,
      name: settings.name,
      phone: settings.phone,
      email: settings.email,
      village: settings.village,
      crops: settings.crops,
      language: settings.language,
    }

    localStorage.setItem("farmer_user", JSON.stringify(updatedUser))
    localStorage.setItem("app_language", settings.language)
    localStorage.setItem("voice_enabled", settings.voiceEnabled.toString())
    localStorage.setItem("notifications_enabled", settings.notificationsEnabled.toString())
    localStorage.setItem("offline_mode", settings.offlineMode.toString())
    localStorage.setItem("auto_sync", settings.autoSync.toString())

    setTimeout(() => {
      setIsLoading(false)
      // Show success message (you could add a toast here)
    }, 1000)
  }

  const handleInputChange = (field: keyof UserSettings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const testVoice = () => {
    voiceAssistant.setLanguage(settings.language)
    voiceAssistant.speakTranslated("voiceTest", settings.language)
  }

  const exportData = () => {
    const userData = localStorage.getItem("farmer_user")
    const scansData = localStorage.getItem("disease_scans")
    const diaryData = localStorage.getItem("crop_diary")

    const exportData = {
      user: userData ? JSON.parse(userData) : null,
      scans: scansData ? JSON.parse(scansData) : [],
      diary: diaryData ? JSON.parse(diaryData) : [],
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cropcare-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.removeItem("disease_scans")
      localStorage.removeItem("crop_diary")
      alert("All scan and diary data has been cleared.")
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
                <Settings className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Update your personal information and farming details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={settings.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Village/Location</Label>
                  <Input
                    id="village"
                    value={settings.village}
                    onChange={(e) => handleInputChange("village", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crops">Crops You Grow</Label>
                <Input
                  id="crops"
                  placeholder="e.g., Rice, Tomato, Cotton"
                  value={settings.crops}
                  onChange={(e) => handleInputChange("crops", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language & Voice Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Language & Voice</span>
              </CardTitle>
              <CardDescription>Configure your preferred language and voice assistance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select value={settings.language} onValueChange={(value) => handleInputChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                    <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                    <SelectItem value="kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Voice Assistance</Label>
                  <p className="text-sm text-gray-600">Enable text-to-speech for disease information</p>
                </div>
                <Switch
                  checked={settings.voiceEnabled}
                  onCheckedChange={(checked) => handleInputChange("voiceEnabled", checked)}
                />
              </div>

              {settings.voiceEnabled && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={testVoice}>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Test Voice
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>App Preferences</span>
              </CardTitle>
              <CardDescription>Customize your app experience and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-600">Receive alerts about weather and crop health</p>
                </div>
                <Switch
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) => handleInputChange("notificationsEnabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Offline Mode</Label>
                  <p className="text-sm text-gray-600">Enable full functionality without internet</p>
                </div>
                <Switch
                  checked={settings.offlineMode}
                  onCheckedChange={(checked) => handleInputChange("offlineMode", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Sync</Label>
                  <p className="text-sm text-gray-600">Automatically sync data when online</p>
                </div>
                <Switch
                  checked={settings.autoSync}
                  onCheckedChange={(checked) => handleInputChange("autoSync", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Data Management</span>
              </CardTitle>
              <CardDescription>Export or clear your app data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={exportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 bg-transparent"
                  onClick={clearAllData}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Export your data for backup or clear all stored information from the app.
              </p>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About CropCare AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Version:</strong> 1.0.0
                </p>
                <p>
                  <strong>Last Updated:</strong> January 2024
                </p>
                <p>
                  <strong>Developer:</strong> CropCare AI Team
                </p>
                <p>
                  <strong>Support:</strong> support@cropcare.ai
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
