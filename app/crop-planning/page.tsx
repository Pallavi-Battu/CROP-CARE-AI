"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, MapPin, Thermometer, Droplets, TrendingUp, Leaf, Sun, CloudRain } from "lucide-react"
import Link from "next/link"

interface CropRecommendation {
  crop: string
  suitability: number
  expectedYield: string
  profitability: "High" | "Medium" | "Low"
  waterRequirement: "Low" | "Medium" | "High"
  growthPeriod: string
  bestPlantingTime: string
  marketDemand: "High" | "Medium" | "Low"
  reasons: string[]
  tips: string[]
}

export default function CropPlanningPage() {
  const [location, setLocation] = useState("")
  const [season, setSeason] = useState("")
  const [soilType, setSoilType] = useState("")
  const [farmSize, setFarmSize] = useState("")
  const [budget, setBudget] = useState("")
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const mockRecommendations: CropRecommendation[] = [
    {
      crop: "Rice",
      suitability: 95,
      expectedYield: "4-5 tons/hectare",
      profitability: "High",
      waterRequirement: "High",
      growthPeriod: "120-150 days",
      bestPlantingTime: "June-July",
      marketDemand: "High",
      reasons: [
        "Ideal monsoon season timing",
        "High market demand in your region",
        "Suitable for clay soil type",
        "Good water availability",
      ],
      tips: [
        "Use certified seeds for better yield",
        "Maintain proper water levels",
        "Apply organic manure before planting",
        "Monitor for pest attacks regularly",
      ],
    },
    {
      crop: "Cotton",
      suitability: 88,
      expectedYield: "15-20 quintals/hectare",
      profitability: "High",
      waterRequirement: "Medium",
      growthPeriod: "180-200 days",
      bestPlantingTime: "May-June",
      marketDemand: "High",
      reasons: [
        "Excellent market prices expected",
        "Suitable climate conditions",
        "Good for black cotton soil",
        "High export demand",
      ],
      tips: [
        "Choose Bt cotton varieties",
        "Ensure proper spacing between plants",
        "Regular monitoring for bollworm",
        "Harvest at right maturity",
      ],
    },
    {
      crop: "Tomato",
      suitability: 82,
      expectedYield: "25-30 tons/hectare",
      profitability: "Medium",
      waterRequirement: "Medium",
      growthPeriod: "90-120 days",
      bestPlantingTime: "July-August",
      marketDemand: "Medium",
      reasons: [
        "Quick returns on investment",
        "Suitable for small farm size",
        "Good local market demand",
        "Multiple harvests possible",
      ],
      tips: [
        "Use drip irrigation for water efficiency",
        "Provide support structures for plants",
        "Regular pruning for better yield",
        "Harvest when fruits are firm",
      ],
    },
  ]

  const handleGetRecommendations = () => {
    if (!location || !season || !soilType) return

    setIsLoading(true)

    setTimeout(() => {
      setRecommendations(mockRecommendations)
      setIsLoading(false)
    }, 2000)
  }

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 90) return "text-green-600"
    if (suitability >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-red-100 text-red-800"
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
                <Calendar className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Season-Based Crop Planning</h1>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Leaf className="h-3 w-3 mr-1" />
              Smart Planning
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {recommendations.length === 0 ? (
          <div className="space-y-6">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Crop Planning Assistant</CardTitle>
                <CardDescription>
                  Get personalized crop recommendations based on your location, season, and farming conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location/State</label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                        <SelectItem value="telangana">Telangana</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="punjab">Punjab</SelectItem>
                        <SelectItem value="haryana">Haryana</SelectItem>
                        <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Season</label>
                    <Select value={season} onValueChange={setSeason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                        <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                        <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Soil Type</label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="black-cotton">Black Cotton Soil</SelectItem>
                        <SelectItem value="red-soil">Red Soil</SelectItem>
                        <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                        <SelectItem value="clay">Clay Soil</SelectItem>
                        <SelectItem value="sandy">Sandy Soil</SelectItem>
                        <SelectItem value="loamy">Loamy Soil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Farm Size</label>
                    <Select value={farmSize} onValueChange={setFarmSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select farm size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (&lt; 2 hectares)</SelectItem>
                        <SelectItem value="medium">Medium (2-10 hectares)</SelectItem>
                        <SelectItem value="large">Large (&gt; 10 hectares)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget Range</label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (&lt; 50,000/hectare)</SelectItem>
                      <SelectItem value="medium">Medium (50,000-1,00,000/hectare)</SelectItem>
                      <SelectItem value="high">High (&gt; 1,00,000/hectare)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGetRecommendations}
                  disabled={isLoading || !location || !season || !soilType}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Get Crop Recommendations
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Current Weather Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <span>Current Weather Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="font-semibold">28°C</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Humidity</p>
                      <p className="font-semibold">65%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CloudRain className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Rainfall</p>
                      <p className="font-semibold">150mm</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Season</p>
                      <p className="font-semibold">Monsoon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Recommendations Results */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Crop Recommendations</h2>
              <Button variant="outline" onClick={() => setRecommendations([])}>
                New Planning
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {recommendations.map((rec, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Leaf className="h-8 w-8 text-green-600" />
                        <div>
                          <CardTitle className="text-xl">{rec.crop}</CardTitle>
                          <CardDescription>Expected Yield: {rec.expectedYield}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getSuitabilityColor(rec.suitability)}`}>
                          {rec.suitability}%
                        </div>
                        <p className="text-sm text-gray-600">Suitability</p>
                      </div>
                    </div>
                    <Progress value={rec.suitability} className="mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <Badge className={getProfitabilityColor(rec.profitability)}>{rec.profitability} Profit</Badge>
                        <p className="text-xs text-gray-600 mt-1">Profitability</p>
                      </div>
                      <div className="text-center">
                        <Badge variant="outline">
                          <Droplets className="h-3 w-3 mr-1" />
                          {rec.waterRequirement} Water
                        </Badge>
                        <p className="text-xs text-gray-600 mt-1">Water Need</p>
                      </div>
                      <div className="text-center">
                        <Badge variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          {rec.growthPeriod}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-1">Growth Period</p>
                      </div>
                      <div className="text-center">
                        <Badge variant="outline">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {rec.marketDemand} Demand
                        </Badge>
                        <p className="text-xs text-gray-600 mt-1">Market Demand</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Why This Crop?</h4>
                        <ul className="space-y-2">
                          {rec.reasons.map((reason, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <span className="text-sm text-gray-700">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Farming Tips</h4>
                        <ul className="space-y-2">
                          {rec.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <span className="text-sm text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Best Planting Time:</strong> {rec.bestPlantingTime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
