"use client"

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

export function ExportDialog({ isOpen, onClose, transcript, viewMode }: ExportDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-['Lexend_Deca']">Export Feature</DialogTitle>
          <DialogDescription>
            Export functionality has been temporarily disabled.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <div className="text-center">
              <Download className="w-12 h-12 mx-auto mb-4 text-amber-500" />
              <h3 className="text-lg font-medium text-amber-900 dark:text-amber-100 mb-2">
                Export Coming Soon
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                We're working on a better export solution. For now, you can copy your transcript manually.
              </p>
            </div>
          </Card>

          <div className="flex space-x-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
