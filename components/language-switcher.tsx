"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Globe } from "lucide-react"
import { languages, getLanguageFlag, getLanguageNativeName } from "@/lib/languages"

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("english")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("app_language") || "english"
    setCurrentLanguage(savedLanguage)
  }, [])

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language)
    localStorage.setItem("app_language", language)
    // Reload the page to apply language changes
    window.location.reload()
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Globe className="h-4 w-4 mr-2" />
        English
        <ChevronDown className="h-4 w-4 ml-2" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <span className="mr-2">{getLanguageFlag(currentLanguage)}</span>
          {getLanguageNativeName(currentLanguage)}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(languages).map(([key, language]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleLanguageChange(key)}
            className={`flex items-center gap-2 ${currentLanguage === key ? "bg-accent" : ""}`}
          >
            <span>{language.flag}</span>
            <span>{language.nativeName}</span>
            {currentLanguage === key && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
