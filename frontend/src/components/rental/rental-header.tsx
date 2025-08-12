"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Printer, ChevronLeft, ChevronRight } from "lucide-react"
import type { RentalStatus } from "@/validators/rental.validator"

interface RentalHeaderProps {
  rentalID: string
  status: RentalStatus
  currentPage: number
  totalPages: number
  onPrevious?: () => void
  onNext?: () => void
}

export function RentalHeader({ rentalID, status, currentPage, totalPages, onPrevious, onNext }: RentalHeaderProps) {
  const getStatusColor = (status: RentalStatus) => {
    switch (status) {
      case "Quotation":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Reserved":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Picked Up":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "Returned":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Received By Vendor":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="bg-white border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Rental Orders</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {currentPage}/{totalPages}
            </span>
            <Button variant="ghost" size="sm" onClick={onPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Accept
            </Button>
            <Button variant="destructive">
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Badge className={getStatusColor(status)}>{status}</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
