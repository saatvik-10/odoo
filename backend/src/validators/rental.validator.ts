import z from "zod";

export const rentalStatusSchema = z.enum([
  "Quotation",
  "Reserved",
  "Picked Up",
  "Delivered",
  "Returned",
  "Received By Vendor",
  "Cancelled",
]);

export type RentalStatus = z.infer<typeof rentalStatusSchema>;

export const rentalSchema = z.object({
  id: z.any(),
  rentalID: z.number().min(1),
  product: z.any(),
  vendor: z.any(),
  user: z.any(),
  startDate: z.date(),
  endDate: z.date(),
  duration: z.object({
    durationType: z.enum(["monthly", "daily", "hourly"]),
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
  status: rentalStatusSchema,
  reasonForCancellation: z.string().nullish(),
  products: z.array(
    z.object({
      product: z.any(),
      quantity: z.number().min(1),
      price: z.number().min(1),
    }),
  ),
  amount: z.number().min(1),
  tax: z.number().min(1),
  couponCode: z.string().nullish(),
  couponDiscount: z.number().min(1),
  totalAmt: z.number().min(1),
});

export type Rental = z.infer<typeof rentalSchema>;

export const createRentalSchema = rentalSchema.omit({
  id: true,
  user: true,
  vendor: true,
  amount: true,
  tax: true,
  totalAmt: true,
  rentalID: true,
});

export type CreateRental = z.infer<typeof createRentalSchema>;

export const cancelRentalSchema = z.object({
  reason: z.string().min(10),
});

export type CancelRental = z.infer<typeof cancelRentalSchema>;
