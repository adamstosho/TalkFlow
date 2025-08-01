"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface MicButtonProps {
  isRecording: boolean
  onClick: () => void
  size?: "sm" | "md" | "lg"
  className?: string
}

export function MicButton({ isRecording, onClick, size = "md", className }: MicButtonProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  }

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-full transition-all duration-300 shadow-lg hover:shadow-xl",
        sizeClasses[size],
        isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-indigo-500 hover:bg-indigo-600",
        className,
      )}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      {isRecording ? (
        <MicOff className={cn("text-white", iconSizes[size])} />
      ) : (
        <Mic className={cn("text-white", iconSizes[size])} />
      )}

      {/* Pulsing ring animation when recording */}
      {isRecording && <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />}
    </Button>
  )
}
