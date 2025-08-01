"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Mic, Clock, ArrowDown, ArrowUp } from "lucide-react"

interface TranscriptPanelProps {
  transcript: string[]
  currentSentence?: string
  isTranscribing: boolean
}

export function TranscriptPanel({ transcript, currentSentence = "", isTranscribing }: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  useEffect(() => {
    if (scrollRef.current && autoScroll) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [transcript, currentSentence, autoScroll])

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      setAutoScroll(true)
    }
  }

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
      setAutoScroll(false)
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10
      setAutoScroll(isAtBottom)
    }
  }

  const highlightKeywords = (text: string) => {
    const keywords = ["project", "task", "idea", "goal", "plan", "step", "process", "workflow", "meeting", "discussion", "strategy", "implementation"]
    let highlightedText = text

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi")
      highlightedText = highlightedText.replace(
        regex,
        `<span class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-1 rounded">${keyword}</span>`,
      )
    })

    return highlightedText
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white font-['Lexend_Deca']">Live Transcript</h2>
          <div className="flex items-center space-x-1 sm:space-x-2">
            {isTranscribing && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                <Mic className="w-3 h-3 mr-1" />
                Live
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {transcript.length}
            </Badge>
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="h-7 px-2 text-xs"
            >
              <ArrowUp className="w-3 h-3 mr-1" />
              Top
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToBottom}
              className="h-7 px-2 text-xs"
            >
              <ArrowDown className="w-3 h-3 mr-1" />
              Latest
            </Button>
          </div>
          {autoScroll && (
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Auto-scroll
            </Badge>
          )}
        </div>
      </div>

      {/* Transcript Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="p-3 sm:p-4 space-y-3"
          >
            {transcript.length === 0 && !currentSentence && (
              <div className="text-center py-8">
                <Mic className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Start speaking to see your transcript here
                </p>
              </div>
            )}

            {/* Historical Transcript */}
            {transcript.map((line, index) => (
              <Card key={index} className="p-3 sm:p-4 bg-white dark:bg-slate-800 shadow-sm">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm sm:text-base text-slate-900 dark:text-white leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: highlightKeywords(line) }}
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Current Live Sentence */}
            {currentSentence && (
              <Card className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-sm">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <Mic className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base text-slate-900 dark:text-white leading-relaxed">
                      {currentSentence}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">Live</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
