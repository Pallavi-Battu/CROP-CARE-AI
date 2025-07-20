"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  Upload,
  ArrowLeft,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Volume2,
  RotateCcw,
  Zap,
  BookOpen,
  History,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Import the voice assistant at the top
import { voiceAssistant } from "@/lib/voice-assistant"

interface ScanResult {
  disease: string
  confidence: number
  severity: "Low" | "Medium" | "High"
  crop: string
  cropImage?: string
  diseaseImage?: string
  symptoms: string[]
  causes: string[]
  organicTreatments: string[]
  chemicalTreatments: string[]
  prevention: string[]
}

export default function ScanPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Add crop selection state
  const [selectedCrop, setSelectedCrop] = useState("")

  // Add crop options with images
  const cropOptions = [
    { value: "tomato", label: "Tomato", image: "/images/crops/tomato-leaf.png" },
    { value: "rice", label: "Rice", image: "/images/crops/rice-plant.png" },
    { value: "cotton", label: "Cotton", image: "/images/crops/cotton-plant.png" },
    { value: "wheat", label: "Wheat", image: "/images/crops/wheat-crop.png" },
    { value: "corn", label: "Corn", image: "/images/crops/corn-plant.png" },
    { value: "potato", label: "Potato", image: "/images/crops/potato-plant.png" },
  ]

  // Update the speakText function
  const speakText = (text: string) => {
    const userLanguage = localStorage.getItem("app_language") || "english"
    voiceAssistant.setLanguage(userLanguage)
    voiceAssistant.speak(text)
  }

  // Update the speakDiseaseResult function
  const speakDiseaseResult = (result: ScanResult) => {
    const userLanguage = localStorage.getItem("app_language") || "english"
    voiceAssistant.setLanguage(userLanguage)
    voiceAssistant.speakDiseaseResult(result.disease, result.crop, result.confidence, result.severity)
  }

  // Update the mockResults to include crop images
  const mockResults: ScanResult[] = [
    {
      disease: "Tomato Late Blight",
      confidence: 94,
      severity: "High",
      crop: "Tomato",
      cropImage: "/images/crops/tomato-leaf.png",
      diseaseImage: "/images/diseases/tomato-blight.png",
      symptoms: ["Dark brown spots on leaves", "White fuzzy growth on leaf undersides", "Rapid leaf yellowing"],
      causes: ["High humidity", "Cool temperatures", "Poor air circulation", "Infected plant debris"],
      organicTreatments: [
        "Apply neem oil spray every 7 days",
        "Use copper-based fungicide",
        "Remove affected leaves immediately",
        "Improve air circulation around plants",
      ],
      chemicalTreatments: [
        "Mancozeb 75% WP - 2g per liter",
        "Metalaxyl + Mancozeb - 2.5g per liter",
        "Copper oxychloride 50% WP - 3g per liter",
      ],
      prevention: [
        "Plant resistant varieties",
        "Ensure proper spacing",
        "Avoid overhead watering",
        "Rotate crops annually",
      ],
    },
    {
      disease: "Rice Blast",
      confidence: 89,
      severity: "Medium",
      crop: "Rice",
      cropImage: "/images/crops/rice-plant.png",
      diseaseImage: "/images/diseases/rice-blast.png",
      symptoms: ["Diamond-shaped lesions", "Gray centers with brown borders", "Leaf yellowing"],
      causes: ["High nitrogen fertilization", "Dense planting", "High humidity", "Temperature fluctuations"],
      organicTreatments: [
        "Apply Trichoderma viride",
        "Use silicon-based fertilizers",
        "Spray garlic extract solution",
        "Apply compost tea",
      ],
      chemicalTreatments: [
        "Tricyclazole 75% WP - 0.6g per liter",
        "Propiconazole 25% EC - 1ml per liter",
        "Isoprothiolane 40% EC - 1.5ml per liter",
      ],
      prevention: [
        "Use certified disease-free seeds",
        "Maintain proper plant spacing",
        "Balanced fertilization",
        "Field sanitation",
      ],
    },
    {
      disease: "Cotton Wilt",
      confidence: 91,
      severity: "High",
      crop: "Cotton",
      cropImage: "/images/crops/cotton-plant.png",
      diseaseImage: "/images/diseases/cotton-wilt.png",
      symptoms: ["Yellowing of leaves", "Wilting of plants", "Vascular browning", "Stunted growth"],
      causes: ["Soil-borne fungus", "Poor drainage", "High soil temperature", "Continuous cotton cultivation"],
      organicTreatments: [
        "Apply Trichoderma harzianum",
        "Use neem cake in soil",
        "Apply bio-compost",
        "Soil solarization",
      ],
      chemicalTreatments: [
        "Carbendazim 50% WP - 2g per liter",
        "Thiophanate methyl - 1g per liter",
        "Propiconazole 25% EC - 1ml per liter",
      ],
      prevention: [
        "Crop rotation with non-host crops",
        "Use resistant varieties",
        "Proper field drainage",
        "Seed treatment before sowing",
      ],
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

  const handleScan = useCallback(() => {
    if (!selectedImage) return

    setIsScanning(true)
    setScanProgress(0)

    // Simulate AI processing with progress
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setScanResult(randomResult)
      setIsScanning(false)

      // Save scan to history
      const existingScans = JSON.parse(localStorage.getItem("disease_scans") || "[]")
      const newScan = {
        ...randomResult,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        image: selectedImage,
      }
      existingScans.unshift(newScan)
      localStorage.setItem("disease_scans", JSON.stringify(existingScans.slice(0, 20))) // Keep last 20 scans

      // Update user scan count
      const userData = JSON.parse(localStorage.getItem("farmer_user") || "{}")
      userData.scansCount = (userData.scansCount || 0) + 1
      localStorage.setItem("farmer_user", JSON.stringify(userData))
    }, 2500)
  }, [selectedImage])

  const resetScan = () => {
    setSelectedImage(null)
    setScanResult(null)
    setScanProgress(0)
    setIsScanning(false)
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
                <Leaf className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Disease Scanner</h1>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!scanResult ? (
          <div className="space-y-6">
            {/* Add crop selection before image upload */}
            <Card>
              <CardHeader>
                <CardTitle>Select Your Crop</CardTitle>
                <CardDescription>Choose the type of crop you want to scan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {cropOptions.map((crop) => (
                    <div
                      key={crop.value}
                      className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all ${
                        selectedCrop === crop.value
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => setSelectedCrop(crop.value)}
                    >
                      <img
                        src={crop.image || "/placeholder.svg"}
                        alt={crop.label}
                        className="w-16 h-16 mx-auto mb-2 rounded-lg object-cover"
                      />
                      <p className="font-medium text-sm">{crop.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Crop Image</CardTitle>
                <CardDescription>
                  Take a clear photo of the affected leaf for accurate disease detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!selectedImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-400 transition-colors">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload or Capture Image</h3>
                      <p className="text-gray-600 mb-4">Choose a clear image of the affected crop leaf</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={selectedImage || "/placeholder.svg"}
                          alt="Selected crop"
                          className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 bg-transparent"
                          onClick={resetScan}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>

                      {isScanning ? (
                        <div className="text-center space-y-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">Analyzing image with AI...</p>
                            <Progress value={scanProgress} className="w-full max-w-md mx-auto" />
                            <p className="text-xs text-gray-500">{scanProgress}% complete</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Button onClick={handleScan} size="lg" className="bg-green-600 hover:bg-green-700">
                            <Zap className="h-5 w-5 mr-2" />
                            Analyze with AI
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle>Photography Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Good Lighting</h4>
                      <p className="text-sm text-gray-600">Take photos in natural daylight</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Clear Focus</h4>
                      <p className="text-sm text-gray-600">Ensure the leaf is in sharp focus</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Fill the Frame</h4>
                      <p className="text-sm text-gray-600">Make the leaf fill most of the image</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Show Symptoms</h4>
                      <p className="text-sm text-gray-600">Include affected areas clearly</p>
                    </div>
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
                        scanResult.severity === "High"
                          ? "bg-red-100"
                          : scanResult.severity === "Medium"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-6 w-6 ${
                          scanResult.severity === "High"
                            ? "text-red-600"
                            : scanResult.severity === "Medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{scanResult.disease}</h2>
                      <p className="text-gray-600">{scanResult.crop} Disease</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        scanResult.severity === "High"
                          ? "destructive"
                          : scanResult.severity === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {scanResult.severity} Risk
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{scanResult.confidence}% confidence</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => speakDiseaseResult(scanResult)}>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                  <Button variant="outline" onClick={resetScan}>
                    <Camera className="h-4 w-4 mr-2" />
                    Scan Another
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Symptoms & Causes */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Symptoms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {scanResult.symptoms.map((symptom, index) => (
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
                    <CardTitle>Causes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {scanResult.causes.map((cause, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <span className="text-sm">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Treatments */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Organic Treatments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {scanResult.organicTreatments.map((treatment, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Chemical Treatments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {scanResult.chemicalTreatments.map((treatment, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-4 h-4 bg-blue-600 rounded-full mt-0.5"></div>
                          <span className="text-sm">{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Prevention */}
            <Card>
              <CardHeader>
                <CardTitle>Prevention Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scanResult.prevention.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push("/diary")} className="bg-blue-600 hover:bg-blue-700">
                <BookOpen className="h-4 w-4 mr-2" />
                Add to Crop Diary
              </Button>
              <Button variant="outline" onClick={() => router.push("/history")}>
                <History className="h-4 w-4 mr-2" />
                View All Scans
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
