import z from "zod";

export const transactionSchema = z.object({
  rental: z.any(),
  orderID: z.string().min(1),
  amount: z.number().min(1),
  amount_paid: z.number().min(1),
  amount_due: z.number().min(1),
  currency: z.enum(["INR", "USD"]),
  status: z.enum(["paid", "due", "cancelled"]),
  attempts: z.number().min(1),
  notes: z.array(z.string().min(1)),
  createdAt: z.number(),
}) 

export type Transaction = z.infer<typeof transactionSchema>;

export const createTransactionSchema = transactionSchema.omit({
  id: true,
  rental: true,
});

export type CreateTransaction = z.infer<typeof createTransactionSchema>;
