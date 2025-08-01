"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MicButton } from "@/components/mic-button"
import { ViewSwitcher } from "@/components/view-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import type { ViewMode } from "@/app/meeting/page"
import { Save, RotateCcw, Settings, Activity } from "lucide-react"

interface ControlPanelProps {
  isRecording: boolean
  onMicToggle: () => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onExport: () => void
}

export function ControlPanel({ isRecording, onMicToggle, viewMode, onViewModeChange, onExport }: ControlPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white font-['Lexend_Deca'] mb-1">Controls</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">Manage your session and diagram</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Recording Controls */}
        <Card className="p-4 border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-950 dark:to-sky-950">
          <div className="flex items-center space-x-2 mb-3">
            <Activity className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-medium text-slate-900 dark:text-white font-['Lexend_Deca']">Recording</h3>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <MicButton isRecording={isRecording} onClick={onMicToggle} size="md" />
            <div className="text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                {isRecording ? "Recording in progress..." : "Click to start recording"}
              </p>
              {isRecording && (
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* View Controls */}
        <Card className="p-4 border-0 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <Settings className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-medium text-slate-900 dark:text-white font-['Lexend_Deca']">View Mode</h3>
          </div>
          <ViewSwitcher currentMode={viewMode} onModeChange={onViewModeChange} />
        </Card>

        <Separator />

        {/* Session Controls */}
        <Card className="p-4 border-0 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-medium text-slate-900 dark:text-white font-['Lexend_Deca']">Session</h3>
          </div>
          <div className="space-y-2">
            <Button
              className="w-full justify-start bg-transparent"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Session
            </Button>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="p-4 border-0 shadow-sm bg-amber-50 dark:bg-amber-950/20">
          <h3 className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2">💡 Quick Tips</h3>
          <ul className="text-xs text-amber-800 dark:text-amber-200 space-y-1">
            <li>• Speak naturally - no special commands needed</li>
            <li>• Switch views to see different visualizations</li>
            <li>• Drag the canvas to pan around</li>
            <li>• Use zoom controls for detailed view</li>
            <li>• Click nodes to select and edit them</li>
          </ul>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
