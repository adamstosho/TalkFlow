"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Move, Edit3, X } from "lucide-react"

interface NodeCardProps {
  text: string
  nodeType?: "start" | "process" | "decision" | "end"
  isSelected?: boolean
  isEditing?: boolean
  onEdit?: (text: string) => void
  onEditCancel?: () => void
  onResizeStart?: (e: React.MouseEvent) => void
}

export function NodeCard({
  text,
  nodeType = "process",
  isSelected = false,
  isEditing = false,
  onEdit,
  onEditCancel,
  onResizeStart,
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

  const handleEditSave = () => {
    if (onEdit && editText.trim() !== text) {
      onEdit(editText.trim())
    }
  }

  const handleEditCancel = () => {
    setEditText(text)
    onEditCancel?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleEditSave()
    } else if (e.key === "Escape") {
      handleEditCancel()
    }
  }

  const getNodeStyle = () => {
    switch (nodeType) {
      case "start":
        return "bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200"
      case "end":
        return "bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200"
      case "decision":
        return "bg-amber-100 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200"
      default:
        return "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
    }
  }

  const getNodeShape = () => {
    switch (nodeType) {
      case "start":
      case "end":
        return "rounded-full"
      case "decision":
        return "rounded-lg"
      default:
        return "rounded-lg"
    }
  }

  const getNodeSize = () => {
    switch (nodeType) {
      case "start":
      case "end":
        return "w-24 h-24"
      case "decision":
        return "w-32 h-32"
      default:
        return "w-full h-full"
    }
  }

  const getNodeLabel = () => {
    switch (nodeType) {
      case "start":
        return "START"
      case "end":
        return "END"
      case "decision":
        return "DECISION"
      default:
        return "PROCESS"
    }
  }

  const getNodeIcon = () => {
    switch (nodeType) {
      case "start":
        return "▶"
      case "end":
        return "■"
      case "decision":
        return "◇"
      default:
        return "●"
    }
  }

  return (
    <Card
      className={`relative group transition-all duration-200 ${getNodeStyle()} ${getNodeShape()} ${getNodeSize()} ${
        isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""
      } ${isEditing ? "ring-2 ring-indigo-500" : ""}`}
    >
      {isEditing ? (
        <div className="p-2 h-full flex flex-col">
          <Textarea
            ref={textareaRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEditSave}
            className="flex-1 resize-none border-0 bg-transparent text-sm focus:ring-0"
            placeholder="Enter text..."
          />
          <div className="flex justify-end space-x-1 mt-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEditSave}
              className="h-6 px-2 text-xs"
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEditCancel}
              className="h-6 px-2 text-xs"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-3 h-full flex flex-col justify-center relative">
          {/* Selection Indicator */}
          {isSelected && (
            <div className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full p-1 shadow-lg">
              <Move className="w-3 h-3" />
            </div>
          )}

          {/* Resize Handle */}
          {isSelected && (
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize shadow-lg"
              onMouseDown={onResizeStart}
            />
          )}

          {/* Edit Button */}
          {isSelected && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit?.(text)}
              className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-white dark:bg-slate-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}

          {/* Node Content */}
          <div className="text-center">
            {/* Node Type Badge */}
            <Badge
              variant="secondary"
              className={`text-xs mb-2 ${
                nodeType === "start" || nodeType === "end"
                  ? "bg-white/20 text-current"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {getNodeLabel()}
            </Badge>

            {/* Node Text */}
            <p className="text-xs sm:text-sm font-medium leading-tight break-words">
              {text.length > 50 ? `${text.substring(0, 50)}...` : text}
            </p>

            {/* Node Icon for Start/End */}
            {(nodeType === "start" || nodeType === "end") && (
              <div className="mt-2 text-lg">{getNodeIcon()}</div>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
