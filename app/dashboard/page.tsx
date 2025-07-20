"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  BookOpen,
  History,
  Settings,
  Leaf,
  TrendingUp,
  Calendar,
  Bell,
  Sun,
  CloudRain,
  Thermometer,
  MessageCircle,
  Beaker,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/lib/languages"

interface FarmerUser {
  id: string
  name: string
  phone: string
  village: string
  crops: string
  scansCount: number
  cropsGrown: string[]
  joinDate: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<FarmerUser | null>(null)
  const [recentScans, setRecentScans] = useState<any[]>([])
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const userData = localStorage.getItem("farmer_user")
    if (!userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))

    // Load recent scans from localStorage
    const scans = localStorage.getItem("disease_scans")
    if (scans) {
      setRecentScans(JSON.parse(scans).slice(0, 3))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("farmer_user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>{t("loading")}</p>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      title: t("scanCrop"),
      description: t("diseaseDetectionDesc"),
      icon: <Camera className="h-6 w-6" />,
      href: "/scan",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: t("fertilizerPredictor"),
      description: t("fertilizerPredictorDesc"),
      icon: <Beaker className="h-6 w-6" />,
      href: "/fertilizer",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: t("cropPlanning"),
      description: t("cropPlanningDesc"),
      icon: <Calendar className="h-6 w-6" />,
      href: "/crop-planning",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: t("marketPrices"),
      description: t("marketPricesDesc"),
      icon: <TrendingUp className="h-6 w-6" />,
      href: "/market-prices",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: t("cropDiary"),
      description: "Track farming activities",
      icon: <BookOpen className="h-6 w-6" />,
      href: "/diary",
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      title: t("scanHistory"),
      description: "View past detections",
      icon: <History className="h-6 w-6" />,
      href: "/history",
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      title: t("learningCenter"),
      description: t("learningCenterDesc"),
      icon: <GraduationCap className="h-6 w-6" />,
      href: "/learning",
      color: "bg-teal-500 hover:bg-teal-600",
    },
    {
      title: t("settings"),
      description: "Language & preferences",
      icon: <Settings className="h-6 w-6" />,
      href: "/settings",
      color: "bg-gray-500 hover:bg-gray-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">{t("appName")}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link href="/support">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t("support")}
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {t("logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("welcome")}, {user.name}! 🌾
          </h1>
          <p className="text-gray-600">
            {user.village} • Growing: {user.cropsGrown.join(", ")}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Scans</p>
                  <p className="text-3xl font-bold text-gray-900">{user.scansCount}</p>
                </div>
                <Camera className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Crops Monitored</p>
                  <p className="text-3xl font-bold text-gray-900">{user.cropsGrown.length}</p>
                </div>
                <Leaf className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Health Score</p>
                  <p className="text-3xl font-bold text-gray-900">85%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Days Active</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Access your most used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <div
                        className={`${action.color} text-white p-6 rounded-lg hover:shadow-lg transition-all cursor-pointer`}
                      >
                        <div className="flex items-center space-x-3">
                          {action.icon}
                          <div>
                            <h3 className="font-semibold">{action.title}</h3>
                            <p className="text-sm opacity-90">{action.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Disease Scans</CardTitle>
                <CardDescription>Your latest crop health checks</CardDescription>
              </CardHeader>
              <CardContent>
                {recentScans.length > 0 ? (
                  <div className="space-y-4">
                    {recentScans.map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{scan.disease}</h4>
                            <p className="text-sm text-gray-600">
                              {scan.crop} • {scan.date}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            scan.severity === "High"
                              ? "destructive"
                              : scan.severity === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {t(scan.severity.toLowerCase())}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No scans yet. Start by scanning your first crop!</p>
                    <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => router.push("/scan")}>
                      {t("startScanning")}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Weather & Tips */}
          <div className="space-y-6">
            {/* Weather Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <span>{t("weatherForecast")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{t("temperature")}</span>
                    <div className="flex items-center space-x-1">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      <span className="font-medium">28°C</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{t("humidity")}</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{t("rainfall")}</span>
                    <div className="flex items-center space-x-1">
                      <CloudRain className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">2mm</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Crop Health Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Crop Health Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.cropsGrown.map((crop, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{crop}</span>
                        <span>{85 + index * 5}%</span>
                      </div>
                      <Progress value={85 + index * 5} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    💡 <strong>Early Detection:</strong> Scan your crops in the morning when lighting is optimal for
                    better disease detection accuracy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
