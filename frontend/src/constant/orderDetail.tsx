export type OrderStatus = "quotation" | "reserved" | "pickedup" | "delivered" | "returned"

export interface RentalOrder {
  id: string
  customer: string
  customerEmail: string
  customerPhone: string
  invoiceAddress: string
  deliveryAddress: string
  rentalTemplate: string
  expiration: Date
  rentalOrderDate: Date
  priceList: string
  rentalPeriod: {
    startDate: Date
    endDate: Date
  }
  rentalDuration: number
  status: OrderStatus
  orderLines: Array<{
    id: string
    product: string
    quantity: number
    unitPrice: number
    tax: number
    subTotal: number
  }>
  termsConditions: string
  untaxedTotal: number
  taxTotal: number
  total: number
  rejectionFeedback?: string
}

export const statusConfig = {
  quotation: { label: "Quotation", color: "bg-yellow-100 text-yellow-800" },
  reserved: { label: "Reserved", color: "bg-green-100 text-green-800" },
  pickedup: { label: "Picked Up", color: "bg-blue-100 text-blue-800" },
  delivered: { label: "Delivered", color: "bg-indigo-100 text-indigo-800" },
  returned: { label: "Returned", color: "bg-gray-100 text-gray-800" },
}

// Sample rental orders in different stages
export const sampleOrders: RentalOrder[] = [
  {
    id: "R0001",
    customer: "John Doe Healthcare",
    customerEmail: "john@healthcare.com",
    customerPhone: "+1 234 567 8900",
    invoiceAddress: "123 Healthcare St, Medical District, City 12345",
    deliveryAddress: "456 Hospital Ave, Medical Center, City 12345",
    rentalTemplate: "Standard Medical Equipment Rental",
    expiration: new Date("2024-12-31"),
    rentalOrderDate: new Date("2024-01-15"),
    priceList: "Medical Equipment 2024",
    rentalPeriod: {
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-02-28"),
    },
    rentalDuration: 28,
    status: "quotation",
    orderLines: [
      {
        id: "1",
        product: "Premium Wheelchair",
        quantity: 5,
        unitPrice: 200,
        tax: 0,
        subTotal: 1000,
      },
      {
        id: "2",
        product: "Hospital Bed",
        quantity: 2,
        unitPrice: 350,
        tax: 0,
        subTotal: 700,
      },
    ],
    termsConditions: "Standard rental terms and conditions apply. Equipment must be returned in good condition.",
    untaxedTotal: 1700,
    taxTotal: 0,
    total: 1700,
  },
  {
    id: "R0002",
    customer: "City Medical Center",
    customerEmail: "orders@citymedical.com",
    customerPhone: "+1 234 567 8901",
    invoiceAddress: "789 Medical Plaza, Downtown, City 12346",
    deliveryAddress: "789 Medical Plaza, Downtown, City 12346",
    rentalTemplate: "Bulk Medical Equipment Rental",
    expiration: new Date("2024-12-31"),
    rentalOrderDate: new Date("2024-01-20"),
    priceList: "Medical Equipment 2024",
    rentalPeriod: {
      startDate: new Date("2024-02-05"),
      endDate: new Date("2024-03-05"),
    },
    rentalDuration: 30,
    status: "reserved",
    orderLines: [
      {
        id: "1",
        product: "Walking Frame",
        quantity: 10,
        unitPrice: 100,
        tax: 0,
        subTotal: 1000,
      },
      {
        id: "2",
        product: "Commode Chair",
        quantity: 5,
        unitPrice: 120,
        tax: 0,
        subTotal: 600,
      },
    ],
    termsConditions: "Bulk rental agreement. 30-day rental period with option to extend.",
    untaxedTotal: 1600,
    taxTotal: 0,
    total: 1600,
  },
  {
    id: "R0003",
    customer: "Sunrise Rehabilitation",
    customerEmail: "equipment@sunrise.com",
    customerPhone: "+1 234 567 8902",
    invoiceAddress: "321 Rehab Center Dr, Westside, City 12347",
    deliveryAddress: "321 Rehab Center Dr, Westside, City 12347",
    rentalTemplate: "Rehabilitation Equipment Rental",
    expiration: new Date("2024-12-31"),
    rentalOrderDate: new Date("2024-01-10"),
    priceList: "Medical Equipment 2024",
    rentalPeriod: {
      startDate: new Date("2024-01-25"),
      endDate: new Date("2024-02-25"),
    },
    rentalDuration: 31,
    status: "pickedup",
    orderLines: [
      {
        id: "1",
        product: "Blood Pressure Monitor",
        quantity: 3,
        unitPrice: 75,
        tax: 0,
        subTotal: 225,
      },
      {
        id: "2",
        product: "Oxygen Concentrator",
        quantity: 2,
        unitPrice: 450,
        tax: 0,
        subTotal: 900,
      },
    ],
    termsConditions: "Rehabilitation center rental. Equipment picked up on schedule.",
    untaxedTotal: 1125,
    taxTotal: 0,
    total: 1125,
  },
  {
    id: "R0004",
    customer: "Green Valley Clinic",
    customerEmail: "admin@greenvalley.com",
    customerPhone: "+1 234 567 8903",
    invoiceAddress: "654 Valley Rd, Green Valley, City 12348",
    deliveryAddress: "654 Valley Rd, Green Valley, City 12348",
    rentalTemplate: "Clinic Equipment Rental",
    expiration: new Date("2024-12-31"),
    rentalOrderDate: new Date("2024-01-05"),
    priceList: "Medical Equipment 2024",
    rentalPeriod: {
      startDate: new Date("2024-01-20"),
      endDate: new Date("2024-02-20"),
    },
    rentalDuration: 31,
    status: "delivered",
    orderLines: [
      {
        id: "1",
        product: "Premium Wheelchair",
        quantity: 3,
        unitPrice: 200,
        tax: 0,
        subTotal: 600,
      },
      {
        id: "2",
        product: "Walking Frame",
        quantity: 4,
        unitPrice: 100,
        tax: 0,
        subTotal: 400,
      },
    ],
    termsConditions: "Clinic rental agreement. Equipment delivered and in use.",
    untaxedTotal: 1000,
    taxTotal: 0,
    total: 1000,
  },
  {
    id: "R0005",
    customer: "Elderly Care Home",
    customerEmail: "supplies@elderlycare.com",
    customerPhone: "+1 234 567 8904",
    invoiceAddress: "987 Care Home Ave, Northside, City 12349",
    deliveryAddress: "987 Care Home Ave, Northside, City 12349",
    rentalTemplate: "Long-term Care Rental",
    expiration: new Date("2024-12-31"),
    rentalOrderDate: new Date("2023-12-15"),
    priceList: "Medical Equipment 2024",
    rentalPeriod: {
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-31"),
    },
    rentalDuration: 31,
    status: "returned",
    orderLines: [
      {
        id: "1",
        product: "Hospital Bed",
        quantity: 6,
        unitPrice: 350,
        tax: 0,
        subTotal: 2100,
      },
      {
        id: "2",
        product: "Commode Chair",
        quantity: 8,
        unitPrice: 120,
        tax: 0,
        subTotal: 960,
      },
    ],
    termsConditions: "Long-term care facility rental. Equipment returned in good condition.",
    untaxedTotal: 3060,
    taxTotal: 0,
    total: 3060,
  },
]