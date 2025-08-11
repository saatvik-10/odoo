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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Truck } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface DeliveryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (deliveryData: any) => void
  rentalPeriod: {
    startDate: Date
    endDate: Date
  }
  customerAddress: string
}

export function DeliveryModal({ isOpen, onClose, onConfirm, rentalPeriod, customerAddress }: DeliveryModalProps) {
  const [pickupDate, setPickupDate] = useState<Date>(rentalPeriod.startDate)
  const [returnDate, setReturnDate] = useState<Date>(rentalPeriod.endDate)
  const [pickupAddress, setPickupAddress] = useState(customerAddress)
  const [returnAddress, setReturnAddress] = useState(customerAddress)
  const [pickupNotes, setPickupNotes] = useState("")
  const [returnNotes, setReturnNotes] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  const handleConfirm = () => {
    const deliveryData = {
      pickup: {
        date: pickupDate,
        address: pickupAddress,
        notes: pickupNotes,
        contactPerson,
        contactPhone,
      },
      return: {
        date: returnDate,
        address: returnAddress,
        notes: returnNotes,
        contactPerson,
        contactPhone,
      },
    }
    onConfirm(deliveryData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Create Delivery Orders
          </DialogTitle>
          <DialogDescription>
            This will create two delivery orders: one for pickup and one for return. Please review and confirm the
            details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Enter contact person name"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Enter contact phone number"
              />
            </div>
          </div>

          {/* Pickup Details */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-green-700 flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Pickup Delivery Order
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Pickup Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !pickupDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={(date) => date && setPickupDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label htmlFor="pickupAddress">Pickup Address</Label>
              <Textarea
                id="pickupAddress"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                rows={2}
                placeholder="Enter pickup address"
              />
            </div>

            <div>
              <Label htmlFor="pickupNotes">Pickup Notes</Label>
              <Textarea
                id="pickupNotes"
                value={pickupNotes}
                onChange={(e) => setPickupNotes(e.target.value)}
                rows={2}
                placeholder="Special instructions for pickup..."
              />
            </div>
          </div>

          {/* Return Details */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-blue-700 flex items-center gap-2">
              <Truck className="h-4 w-4 rotate-180" />
              Return Delivery Order
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Return Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !returnDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={(date) => date && setReturnDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label htmlFor="returnAddress">Return Address</Label>
              <Textarea
                id="returnAddress"
                value={returnAddress}
                onChange={(e) => setReturnAddress(e.target.value)}
                rows={2}
                placeholder="Enter return address"
              />
            </div>

            <div>
              <Label htmlFor="returnNotes">Return Notes</Label>
              <Textarea
                id="returnNotes"
                value={returnNotes}
                onChange={(e) => setReturnNotes(e.target.value)}
                rows={2}
                placeholder="Special instructions for return..."
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-blue-600 hover:bg-blue-700">
            Create Delivery Orders
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
