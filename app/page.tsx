"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Leaf, Users, Globe, Mic, BookOpen, History, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("farmer_user")
    setIsLoggedIn(!!user)
  }, [])

  const features = [
    {
      icon: <Camera className="h-8 w-8 text-green-600" />,
      title: "AI Disease Detection",
      description: "Take a photo of crop leaves and get instant disease identification with 95% accuracy",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Works Offline",
      description: "Full functionality without internet connection using on-device AI models",
    },
    {
      icon: <Mic className="h-8 w-8 text-purple-600" />,
      title: "Voice Assistant",
      description: "Listen to remedies in Telugu, Hindi, English and other regional languages",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-600" />,
      title: "Crop Diary",
      description: "Track your farming activities, treatments applied, and crop health over time",
    },
    {
      icon: <History className="h-8 w-8 text-red-600" />,
      title: "Treatment History",
      description: "Access your past disease detections and track treatment effectiveness",
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Farmer Community",
      description: "Connect with other farmers and share experiences and solutions",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">CropCare AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <Button onClick={() => router.push("/dashboard")} className="bg-green-600 hover:bg-green-700">
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => router.push("/login")}>
                    Login
                  </Button>
                  <Button onClick={() => router.push("/signup")} className="bg-green-600 hover:bg-green-700">
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            <Smartphone className="h-4 w-4 mr-1" />
            AI-Powered Mobile Agriculture
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Detect Crop Diseases
            <span className="text-green-600 block">Instantly with AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Help farmers identify crop diseases using leaf images, get treatment recommendations in local languages, and
            maintain crop health records - all working offline with voice assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
              onClick={() => router.push(isLoggedIn ? "/scan" : "/signup")}
            >
              <Camera className="h-5 w-5 mr-2" />
              Start Disease Detection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 bg-transparent"
              onClick={() => router.push("/demo")}
            >
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Smart Farming</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to protect your crops and improve your farming practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to protect your crops</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Capture Image</h3>
              <p className="text-gray-600">Take a clear photo of the affected crop leaf using your phone camera</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">
                Our AI model analyzes the image and identifies the disease with high accuracy
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Solutions</h3>
              <p className="text-gray-600">
                Receive treatment recommendations in your local language with voice assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-green-100">Farmers Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-green-100">Crop Types Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-green-100">Languages Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Protect Your Crops?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers who are already using AI to improve their crop health and yields.
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
            onClick={() => router.push("/signup")}
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">CropCare AI</span>
              </div>
              <p className="text-gray-400">
                Empowering farmers with AI-driven crop disease detection and smart farming solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Disease Detection</li>
                <li>Voice Assistant</li>
                <li>Crop Diary</li>
                <li>Offline Mode</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support & Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <strong>Battu Pallavi</strong>
                  <br />
                  <a href="mailto:pallavibattu5@gmail.com" className="text-green-400 hover:text-green-300">
                    pallavibattu5@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Battu Pavani</strong>
                  <br />
                  <a href="mailto:pavanibattu006@gmail.com" className="text-green-400 hover:text-green-300">
                    pavanibattu006@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Languages</h3>
              <ul className="space-y-2 text-gray-400">
                <li>English</li>
                <li>తెలుగు (Telugu)</li>
                <li>हिंदी (Hindi)</li>
                <li>தமிழ் (Tamil)</li>
                <li>मराठी (Marathi)</li>
                <li>ಕನ್ನಡ (Kannada)</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CropCare AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
