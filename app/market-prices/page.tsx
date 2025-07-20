"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, TrendingUp, TrendingDown, MapPin, Calendar, Search, RefreshCw, IndianRupee } from "lucide-react"
import Link from "next/link"

interface MarketPrice {
  crop: string
  variety: string
  market: string
  price: number
  unit: string
  change: number
  changePercent: number
  lastUpdated: string
  trend: "up" | "down" | "stable"
  quality: "Premium" | "Good" | "Average"
}

export default function MarketPricesPage() {
  const [selectedState, setSelectedState] = useState("all")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const mockPrices: MarketPrice[] = [
    {
      crop: "Rice",
      variety: "Basmati",
      market: "Delhi Mandi",
      price: 4500,
      unit: "per quintal",
      change: 150,
      changePercent: 3.4,
      lastUpdated: "2 hours ago",
      trend: "up",
      quality: "Premium",
    },
    {
      crop: "Wheat",
      variety: "HD-2967",
      market: "Ludhiana Mandi",
      price: 2200,
      unit: "per quintal",
      change: -50,
      changePercent: -2.2,
      lastUpdated: "1 hour ago",
      trend: "down",
      quality: "Good",
    },
    {
      crop: "Cotton",
      variety: "Shankar-6",
      market: "Guntur Market",
      price: 6800,
      unit: "per quintal",
      change: 200,
      changePercent: 3.0,
      lastUpdated: "3 hours ago",
      trend: "up",
      quality: "Premium",
    },
    {
      crop: "Tomato",
      variety: "Hybrid",
      market: "Bangalore Market",
      price: 1500,
      unit: "per quintal",
      change: 0,
      changePercent: 0,
      lastUpdated: "30 minutes ago",
      trend: "stable",
      quality: "Good",
    },
    {
      crop: "Onion",
      variety: "Red Onion",
      market: "Nashik Mandi",
      price: 2800,
      unit: "per quintal",
      change: 300,
      changePercent: 12.0,
      lastUpdated: "1 hour ago",
      trend: "up",
      quality: "Good",
    },
    {
      crop: "Sugarcane",
      variety: "Co-86032",
      market: "Muzaffarnagar",
      price: 350,
      unit: "per quintal",
      change: -10,
      changePercent: -2.8,
      lastUpdated: "4 hours ago",
      trend: "down",
      quality: "Average",
    },
  ]

  useEffect(() => {
    // Load initial prices
    setPrices(mockPrices)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Simulate price updates
      const updatedPrices = mockPrices.map((price) => ({
        ...price,
        price: price.price + (Math.random() - 0.5) * 200,
        change: (Math.random() - 0.5) * 300,
        changePercent: (Math.random() - 0.5) * 10,
        lastUpdated: "Just now",
      }))
      setPrices(updatedPrices)
      setIsLoading(false)
    }, 1500)
  }

  const filteredPrices = prices.filter((price) => {
    const matchesSearch =
      price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.market.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCrop = selectedCrop === "all" || price.crop.toLowerCase() === selectedCrop.toLowerCase()
    return matchesSearch && matchesCrop
  })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Premium":
        return "bg-green-100 text-green-800"
      case "Good":
        return "bg-blue-100 text-blue-800"
      case "Average":
        return "bg-yellow-100 text-yellow-800"
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
                <IndianRupee className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Market Prices</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                <Calendar className="h-3 w-3 mr-1" />
                Live Prices
              </Badge>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter Market Prices</CardTitle>
            <CardDescription>Find the best prices for your crops in nearby markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search crop or market..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Type</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="All crops" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crops</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="onion">Onion</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">State/Region</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="haryana">Haryana</SelectItem>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Highest Price</p>
                  <p className="text-2xl font-bold text-green-600">₹6,800</p>
                  <p className="text-xs text-gray-500">Cotton - Guntur</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Trending Up</p>
                  <p className="text-2xl font-bold text-blue-600">4</p>
                  <p className="text-xs text-gray-500">Crops rising</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Markets</p>
                  <p className="text-2xl font-bold text-purple-600">6</p>
                  <p className="text-xs text-gray-500">Active markets</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Updated</p>
                  <p className="text-2xl font-bold text-orange-600">30m</p>
                  <p className="text-xs text-gray-500">Minutes ago</p>
                </div>
                <RefreshCw className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Current Market Prices</h2>
            <Badge variant="outline">{filteredPrices.length} results</Badge>
          </div>

          {filteredPrices.map((price, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <IndianRupee className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{price.crop}</h3>
                      <p className="text-sm text-gray-600">
                        {price.variety} • {price.market}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getQualityColor(price.quality)} variant="secondary">
                          {price.quality}
                        </Badge>
                        <span className="text-xs text-gray-500">{price.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div>
                        <p className="text-2xl font-bold">₹{price.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{price.unit}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        {getTrendIcon(price.trend)}
                        <div className={`text-sm font-medium ${getTrendColor(price.trend)}`}>
                          {price.change > 0 ? "+" : ""}₹{Math.abs(price.change)}
                        </div>
                        <div className={`text-xs ${getTrendColor(price.trend)}`}>
                          ({price.changePercent > 0 ? "+" : ""}
                          {price.changePercent.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPrices.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No prices found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Price Prediction */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Price Trends & Predictions</CardTitle>
            <CardDescription>AI-powered market insights for better selling decisions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">📈 Rising Prices</h4>
                <p className="text-sm text-green-700">
                  Cotton and Onion prices expected to rise by 5-8% next week due to increased demand.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Price Alert</h4>
                <p className="text-sm text-yellow-700">
                  Wheat prices may drop after harvest season. Consider selling current stock.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Best Time to Sell</h4>
                <p className="text-sm text-blue-700">
                  Rice prices are at seasonal high. Good time for farmers to sell their produce.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
