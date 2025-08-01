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
  const modes: { key: ViewMode; label: string; icon: React.ReactNode }[] = [
    { key: "mindmap", label: "Mind Map", icon: <Brain className="w-4 h-4" /> },
    { key: "flowchart", label: "Flowchart", icon: <GitBranch className="w-4 h-4" /> },
    { key: "outline", label: "Outline", icon: <List className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-2">
      {modes.map((mode) => (
        <Button
          key={mode.key}
          onClick={() => onModeChange(mode.key)}
          variant={currentMode === mode.key ? "default" : "outline"}
          className={cn(
            "w-full justify-start transition-all duration-200",
            currentMode === mode.key && "bg-indigo-500 hover:bg-indigo-600",
          )}
        >
          {mode.icon}
          <span className="ml-2">{mode.label}</span>
        </Button>
      ))}
    </div>
  )
}
