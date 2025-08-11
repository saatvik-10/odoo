import { z } from "zod";

export const userSchema = z.object({
  id: z.any(),
  name: z.string().min(3, "Name is required"),
  email: z.string(),
  mobileNumber: z
    .number()
    .int()
    .positive("Mobile number must be a positive integer"),
});

export type User = z.infer<typeof userSchema>;

export const registerUserSchema = z.object({
  name: z.string().min(3, "Name is required").max(20),
  email: z.email(),
  mobileNumber: z
    .number()
    .int()
    .positive("Mobile number must be a positive integer")
    .min(1000000000, "Mobile number must be at least 10 digits")
    .max(9999999999, "Mobile number must not exceed 10 digits"),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ),
});

export type RegisterUserValidator = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20),
});

export type LoginUserValidator = z.infer<typeof loginUserSchema>;
