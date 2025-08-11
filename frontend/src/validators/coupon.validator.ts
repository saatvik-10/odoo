import { z } from "zod";

export const couponSchema = z.object({
  id: z.any(),
  code: z.string().min(1),
  discount: z.number().min(1),
  mov: z.number().min(1),
});

export type Coupon = z.infer<typeof couponSchema>;

export const createCouponSchema = couponSchema.omit({
  id: true,
});

export type CreateCoupon = z.infer<typeof createCouponSchema>;

export const updateCouponSchema = couponSchema
  .omit({
    id: true,
    code: true,
  })
  .partial();

export type UpdateCoupon = z.infer<typeof updateCouponSchema>;
