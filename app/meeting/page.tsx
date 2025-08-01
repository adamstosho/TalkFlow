"use client"

import { useState } from "react"
import { MicButton } from "@/components/mic-button"
import { TranscriptPanel } from "@/components/transcript-panel"
import { DiagramCanvas } from "@/components/diagram-canvas"
import { ControlPanel } from "@/components/control-panel"
import { MobileDrawer } from "@/components/mobile-drawer"
import { useTranscript } from "@/hooks/use-transcript"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu, Mic } from "lucide-react"
import Link from "next/link"

export type ViewMode = "mindmap" | "flowchart" | "outline"

export default function MeetingPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("mindmap")
  const [showMobileDrawer, setShowMobileDrawer] = useState(false)
  const { transcript, currentSentence, isTranscribing, startTranscription, stopTranscription } = useTranscript()

  const handleMicToggle = () => {
    if (isRecording) {
      stopTranscription()
      setIsRecording(false)
    } else {
      startTranscription()
      setIsRecording(true)
    }
  }

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white font-['Lexend_Deca']">
              TalkFlow Session
            </h1>
            {isTranscribing && (
              <div className="flex items-center space-x-2 px-2 py-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-700 dark:text-green-300 font-medium">Recording</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setShowMobileDrawer(true)}>
          <Menu className="w-4 h-4" />
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Transcript (Desktop) */}
        <div className="hidden lg:flex w-96 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 shadow-sm">
          <TranscriptPanel transcript={transcript} currentSentence={currentSentence} isTranscribing={isTranscribing} />
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 relative">
          <DiagramCanvas transcript={transcript} viewMode={viewMode} />

          {/* Floating Mic Button (Mobile) */}
          <div className="lg:hidden fixed bottom-6 right-6 z-50">
            <MicButton isRecording={isRecording} onClick={handleMicToggle} size="lg" />
          </div>

          {/* Mobile Recording Indicator */}
          {isTranscribing && (
            <div className="lg:hidden fixed top-20 right-4 z-50">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                <Mic className="w-4 h-4 inline mr-1" />
                Recording
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Controls (Desktop) */}
        <div className="hidden lg:flex w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-sm">
          <ControlPanel
            isRecording={isRecording}
            onMicToggle={handleMicToggle}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onExport={() => {}}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={showMobileDrawer}
        onClose={() => setShowMobileDrawer(false)}
        transcript={transcript}
        currentSentence={currentSentence}
        isTranscribing={isTranscribing}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExport={() => {}}
      />
    </div>
  )
}
