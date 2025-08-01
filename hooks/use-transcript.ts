"use client"

import { useState, useCallback, useRef, useEffect } from "react"

export function useTranscript() {
  const [transcript, setTranscript] = useState<string[]>([])
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [currentSentence, setCurrentSentence] = useState("")
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser')
      return
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    
    const recognition = recognitionRef.current
    
    // Configure recognition settings
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

    // Handle speech recognition results
    recognition.onresult = (event) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      // Update current sentence with interim results
      setCurrentSentence(interimTranscript)

      // Add final sentences to transcript
      if (finalTranscript) {
        const sentences = finalTranscript
          .split(/[.!?]+/)
          .map(s => s.trim())
          .filter(s => s.length > 0)
        
        sentences.forEach(sentence => {
          if (sentence.length > 3) { // Only add meaningful sentences
            setTranscript(prev => [...prev, sentence])
          }
        })
      }
    }

    // Handle recognition errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsTranscribing(false)
    }

    // Handle recognition end
    recognition.onend = () => {
      setIsTranscribing(false)
      setCurrentSentence("")
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startTranscription = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setIsTranscribing(true)
        setCurrentSentence("")
      } catch (error) {
        console.error('Failed to start speech recognition:', error)
      }
    } else {
      console.warn('Speech recognition not available')
    }
  }, [])

  const stopTranscription = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsTranscribing(false)
      setCurrentSentence("")
    }
  }, [])

  return {
    transcript,
    currentSentence,
    isTranscribing,
    startTranscription,
    stopTranscription,
  }
}
