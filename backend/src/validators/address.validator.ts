import { z } from "zod";

export const addressValidator = z.object({
    name : z.string(),
    addressLine1 : z.string().min(3, "Address line 1 is required"),
    street : z.string().min(3, "Street is required"),
    pincode : z.string().min(6, "Pincode is required").max(6, "Pincode must be 6 characters"),
    city : z.string().min(2, "City is required"),
    state : z.string().min(2, "State is required"),
})

export type AddressValidator = z.infer<typeof addressValidator>;