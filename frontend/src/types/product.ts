// Product-related type definitions

export interface RentalPricing {
  period: string
  pricelist: string
  price: number
}

export interface ReservationCharges {
  extraHour: number
  extraDays: number
  extraWeek: number
  lateReturn: number
}

export interface Product {
  id: number
  name: string
  description: string
  category: string
  stock: number
  rentalPricing: RentalPricing[]
  reservationCharges: ReservationCharges
}

export interface ProductFormData {
  name: string
  description: string
  category: string
  stock: number
}

export interface PricingFormData {
  period: string
  pricelist: string
  price: number
}
