import { z } from "zod";

export const transferSchema = z.object({
  user: z.any(),
  vendor: z.any(),
  rentalID: z.any(),
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
  sourceAddress: z.object({
    addressLine1: z.string().min(1),
    street: z.string().min(1),
    pincode: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
  }),
  pickupDate: z.date(),
  transferType: z.enum(["pickup", "return"]),
  status: z.enum(["initiated", "processing", "completed", "cancelled"]).default("initiated"),
});

export type Transfer = z.infer<typeof transferSchema>;

export const createTransferSchema = transferSchema.omit({
  user: true,
  vendor: true,
  rentalID: true,
});

export type CreateTransfer = z.infer<typeof createTransferSchema>;

export const updateTransferSchema = transferSchema
  .omit({
    user: true,
    vendor: true,
    rentalID: true,
  })
  .partial();
