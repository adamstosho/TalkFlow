"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TranscriptPanel } from "@/components/transcript-panel"
import { ViewSwitcher } from "@/components/view-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import type { ViewMode } from "@/app/meeting/page"
import { Settings, RotateCcw } from "lucide-react"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  transcript: string[]
  currentSentence?: string
  isTranscribing: boolean
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onNewSession: () => void
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
  onNewSession,
  onExport,
}: MobileDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[75vh] sm:h-[80vh] max-h-[600px] sm:max-h-[700px]">
        <SheetHeader className="pb-4">
          <SheetTitle className="font-['Lexend_Deca'] text-lg sm:text-xl">Session Controls</SheetTitle>
          <SheetDescription className="text-sm sm:text-base">View your transcript and adjust settings</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="transcript" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="transcript" className="text-sm sm:text-base">Transcript</TabsTrigger>
            <TabsTrigger value="controls" className="text-sm sm:text-base">
              <Settings className="w-4 h-4 mr-2" />
              Controls
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transcript" className="flex-1 mt-0">
            <div className="h-full">
              <TranscriptPanel transcript={transcript} currentSentence={currentSentence} isTranscribing={isTranscribing} />
            </div>
          </TabsContent>

          <TabsContent value="controls" className="flex-1 mt-0 space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-sm sm:text-base font-medium text-slate-900 dark:text-white mb-3 font-['Lexend_Deca']">
                View Mode
              </h3>
              <ViewSwitcher currentMode={viewMode} onModeChange={onViewModeChange} />
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-medium text-slate-900 dark:text-white mb-3 font-['Lexend_Deca']">
                Session
              </h3>
              <Button
                onClick={onNewSession}
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Session
              </Button>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-medium text-slate-900 dark:text-white mb-3 font-['Lexend_Deca']">
                Appearance
              </h3>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
