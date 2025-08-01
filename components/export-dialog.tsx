"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ViewMode } from "@/app/meeting/page"
import { Download, FileImage, FileText, File } from "lucide-react"

interface ExportDialogProps {
  isOpen: boolean
  onClose: () => void
  transcript: string[]
  viewMode: ViewMode
}

type ExportFormat = "png" | "pdf" | "txt"

export function ExportDialog({ isOpen, onClose, transcript, viewMode }: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("png")

  const exportFormats = [
    {
      key: "png" as ExportFormat,
      label: "PNG Image",
      description: "High-quality image of your diagram",
      icon: <FileImage className="w-5 h-5" />,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    {
      key: "pdf" as ExportFormat,
      label: "PDF Document",
      description: "Printable document with diagram and transcript",
      icon: <File className="w-5 h-5" />,
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
    {
      key: "txt" as ExportFormat,
      label: "Text File",
      description: "Plain text transcript of your session",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
  ]

  const handleExport = () => {
    // Mock export functionality
    const filename = `talkflow-${viewMode}-${Date.now()}`

    switch (selectedFormat) {
      case "png":
        // Mock PNG export
        console.log(`Exporting ${filename}.png`)
        break
      case "pdf":
        // Mock PDF export
        console.log(`Exporting ${filename}.pdf`)
        break
      case "txt":
        // Mock TXT export
        const textContent = transcript.join("\n")
        const blob = new Blob([textContent], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${filename}.txt`
        a.click()
        URL.revokeObjectURL(url)
        break
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-['Lexend_Deca']">Export Your Diagram</DialogTitle>
          <DialogDescription>
            Choose a format to export your {viewMode.replace("mindmap", "mind map")} and transcript.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Format Selection */}
          <div className="space-y-2">
            {exportFormats.map((format) => (
              <Card
                key={format.key}
                className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedFormat === format.key
                    ? "ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                onClick={() => setSelectedFormat(format.key)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${format.color}`}>{format.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-slate-900 dark:text-white">{format.label}</h4>
                      {selectedFormat === format.key && (
                        <Badge variant="secondary" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{format.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Preview Info */}
          <Card className="p-3 bg-slate-50 dark:bg-slate-800">
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">View Mode:</span>
                <span className="font-medium capitalize text-slate-900 dark:text-white">
                  {viewMode.replace("mindmap", "Mind Map")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Transcript Lines:</span>
                <span className="font-medium text-slate-900 dark:text-white">{transcript.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Format:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {exportFormats.find((f) => f.key === selectedFormat)?.label}
                </span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600"
              disabled={transcript.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
