"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { ViewMode } from "@/app/meeting/page"
import { cn } from "@/lib/utils"
import { Edit3, X, Check, Move } from "lucide-react"

interface NodeCardProps {
  text: string
  level: number
  viewMode: ViewMode
  isNew?: boolean
  nodeType?: "start" | "process" | "decision" | "end"
  isSelected?: boolean
  isEditing?: boolean
  onEdit?: (newText: string) => void
  onEditCancel?: () => void
  onResizeStart?: (e: React.MouseEvent) => void
}

export function NodeCard({ 
  text, 
  level, 
  viewMode, 
  isNew = false, 
  nodeType = "process",
  isSelected = false,
  isEditing = false,
  onEdit,
  onEditCancel,
  onResizeStart
}: NodeCardProps) {
  const [editText, setEditText] = useState(text)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setEditText(text)
  }, [text])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [isEditing])

  const getNodeStyle = () => {
    const baseStyle = "border-2 transition-all duration-300"
    
    switch (viewMode) {
      case "mindmap":
        return cn(
          baseStyle,
          level === 0
            ? "bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700 text-indigo-900 dark:text-indigo-100"
            : "bg-sky-50 dark:bg-sky-900/50 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100"
        )
      case "flowchart":
        const flowchartStyle = cn(baseStyle)
        switch (nodeType) {
          case "start":
            return cn(flowchartStyle, "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-900 dark:text-green-100")
          case "end":
            return cn(flowchartStyle, "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100")
          case "decision":
            return cn(flowchartStyle, "bg-amber-100 dark:bg-amber-900 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100")
          default:
            return cn(flowchartStyle, "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white")
        }
      case "outline":
        return cn(
          baseStyle,
          level === 0
            ? "bg-amber-50 dark:bg-amber-900/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100"
            : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
        )
      default:
        return cn(baseStyle, "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600")
    }
  }

  const getNodeShape = () => {
    switch (viewMode) {
      case "mindmap":
        return level === 0 ? "rounded-2xl" : "rounded-xl"
      case "flowchart":
        switch (nodeType) {
          case "start":
          case "end":
            return "rounded-full" // Oval for start/end
          case "decision":
            return "transform rotate-45" // Diamond for decisions
          default:
            return "rounded-lg" // Rectangle for processes
        }
      case "outline":
        return "rounded-md"
      default:
        return "rounded-lg"
    }
  }

  const getNodeSize = () => {
    if (viewMode === "outline") {
      return level === 0 ? "min-w-[300px]" : "min-w-[250px]"
    }
    if (viewMode === "flowchart") {
      switch (nodeType) {
        case "start":
        case "end":
          return "w-32 h-16" // Oval size
        case "decision":
          return "w-40 h-40" // Diamond size
        default:
          return "min-w-[200px] max-w-[300px]" // Process size
      }
    }
    return level === 0 ? "min-w-[200px] max-w-[300px]" : "min-w-[150px] max-w-[250px]"
  }

  const getNodeLabel = () => {
    if (viewMode === "flowchart") {
      switch (nodeType) {
        case "start":
          return "Start"
        case "end":
          return "End"
        case "decision":
          return "Decision"
        default:
          return level === 0 ? "Process" : "Step"
      }
    }
    return level === 0 ? "Main Idea" : "Detail"
  }

  const getNodeIcon = () => {
    if (viewMode === "flowchart") {
      switch (nodeType) {
        case "start":
          return "▶"
        case "end":
          return "■"
        case "decision":
          return "?"
        default:
          return "⚙"
      }
    }
    return null
  }

  const handleEditSave = () => {
    if (onEdit && editText.trim()) {
      onEdit(editText.trim())
    }
  }

  const handleEditCancel = () => {
    setEditText(text)
    onEditCancel?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEditSave()
    } else if (e.key === 'Escape') {
      handleEditCancel()
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
    <Card
      className={cn(
        "p-3 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer flex items-center justify-center relative group",
        getNodeStyle(),
        getNodeShape(),
        getNodeSize(),
        isNew && "animate-in slide-in-from-bottom-4 duration-500",
        viewMode === "flowchart" && nodeType === "decision" && "aspect-square",
        isSelected && "ring-4 ring-blue-400 ring-opacity-50 shadow-xl",
        isEditing && "ring-4 ring-green-400 ring-opacity-50",
      )}
    >
      {/* Selection indicator */}
      {isSelected && !isEditing && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
          <Move className="w-3 h-3" />
        </div>
      )}

      {/* Resize handle */}
      {isSelected && !isEditing && (
        <div 
          className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize shadow-lg"
          onMouseDown={onResizeStart}
        />
      )}

      {/* Edit mode */}
      {isEditing ? (
        <div className="w-full space-y-2">
          <Textarea
            ref={textareaRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] resize-none border-0 bg-transparent focus:ring-0 text-sm"
            placeholder="Enter text..."
          />
          <div className="flex justify-end space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEditCancel}
              className="h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEditSave}
              className="h-6 w-6 p-0"
            >
              <Check className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ) : (
        <div className={cn(
          "space-y-2 text-center w-full",
          viewMode === "flowchart" && nodeType === "decision" && "transform -rotate-45"
        )}>
          {viewMode === "flowchart" && (
            <Badge variant="secondary" className="text-xs bg-white/50 dark:bg-black/20 mb-2">
              {getNodeIcon()} {getNodeLabel()}
            </Badge>
          )}
          {level === 0 && viewMode !== "flowchart" && (
            <Badge variant="secondary" className="text-xs bg-white/50 dark:bg-black/20">
              {getNodeLabel()}
            </Badge>
          )}
          <p 
            className={cn(
              "text-sm leading-relaxed",
              level === 0 ? "font-medium" : "font-normal",
              viewMode === "flowchart" && nodeType === "decision" && "text-xs"
            )}
            dangerouslySetInnerHTML={{ __html: highlightKeywords(text) }}
          />
          
          {/* Edit button (visible on hover when selected) */}
          {isSelected && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit?.(text)}
              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}
        </div>
      )}

      {/* Hover effect indicator */}
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </Card>
  )
}
