import { email, z } from "zod";

export const adminSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export type admin = z.infer<typeof adminSchema>;

export const registerAdminSchema = z.object({
    name : z.string().min(1, "Name is required").max(50, "Name must be at most 50 characters long"),
    email: z.email(),
    mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits").max(15, "Mobile number must be at most 15 digits"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export type RegisterAdminValidator = z.infer<typeof registerAdminSchema>;