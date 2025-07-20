"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Leaf, Camera, Volume2, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demoSteps = [
    {
      title: "Welcome to CropCare AI",
      description: "Experience how our AI-powered crop disease detection works",
      image: "/placeholder.svg?height=300&width=400",
      content:
        "CropCare AI helps farmers detect crop diseases instantly using just a smartphone camera. Let's see how it works!",
    },
    {
      title: "Step 1: Capture Image",
      description: "Take a clear photo of the affected crop leaf",
      image: "/placeholder.svg?height=300&width=400",
      content:
        "Simply point your camera at the affected leaf and take a clear photo. Our AI works best with good lighting and close-up shots.",
    },
    {
      title: "Step 2: AI Analysis",
      description: "Our AI model analyzes the image for disease patterns",
      image: "/placeholder.svg?height=300&width=400",
      content:
        "The AI model, trained on thousands of crop images, analyzes the leaf for disease symptoms, patterns, and severity.",
    },
    {
      title: "Step 3: Disease Detection",
      description: "Get instant results with confidence score",
      image: "/placeholder.svg?height=300&width=400",
      content:
        "In this example, our AI detected 'Tomato Late Blight' with 94% confidence - a serious disease that needs immediate attention.",
    },
    {
      title: "Step 4: Treatment Recommendations",
      description: "Receive organic and chemical treatment options",
      image: "/placeholder.svg?height=300&width=400",
      content:
        "Get detailed treatment recommendations including organic solutions like neem oil and chemical options with proper dosages.",
    },
    {
      title: "Step 5: Voice Assistance",
      description: "Listen to recommendations in your local language",
      image: "/placeholder.svg?height=300&width=400",
      content:
        "All information can be read aloud in Telugu, Hindi, English, and other regional languages for easy understanding.",
    },
  ]

  const startDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsPlaying(false)
      setCurrentStep(0)
    }
  }

  const speakContent = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Play className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Interactive Demo</h1>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Demo Mode</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isPlaying ? (
          /* Demo Introduction */
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Experience CropCare AI</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See how our AI-powered crop disease detection works in real farming scenarios. This interactive demo
                will walk you through the entire process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Camera className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Instant Detection</h3>
                  <p className="text-sm text-gray-600">See how quickly our AI identifies crop diseases from photos</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Volume2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Voice Guidance</h3>
                  <p className="text-sm text-gray-600">
                    Experience multilingual voice assistance for treatment recommendations
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Leaf className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Expert Solutions</h3>
                  <p className="text-sm text-gray-600">Learn about organic and chemical treatment options</p>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" onClick={startDemo} className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
              <Play className="h-5 w-5 mr-2" />
              Start Interactive Demo
            </Button>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This is a demonstration using sample data. For real disease detection, please
                sign up and use the actual scanning feature.
              </p>
            </div>
          </div>
        ) : (
          /* Demo Steps */
          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Demo Progress</span>
                <span>
                  {currentStep + 1} of {demoSteps.length}
                </span>
              </div>
              <Progress value={((currentStep + 1) / demoSteps.length) * 100} className="h-2" />
            </div>

            {/* Current Step */}
            <Card className="overflow-hidden">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{demoSteps[currentStep].title}</CardTitle>
                <CardDescription className="text-lg">{demoSteps[currentStep].description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <img
                    src={demoSteps[currentStep].image || "/placeholder.svg"}
                    alt={demoSteps[currentStep].title}
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{demoSteps[currentStep].content}</p>
                </div>

                {/* Special content for specific steps */}
                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <span className="font-semibold text-red-800">Disease Detected</span>
                        </div>
                        <p className="text-sm text-red-700">Tomato Late Blight</p>
                        <Badge className="mt-2 bg-red-100 text-red-800">High Risk</Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-green-800">Confidence Score</span>
                        </div>
                        <p className="text-sm text-green-700">94% Accuracy</p>
                        <Badge className="mt-2 bg-green-100 text-green-800">High Confidence</Badge>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-700 text-lg">Organic Treatment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Apply neem oil spray every 7 days</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Use copper-based fungicide</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Remove affected leaves immediately</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-blue-700 text-lg">Chemical Treatment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start space-x-2">
                            <div className="w-4 h-4 bg-blue-600 rounded-full mt-0.5"></div>
                            <span>Mancozeb 75% WP - 2g per liter</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-4 h-4 bg-blue-600 rounded-full mt-0.5"></div>
                            <span>Metalaxyl + Mancozeb - 2.5g per liter</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-4 h-4 bg-blue-600 rounded-full mt-0.5"></div>
                            <span>Copper oxychloride 50% WP - 3g per liter</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => speakContent(demoSteps[currentStep].content)}>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen to This Step
                  </Button>

                  <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                    {currentStep < demoSteps.length - 1 ? "Next Step" : "Finish Demo"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Demo completed message */}
            {currentStep === demoSteps.length - 1 && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Demo Complete!</h3>
                  <p className="text-green-700 mb-4">
                    You've experienced how CropCare AI can help protect your crops. Ready to start using it for real?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/signup">
                      <Button className="bg-green-600 hover:bg-green-700">Sign Up Now</Button>
                    </Link>
                    <Button variant="outline" onClick={() => setCurrentStep(0)}>
                      Restart Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
