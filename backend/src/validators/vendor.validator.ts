import {z} from "zod";

export const vendorSchema = z.object({
    name : z.string().min(3, "Name must be at least 3 characters long").max(20),
    email : z.email(),
    mobileNumber : z.string().min(10, "Mobile number must be at least 10 characters long").max(15, "Mobile number must be at most 15 characters long"),
    hash : z.string().min(6, "Password must be at least 6 characters long"),
    address : z.object({
        addressLine1 : z.string(),
        street : z.string().min(3, "Street is required"),
        pincode : z.string().min(6, "Pincode must be at least 6 characters long").max(10, "Pincode must be at most 10 characters long"),
        city : z.string().min(3, "City is required"),
        state : z.string().min(3, "State is required"),
    })
})

export type Vendor = z.infer<typeof vendorSchema>;

export const registerVendorSchema = z.object({
    name : z.string().min(3, "Name must be at least 3 characters long").max(20),
    email : z.email(),
    mobileNumber : z.string().min(10, "Mobile number must be at least 10 characters long").max(15, "Mobile number must be at most 15 characters long"),
    password : z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export type RegisterVendorValidator = z.infer<typeof registerVendorSchema>;

export const loginVendorSchema = z.object({
    email : z.email(),
    password : z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export type LoginVendorValidator = z.infer<typeof loginVendorSchema>;
