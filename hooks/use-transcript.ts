"use client"

import { useState, useCallback, useRef, useEffect } from "react"

interface SessionData {
  transcript: string[]
  timestamp: number
  viewMode: string
}

export function useTranscript() {
  const [transcript, setTranscript] = useState<string[]>([])
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [currentSentence, setCurrentSentence] = useState("")
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('talkflow-session')
      if (savedSession) {
        const sessionData: SessionData = JSON.parse(savedSession)
        const sessionAge = Date.now() - sessionData.timestamp
        const maxAge = 24 * 60 * 60 * 1000 
        
        if (sessionAge < maxAge) {
          setTranscript(sessionData.transcript || [])
          console.log('Session restored from localStorage')
        } else {
          localStorage.removeItem('talkflow-session')
        }
      }
    } catch (error) {
      console.error('Error loading session from localStorage:', error)
    }
  }, [])

  useEffect(() => {
    if (transcript.length > 0) {
      try {
        const sessionData: SessionData = {
          transcript,
          timestamp: Date.now(),
          viewMode: 'mindmap' 
        }
        localStorage.setItem('talkflow-session', JSON.stringify(sessionData))
      } catch (error) {
        console.error('Error saving session to localStorage:', error)
      }
    }
  }, [transcript])

  const clearSession = useCallback(() => {
    try {
      localStorage.removeItem('talkflow-session')
      setTranscript([])
      setCurrentSentence("")
      console.log('Session cleared from localStorage')
    } catch (error) {
      console.error('Error clearing session from localStorage:', error)
    }
  }, [])

  const saveViewMode = useCallback((viewMode: string) => {
    try {
      const savedSession = localStorage.getItem('talkflow-session')
      if (savedSession) {
        const sessionData: SessionData = JSON.parse(savedSession)
        sessionData.viewMode = viewMode
        sessionData.timestamp = Date.now()
        localStorage.setItem('talkflow-session', JSON.stringify(sessionData))
      }
    } catch (error) {
      console.error('Error saving view mode to localStorage:', error)
    }
  }, [])

  const getSavedViewMode = useCallback((): string => {
    try {
      const savedSession = localStorage.getItem('talkflow-session')
      if (savedSession) {
        const sessionData: SessionData = JSON.parse(savedSession)
        return sessionData.viewMode || 'mindmap'
      }
    } catch (error) {
      console.error('Error getting saved view mode from localStorage:', error)
    }
    return 'mindmap'
  }, [])

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    
    const recognition = recognitionRef.current
    
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

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

      setCurrentSentence(interimTranscript)

      if (finalTranscript) {
        const sentences = finalTranscript
          .split(/[.!?]+/)
          .map(s => s.trim())
          .filter(s => s.length > 0)
        
        sentences.forEach(sentence => {
          if (sentence.length > 3) { 
            setTranscript(prev => [...prev, sentence])
          }
        })
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsTranscribing(false)
    }

    recognition.onend = () => {
      setIsTranscribing(false)
      setCurrentSentence("")
    }

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
    clearSession,
    saveViewMode,
    getSavedViewMode,
  }
}
