import {z} from "zod";

export const vendorSchema = z.object({
    name : z.string().min(3, "Name must be at least 3 characters long").max(20),
    email : z.email(),
    mobileNumber : z.number().min(1000000000, "Mobile number must be at least 10 digits").max(9999999999, "Mobile number must be at most 15 digits"),
    hash : z.string().min(6, "Password must be at least 6 characters long"),
    address : z.object({
        addressLine1 : z.string(),
        street : z.string().min(3, "Street is required"),
        pincode : z.string().min(6, "Pincode must be at least 6 characters long").max(10, "Pincode must be at most 10 characters long"),
        city : z.string().min(3, "City is required"),
        state : z.string().min(3, "State is required"),
    }).optional(),
})

export type Vendor = z.infer<typeof vendorSchema>;

export const registerVendorSchema = z.object({
    name : z.string().min(3, "Name must be at least 3 characters long").max(20),
    email : z.email(),
    mobileNumber : z.number().min(1000000000, "Mobile number must be at least 10 digits").max(9999999999, "Mobile number must be at most 15 digits"),
    password : z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export type RegisterVendorValidator = z.infer<typeof registerVendorSchema>;

export const loginVendorSchema = z.object({
    email : z.email(),
    password : z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export type LoginVendorValidator = z.infer<typeof loginVendorSchema>;
