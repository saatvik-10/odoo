import { z } from "zod";

export const adminSchema = z.object({
    name : z.string().min(3, "Name is required").max(20, "Name must be at most 50 characters long"),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export type admin = z.infer<typeof adminSchema>;

export const registerAdminSchema = z.object({
    name : z.string().min(3, "Name is required").max(20, "Name must be at most 50 characters long"),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export type RegisterAdminValidator = z.infer<typeof registerAdminSchema>;

export const loginAdminSchema = z.object({
    email : z.email(),
    password : z.string().min(8, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export type LoginAdminValidator = z.infer<typeof loginAdminSchema>;