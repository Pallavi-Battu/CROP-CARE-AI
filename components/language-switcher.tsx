"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"
import { languages, getLanguageFlag, getLanguageNativeName } from "@/lib/languages"

interface LanguageSwitcherProps {
  onLanguageChange?: (language: string) => void
  showLabel?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function LanguageSwitcher({
  onLanguageChange,
  showLabel = true,
  variant = "outline",
  size = "default",
}: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState("english")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("app_language") || "english"
    setCurrentLanguage(savedLanguage)
  }, [])

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language)
    localStorage.setItem("app_language", language)

    // Update user preferences if user is logged in
    const userData = localStorage.getItem("farmer_user")
    if (userData) {
      const user = JSON.parse(userData)
      user.language = language
      localStorage.setItem("farmer_user", JSON.stringify(user))
    }

    // Trigger callback if provided
    if (onLanguageChange) {
      onLanguageChange(language)
    }

    // Reload page to apply language changes
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="flex items-center gap-1">
            {getLanguageFlag(currentLanguage)}
            {showLabel && <span className="hidden sm:inline">{getLanguageNativeName(currentLanguage)}</span>}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(languages).map(([key, lang]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleLanguageChange(key)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </div>
            {currentLanguage === key && <Check className="h-4 w-4 text-green-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
