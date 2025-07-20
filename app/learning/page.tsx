"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, BookOpen, Volume2, CheckCircle, Clock, Star, Users } from "lucide-react"
import Link from "next/link"
import { voiceAssistant } from "@/lib/voice-assistant"

interface LearningModule {
  id: string
  title: string
  description: string
  category: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  completed: boolean
  videoUrl?: string
  audioUrl?: string
  steps: string[]
  tips: string[]
  rating: number
  enrolledUsers: number
}

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const learningModules: LearningModule[] = [
    {
      id: "1",
      title: "Organic Compost Making",
      description: "Learn how to make nutrient-rich compost from farm waste and kitchen scraps",
      category: "Soil Management",
      duration: "15 minutes",
      difficulty: "Beginner",
      progress: 75,
      completed: false,
      steps: [
        "Collect organic waste materials",
        "Layer brown and green materials",
        "Maintain proper moisture levels",
        "Turn the compost regularly",
        "Monitor temperature and pH",
        "Harvest ready compost",
      ],
      tips: [
        "Use 3:1 ratio of brown to green materials",
        "Keep compost moist but not waterlogged",
        "Turn every 2-3 weeks for faster decomposition",
        "Add earthworms to speed up the process",
      ],
      rating: 4.8,
      enrolledUsers: 1250,
    },
    {
      id: "2",
      title: "Natural Pest Control Methods",
      description: "Effective organic methods to control pests without harmful chemicals",
      category: "Pest Management",
      duration: "20 minutes",
      difficulty: "Intermediate",
      progress: 0,
      completed: false,
      steps: [
        "Identify common pests in your area",
        "Prepare neem oil spray solution",
        "Create companion planting strategy",
        "Set up beneficial insect habitats",
        "Apply biological control methods",
        "Monitor and evaluate effectiveness",
      ],
      tips: [
        "Spray neem oil in early morning or evening",
        "Plant marigolds to repel harmful insects",
        "Encourage birds and beneficial insects",
        "Use sticky traps for monitoring",
      ],
      rating: 4.6,
      enrolledUsers: 980,
    },
    {
      id: "3",
      title: "Water Conservation Techniques",
      description: "Smart irrigation and water-saving methods for sustainable farming",
      category: "Water Management",
      duration: "18 minutes",
      difficulty: "Intermediate",
      progress: 100,
      completed: true,
      steps: [
        "Assess your water requirements",
        "Install drip irrigation system",
        "Implement mulching techniques",
        "Create water harvesting structures",
        "Schedule irrigation timing",
        "Monitor soil moisture levels",
      ],
      tips: [
        "Water early morning to reduce evaporation",
        "Use organic mulch to retain moisture",
        "Install rain gauges for better planning",
        "Group plants by water requirements",
      ],
      rating: 4.9,
      enrolledUsers: 1450,
    },
    {
      id: "4",
      title: "Crop Rotation Planning",
      description: "Plan effective crop rotation to maintain soil health and increase yields",
      category: "Crop Management",
      duration: "25 minutes",
      difficulty: "Advanced",
      progress: 30,
      completed: false,
      steps: [
        "Understand crop families and their needs",
        "Plan 3-4 year rotation cycle",
        "Include nitrogen-fixing legumes",
        "Consider market demand and timing",
        "Implement cover crops",
        "Monitor soil health improvements",
      ],
      tips: [
        "Never plant same family crops consecutively",
        "Include deep and shallow rooted crops",
        "Plan for continuous soil cover",
        "Keep detailed records of rotations",
      ],
      rating: 4.7,
      enrolledUsers: 750,
    },
    {
      id: "5",
      title: "Seed Selection and Treatment",
      description: "Choose the right seeds and treat them for better germination and disease resistance",
      category: "Crop Management",
      duration: "12 minutes",
      difficulty: "Beginner",
      progress: 0,
      completed: false,
      steps: [
        "Select certified quality seeds",
        "Test seed viability",
        "Prepare organic seed treatment",
        "Apply fungicide treatment if needed",
        "Store seeds properly",
        "Plan sowing schedule",
      ],
      tips: [
        "Buy seeds from certified dealers only",
        "Test germination rate before sowing",
        "Use turmeric powder for organic treatment",
        "Store in cool, dry place",
      ],
      rating: 4.5,
      enrolledUsers: 1100,
    },
  ]

  const categories = ["all", "Soil Management", "Pest Management", "Water Management", "Crop Management"]

  const filteredModules =
    selectedCategory === "all"
      ? learningModules
      : learningModules.filter((module) => module.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const playAudio = (module: LearningModule) => {
    const userLanguage = localStorage.getItem("app_language") || "english"
    voiceAssistant.setLanguage(userLanguage)

    const content = `Learning module: ${module.title}. ${module.description}. Duration: ${module.duration}. Difficulty: ${module.difficulty}.`
    voiceAssistant.speak(content)
  }

  const startModule = (module: LearningModule) => {
    setSelectedModule(module)
  }

  const completeStep = (stepIndex: number) => {
    if (!selectedModule) return

    // Update progress
    const newProgress = Math.min(100, ((stepIndex + 1) / selectedModule.steps.length) * 100)
    setSelectedModule({
      ...selectedModule,
      progress: newProgress,
      completed: newProgress === 100,
    })
  }

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedModule(null)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Modules
                </Button>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-green-600" />
                  <h1 className="text-xl font-bold text-gray-900">{selectedModule.title}</h1>
                </div>
              </div>
              <Badge className={getDifficultyColor(selectedModule.difficulty)}>{selectedModule.difficulty}</Badge>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Module Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedModule.title}</h2>
                  <p className="text-gray-600">{selectedModule.description}</p>
                </div>
                <Button variant="outline" onClick={() => playAudio(selectedModule)}>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Listen
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(selectedModule.progress)}%</span>
                </div>
                <Progress value={selectedModule.progress} className="h-2" />
              </div>

              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedModule.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{selectedModule.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{selectedModule.enrolledUsers} enrolled</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Learning Steps</CardTitle>
              <CardDescription>Follow these steps to master the technique</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedModule.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index < (selectedModule.progress / 100) * selectedModule.steps.length
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {index < (selectedModule.progress / 100) * selectedModule.steps.length ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`${
                          index < (selectedModule.progress / 100) * selectedModule.steps.length
                            ? "text-gray-900 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {step}
                      </p>
                      {index === Math.floor((selectedModule.progress / 100) * selectedModule.steps.length) && (
                        <Button
                          size="sm"
                          className="mt-2 bg-green-600 hover:bg-green-700"
                          onClick={() => completeStep(index)}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Pro Tips</CardTitle>
              <CardDescription>Expert advice for better results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedModule.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
                <h1 className="text-xl font-bold text-gray-900">Learning Center</h1>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Users className="h-3 w-3 mr-1" />
              AI Tutor
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agricultural Learning Modules</CardTitle>
            <CardDescription>Master farming techniques with step-by-step tutorials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription className="mt-2">{module.description}</CardDescription>
                  </div>
                  {module.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(module.progress)}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>

                  {/* Module Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration}</span>
                    </div>
                    <Badge className={getDifficultyColor(module.difficulty)} variant="secondary">
                      {module.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{module.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{module.enrolledUsers}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button onClick={() => startModule(module)} className="flex-1 bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      {module.progress > 0 ? "Continue" : "Start"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => playAudio(module)}>
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {learningModules.filter((m) => m.completed).length}
                </div>
                <p className="text-sm text-gray-600">Completed Modules</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {learningModules.filter((m) => m.progress > 0 && !m.completed).length}
                </div>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(learningModules.reduce((acc, m) => acc + m.progress, 0) / learningModules.length)}%
                </div>
                <p className="text-sm text-gray-600">Overall Progress</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{categories.length - 1}</div>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
