"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ViewSwitcher } from "@/components/view-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { Mic, MicOff, Activity, RotateCcw, Info } from "lucide-react"
import type { ViewMode } from "@/app/meeting/page"

interface ControlPanelProps {
  isRecording: boolean
  onMicToggle: () => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onNewSession: () => void
  onExport: () => void
}

export function ControlPanel({
  isRecording,
  onMicToggle,
  viewMode,
  onViewModeChange,
  onNewSession,
  onExport,
}: ControlPanelProps) {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Header */}
      <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white font-['Lexend_Deca']">Controls</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Manage your session</p>
      </div>

      {/* Recording Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-['Lexend_Deca'] flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Recording
          </CardTitle>
          <CardDescription>Start or stop voice transcription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={onMicToggle}
            className={`w-full h-12 text-base font-medium ${
              isRecording
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-5 h-5 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Start Recording
              </>
            )}
          </Button>
          
          {isRecording && (
            <div className="flex items-center justify-center space-x-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-sm text-red-700 dark:text-red-300 font-medium">Recording...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Mode Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-['Lexend_Deca']">View Mode</CardTitle>
          <CardDescription>Choose how to visualize your ideas</CardDescription>
        </CardHeader>
        <CardContent>
          <ViewSwitcher currentMode={viewMode} onModeChange={onViewModeChange} />
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-['Lexend_Deca']">Session Status</CardTitle>
          <CardDescription>Your session is automatically saved</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={onNewSession}
            variant="outline"
            className="w-full justify-start"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Session
          </Button>
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Click to clear all data and start fresh
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-['Lexend_Deca']">Appearance</CardTitle>
          <CardDescription>Customize the interface</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm text-slate-600 dark:text-slate-400">Theme</span>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="mt-auto">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-['Lexend_Deca'] flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-start space-x-2">
              <span className="text-indigo-500 font-medium">•</span>
              <span>Drag nodes to reposition them</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-indigo-500 font-medium">•</span>
              <span>Double-click nodes to edit text</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-indigo-500 font-medium">•</span>
              <span>Use mouse wheel to zoom canvas</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-indigo-500 font-medium">•</span>
              <span>Your session auto-saves locally</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
