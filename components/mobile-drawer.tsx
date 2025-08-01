"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TranscriptPanel } from "@/components/transcript-panel"
import { ViewSwitcher } from "@/components/view-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import type { ViewMode } from "@/app/meeting/page"
import { Settings } from "lucide-react"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  transcript: string[]
  currentSentence?: string
  isTranscribing: boolean
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onExport: () => void
}

export function MobileDrawer({
  isOpen,
  onClose,
  transcript,
  currentSentence = "",
  isTranscribing,
  viewMode,
  onViewModeChange,
  onExport,
}: MobileDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle className="font-['Lexend_Deca']">Session Controls</SheetTitle>
          <SheetDescription>View your transcript and adjust settings</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="transcript" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="controls">
              <Settings className="w-4 h-4 mr-2" />
              Controls
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transcript" className="mt-4 h-[calc(80vh-120px)]">
            <TranscriptPanel transcript={transcript} currentSentence={currentSentence} isTranscribing={isTranscribing} />
          </TabsContent>

          <TabsContent value="controls" className="mt-4 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3 font-['Lexend_Deca']">
                View Mode
              </h3>
              <ViewSwitcher currentMode={viewMode} onModeChange={onViewModeChange} />
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3 font-['Lexend_Deca']">
                Appearance
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
