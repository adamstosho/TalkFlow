"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import type { ViewMode } from "@/app/meeting/page"
import { Brain, GitBranch, List } from "lucide-react"
import { cn } from "@/lib/utils"

interface ViewSwitcherProps {
  currentMode: ViewMode
  onModeChange: (mode: ViewMode) => void
}

export function ViewSwitcher({ currentMode, onModeChange }: ViewSwitcherProps) {
  const modes: { key: ViewMode; label: string; icon: React.ReactNode; description: string }[] = [
    { key: "mindmap", label: "Mind Map", icon: <Brain className="w-4 h-4" />, description: "Radial organization" },
    { key: "flowchart", label: "Flowchart", icon: <GitBranch className="w-4 h-4" />, description: "Process flow" },
    { key: "outline", label: "Outline", icon: <List className="w-4 h-4" />, description: "Linear structure" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {modes.map((mode) => (
        <Button
          key={mode.key}
          onClick={() => onModeChange(mode.key)}
          variant={currentMode === mode.key ? "default" : "outline"}
          className={cn(
            "h-auto p-3 flex flex-col items-center space-y-2 transition-all duration-200",
            currentMode === mode.key 
              ? "bg-indigo-500 hover:bg-indigo-600 text-white border-indigo-500" 
              : "hover:bg-slate-50 dark:hover:bg-slate-800"
          )}
        >
          <div className={cn(
            "w-4 h-4",
            currentMode === mode.key ? "text-white" : "text-slate-600 dark:text-slate-400"
          )}>
            {mode.icon}
          </div>
          <div className="text-center">
            <div className={cn(
              "text-xs font-medium",
              currentMode === mode.key ? "text-white" : "text-slate-900 dark:text-white"
            )}>
              {mode.label}
            </div>
            <div className={cn(
              "text-xs",
              currentMode === mode.key ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"
            )}>
              {mode.description}
            </div>
          </div>
        </Button>
      ))}
    </div>
  )
}
