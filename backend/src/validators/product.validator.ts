import z from "zod";

export const productSchema = z.object({
  id: z.any(),
  name: z.string().min(1),
  description: z.string().min(1),
  vendor: z.any(),
  category: z.string().nullish(),
  price: z.object({
    hourly: z.number().min(1),
    daily: z.number().min(1),
    monthly: z.number().min(1),
    yearly: z.number().min(1),
  }),
  specialPrices: z.array(
    z.object({
      hourly: z.number().min(1),
      daily: z.number().min(1),
      monthly: z.number().min(1),
      yearly: z.number().min(1),
    }),
  ),
  extraPricing: z.object({
    hourly: z.number().min(1),
    daily: z.number().min(1),
    monthly: z.number().min(1),
    yearly: z.number().min(1),
  }),
  images: z.array(z.string().min(1)),
  stock: z.number().min(0),
  public: z.boolean().default(false),
});

export type Product = z.infer<typeof productSchema>;

export const createProductSchema = productSchema.omit({
  id: true,
  vendor: true,
});

export type CreateProduct = z.infer<typeof createProductSchema>;

export const updateProductSchema = productSchema.omit({
  id: true,
  vendor: true,
}).partial();

export type UpdateProduct = z.infer<typeof updateProductSchema>;
