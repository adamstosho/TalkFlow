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
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white font-['Lexend_Deca']">Live Transcript</h2>
          <div className="flex items-center space-x-2">
            {isTranscribing && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Mic className="w-3 h-3 mr-1" />
                Live
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {transcript.length} lines
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
        <ScrollArea 
          className="h-full" 
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div className="p-4 space-y-3">
            {transcript.length === 0 && !currentSentence ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm font-medium mb-2">No transcript yet</p>
                <p className="text-xs">Start speaking to see your conversation here</p>
              </div>
            ) : (
              <>
                {/* Completed transcript lines */}
                {transcript.map((line, index) => (
                  <Card key={index} className="p-4 bg-slate-50 dark:bg-slate-700 border-0 shadow-sm">
                    <div className="flex items-start space-x-3">
                      <Badge variant="outline" className="text-xs mt-0.5 shrink-0 bg-slate-200 dark:bg-slate-600">
                        {index + 1}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: highlightKeywords(line) }}
                        />
                        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                          {new Date().toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Current sentence being spoken */}
                {currentSentence && (
                  <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm">
                    <div className="flex items-start space-x-3">
                      <Badge variant="outline" className="text-xs mt-0.5 shrink-0 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Live
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed italic"
                          dangerouslySetInnerHTML={{ __html: highlightKeywords(currentSentence) }}
                        />
                        <div className="mt-2 text-xs text-blue-500 dark:text-blue-400">
                          Speaking now...
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Listening indicator */}
                {isTranscribing && !currentSentence && (
                  <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <p className="text-sm text-blue-700 dark:text-blue-300 italic">Listening for speech...</p>
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
