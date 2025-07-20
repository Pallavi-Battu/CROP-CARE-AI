"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, History, Search, Filter, Leaf, Calendar, TrendingUp, Eye, Volume2 } from "lucide-react"
import Link from "next/link"

interface ScanHistory {
  id: string
  disease: string
  crop: string
  confidence: number
  severity: "Low" | "Medium" | "High"
  date: string
  image: string
  treated?: boolean
  effectiveness?: "Poor" | "Good" | "Excellent"
}

export default function HistoryPage() {
  const [scans, setScans] = useState<ScanHistory[]>([])
  const [filteredScans, setFilteredScans] = useState<ScanHistory[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCrop, setFilterCrop] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")

  useEffect(() => {
    const savedScans = localStorage.getItem("disease_scans")
    if (savedScans) {
      const parsedScans = JSON.parse(savedScans)
      setScans(parsedScans)
      setFilteredScans(parsedScans)
    }
  }, [])

  useEffect(() => {
    let filtered = scans

    if (searchTerm) {
      filtered = filtered.filter(
        (scan) =>
          scan.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scan.crop.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterCrop !== "all") {
      filtered = filtered.filter((scan) => scan.crop.toLowerCase() === filterCrop.toLowerCase())
    }

    if (filterSeverity !== "all") {
      filtered = filtered.filter((scan) => scan.severity.toLowerCase() === filterSeverity.toLowerCase())
    }

    setFilteredScans(filtered)
  }, [searchTerm, filterCrop, filterSeverity, scans])

  const uniqueCrops = [...new Set(scans.map((scan) => scan.crop))]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const speakScanResult = (scan: ScanHistory) => {
    if ("speechSynthesis" in window) {
      const text = `Disease: ${scan.disease}. Crop: ${scan.crop}. Severity: ${scan.severity}. Confidence: ${scan.confidence} percent. Date: ${scan.date}.`
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
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <History className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Scan History</h1>
              </div>
            </div>
            <Badge variant="secondary">
              {filteredScans.length} of {scans.length} scans
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search disease or crop..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Type</label>
                <Select value={filterCrop} onValueChange={setFilterCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="All crops" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crops</SelectItem>
                    {uniqueCrops.map((crop) => (
                      <SelectItem key={crop} value={crop.toLowerCase()}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Severity</label>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="All severities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        {scans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Scans</p>
                    <p className="text-3xl font-bold text-gray-900">{scans.length}</p>
                  </div>
                  <History className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Risk</p>
                    <p className="text-3xl font-bold text-red-600">
                      {scans.filter((s) => s.severity === "High").length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Crops Monitored</p>
                    <p className="text-3xl font-bold text-green-600">{uniqueCrops.length}</p>
                  </div>
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {Math.round(scans.reduce((acc, scan) => acc + scan.confidence, 0) / scans.length)}%
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Scan Results */}
        <div className="space-y-6">
          {filteredScans.length > 0 ? (
            <div className="space-y-4">
              {filteredScans.map((scan) => (
                <Card key={scan.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={scan.image || "/placeholder.svg"}
                          alt={`${scan.crop} scan`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{scan.disease}</h3>
                            <p className="text-sm text-gray-600">{scan.crop}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getSeverityColor(scan.severity)}>{scan.severity}</Badge>
                            <Badge variant="outline">{scan.confidence}%</Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{scan.date}</span>
                            </div>
                            {scan.treated && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                Treated
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => speakScanResult(scan)}>
                              <Volume2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : scans.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No scan history yet</h3>
                <p className="text-gray-600 mb-4">Start scanning your crops to build your disease detection history</p>
                <Link href="/scan">
                  <Button className="bg-green-600 hover:bg-green-700">Start Scanning</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterCrop("all")
                    setFilterSeverity("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
