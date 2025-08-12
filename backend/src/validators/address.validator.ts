import { z } from "zod";

export const addressValidator = z.object({
  _id: z.any(),
  name: z.string(),
  addressLine1: z.string().min(3, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  street: z.string().min(3, "Street is required"),
  pincode: z
    .string()
    .min(6, "Pincode is required")
    .max(6, "Pincode must be 6 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
});

export type Address = z.infer<typeof addressValidator>;

export const createAddressValidator = addressValidator.omit({
  _id: true,
});

export type CreateAddress = z.infer<typeof createAddressValidator>;

export const updateAddressValidator = addressValidator.omit({
  _id: true,
});

export type UpdateAddress = z.infer<typeof updateAddressValidator>;

