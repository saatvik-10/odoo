"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

interface RejectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (feedback: string) => void
  orderNumber: string
}

export function RejectionModal({ isOpen, onClose, onConfirm, orderNumber }: RejectionModalProps) {
  const [feedback, setFeedback] = useState("")

  const handleConfirm = () => {
    if (feedback.trim()) {
      onConfirm(feedback)
      setFeedback("")
      onClose()
    }
  }

  const handleClose = () => {
    setFeedback("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Reject Order {orderNumber}
          </DialogTitle>
          <DialogDescription>
            Please provide feedback explaining why this rental request is being rejected. This will be sent to the
            customer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="feedback">Rejection Reason *</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please explain why this request cannot be fulfilled..."
              rows={4}
              className="mt-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="destructive" disabled={!feedback.trim()}>
            Reject Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
