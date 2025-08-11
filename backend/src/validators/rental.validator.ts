import z from "zod";

export const rentalSchema = z.object({
  id: z.any(),
  rentalID: z.number().min(1),
  product: z.any(),
  vendor: z.any(),
  user: z.any(),
  startDate: z.date(),
  endDate: z.date(),
  duration: z.object({
    durationType: z.enum(["Months", "Days", "Hours"]),
    durationValue: z.number().min(1),
  }),
  invoiceAddress: z.object({
    addressLine1: z.string().min(1),
    street: z.string().min(1),
    pincode: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
  }),
  deliveryAddress: z.object({
    addressLine1: z.string().min(1),
    street: z.string().min(1),
    pincode: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
  }),
  status: z.enum([
    "Quotation",
    "Reserved",
    "Picked Up",
    "Delivered",
    "Returned",
    "Received By Vendor",
    "Cancelled",
  ]),
  products: z.array(
    z.object({
      product: z.any(),
      quantity: z.number().min(1),
      price: z.number().min(1),
    }),
  ),
});
