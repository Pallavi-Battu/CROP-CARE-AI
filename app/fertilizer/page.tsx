"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Leaf, Camera, Upload, AlertTriangle, CheckCircle, Volume2, Beaker, Droplets } from "lucide-react"
import Link from "next/link"
import { voiceAssistant } from "@/lib/voice-assistant"

interface NutrientDeficiency {
  nutrient: string
  deficiency: string
  symptoms: string[]
  organicSolutions: string[]
  chemicalSolutions: string[]
  preventionTips: string[]
  severity: "Low" | "Medium" | "High"
  confidence: number
}

export default function FertilizerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [symptoms, setSymptoms] = useState("")
  const [cropType, setCropType] = useState("")
  const [soilType, setSoilType] = useState("")
  const [result, setResult] = useState<NutrientDeficiency | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const mockDeficiencies: NutrientDeficiency[] = [
    {
      nutrient: "Nitrogen (N)",
      deficiency: "Nitrogen Deficiency",
      symptoms: ["Yellowing of older leaves", "Stunted growth", "Pale green color", "Reduced leaf size"],
      organicSolutions: [
        "Apply compost rich in nitrogen",
        "Use green manure (legume crops)",
        "Apply vermicompost",
        "Use neem cake fertilizer",
      ],
      chemicalSolutions: [
        "Urea - 46% N (200-250 kg/hectare)",
        "Ammonium Sulfate - 21% N (300 kg/hectare)",
        "Calcium Ammonium Nitrate - 26% N (250 kg/hectare)",
      ],
      preventionTips: [
        "Regular soil testing",
        "Crop rotation with legumes",
        "Proper organic matter management",
        "Balanced fertilization schedule",
      ],
      severity: "High",
      confidence: 92,
    },
    {
      nutrient: "Phosphorus (P)",
      deficiency: "Phosphorus Deficiency",
      symptoms: ["Purple or reddish leaves", "Delayed flowering", "Poor root development", "Dark green leaves"],
      organicSolutions: [
        "Apply bone meal fertilizer",
        "Use rock phosphate",
        "Apply compost with high P content",
        "Use fish meal fertilizer",
      ],
      chemicalSolutions: [
        "Single Super Phosphate - 16% P2O5 (150-200 kg/hectare)",
        "Triple Super Phosphate - 46% P2O5 (100 kg/hectare)",
        "Diammonium Phosphate - 46% P2O5 (100-150 kg/hectare)",
      ],
      preventionTips: [
        "Maintain soil pH between 6.0-7.0",
        "Regular phosphorus application",
        "Avoid over-liming",
        "Use mycorrhizal inoculants",
      ],
      severity: "Medium",
      confidence: 88,
    },
    {
      nutrient: "Potassium (K)",
      deficiency: "Potassium Deficiency",
      symptoms: ["Brown leaf edges", "Weak stems", "Poor fruit quality", "Increased disease susceptibility"],
      organicSolutions: ["Apply wood ash", "Use banana peel compost", "Apply kelp meal", "Use granite dust"],
      chemicalSolutions: [
        "Muriate of Potash - 60% K2O (100-150 kg/hectare)",
        "Sulfate of Potash - 50% K2O (120 kg/hectare)",
        "Potassium Nitrate - 44% K2O (80-100 kg/hectare)",
      ],
      preventionTips: [
        "Regular potassium application",
        "Maintain adequate soil moisture",
        "Avoid excessive nitrogen",
        "Use balanced NPK fertilizers",
      ],
      severity: "Medium",
      confidence: 85,
    },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = () => {
    if (!selectedImage && !symptoms) return

    setIsAnalyzing(true)

    setTimeout(() => {
      const randomDeficiency = mockDeficiencies[Math.floor(Math.random() * mockDeficiencies.length)]
      setResult(randomDeficiency)
      setIsAnalyzing(false)
    }, 2000)
  }

  const speakResult = () => {
    if (!result) return
    const userLanguage = localStorage.getItem("app_language") || "english"
    voiceAssistant.setLanguage(userLanguage)

    const text = `Nutrient deficiency detected: ${result.deficiency}. Confidence: ${result.confidence} percent. Severity: ${result.severity}.`
    voiceAssistant.speak(text)
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
                <Beaker className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Fertilizer & Nutrient Predictor</h1>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              <Leaf className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!result ? (
          <div className="space-y-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Nutrient Deficiency Analysis</CardTitle>
                <CardDescription>
                  Upload an image or describe symptoms to get fertilizer recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Upload Plant Image (Optional)</Label>
                  {!selectedImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-4">Upload image showing nutrient deficiency symptoms</p>
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Plant symptoms"
                        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-transparent"
                        onClick={() => setSelectedImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                {/* Crop and Soil Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select value={cropType} onValueChange={setCropType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="tomato">Tomato</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="potato">Potato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                        <SelectItem value="black">Black Cotton</SelectItem>
                        <SelectItem value="red">Red Soil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Symptoms Description */}
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Describe Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe what you observe: leaf color changes, growth issues, etc."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!selectedImage && !symptoms)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Beaker className="h-4 w-4 mr-2" />
                      Analyze Nutrient Deficiency
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Common Deficiency Signs */}
            <Card>
              <CardHeader>
                <CardTitle>Common Nutrient Deficiency Signs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Nitrogen (N)</h4>
                    <p className="text-sm text-yellow-700">Yellowing of older leaves, stunted growth</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Phosphorus (P)</h4>
                    <p className="text-sm text-purple-700">Purple/reddish leaves, delayed flowering</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Potassium (K)</h4>
                    <p className="text-sm text-orange-700">Brown leaf edges, weak stems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            {/* Result Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        result.severity === "High"
                          ? "bg-red-100"
                          : result.severity === "Medium"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-6 w-6 ${
                          result.severity === "High"
                            ? "text-red-600"
                            : result.severity === "Medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{result.deficiency}</h2>
                      <p className="text-gray-600">Nutrient: {result.nutrient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        result.severity === "High"
                          ? "destructive"
                          : result.severity === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {result.severity} Severity
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{result.confidence}% confidence</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={speakResult}>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                  <Button variant="outline" onClick={() => setResult(null)}>
                    <Beaker className="h-4 w-4 mr-2" />
                    New Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Symptoms & Solutions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Symptoms Identified</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <span className="text-sm">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Organic Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.organicSolutions.map((solution, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Chemical Solutions & Prevention */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Chemical Fertilizers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.chemicalSolutions.map((solution, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Droplets className="h-4 w-4 text-blue-600 mt-0.5" />
                          <span className="text-sm">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prevention Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.preventionTips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
