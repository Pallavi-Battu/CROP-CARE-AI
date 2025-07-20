import { getLanguageCode, getTranslation } from "./languages"

export class VoiceAssistant {
  private currentLanguage = "english"

  constructor(language = "english") {
    this.currentLanguage = language
  }

  setLanguage(language: string) {
    this.currentLanguage = language
  }

  speak(text: string, language?: string) {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported")
      return
    }

    const langToUse = language || this.currentLanguage
    const languageCode = getLanguageCode(langToUse)

    // Stop any ongoing speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = languageCode
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 1

    // Try to find a voice for the specific language
    const voices = speechSynthesis.getVoices()
    const voice = voices.find((v) => v.lang.startsWith(languageCode.split("-")[0]))
    if (voice) {
      utterance.voice = voice
    }

    speechSynthesis.speak(utterance)
  }

  speakTranslated(key: string, language?: string) {
    const langToUse = language || this.currentLanguage
    const text = getTranslation(langToUse, key)
    this.speak(text, langToUse)
  }

  speakDiseaseResult(disease: string, crop: string, confidence: number, severity: string, language?: string) {
    const langToUse = language || this.currentLanguage

    const messages = {
      english: `Disease detected: ${disease}. Crop: ${crop}. Severity: ${severity}. Confidence: ${confidence} percent.`,
      telugu: `వ్యాధి గుర్తించబడింది: ${disease}. పంట: ${crop}. తీవ్రత: ${severity}. విశ్వాసం: ${confidence} శాతం.`,
      hindi: `बीमारी का पता चला: ${disease}. फसल: ${crop}. गंभीरता: ${severity}. विश्वास: ${confidence} प्रतिशत.`,
      tamil: `நோய் கண்டறியப்பட்டது: ${disease}. பயிர்: ${crop}. தீவிரம்: ${severity}. நம்பிக்கை: ${confidence} சதவீதம்.`,
      marathi: `रोग आढळला: ${disease}. पीक: ${crop}. तीव्रता: ${severity}. विश्वास: ${confidence} टक्के.`,
      kannada: `ರೋಗ ಪತ್ತೆಯಾಗಿದೆ: ${disease}. ಬೆಳೆ: ${crop}. ತೀವ್ರತೆ: ${severity}. ವಿಶ್ವಾಸ: ${confidence} ಶೇಕಡಾ.`,
    }

    const message = messages[langToUse as keyof typeof messages] || messages.english
    this.speak(message, langToUse)
  }

  getAvailableVoices() {
    return speechSynthesis.getVoices()
  }
}

export const voiceAssistant = new VoiceAssistant()
