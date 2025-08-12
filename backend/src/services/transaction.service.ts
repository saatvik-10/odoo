import Transaction from "@/models/transaction.model";
import { razorpayIns } from "@/utils/razorpay";
import type { CreateTransaction } from "@/validators/transaction.validator";

export class TransactionService {
  async createTransaction(rentalID: number, amount: number) {
    let orderID = ""
    await new Promise((resolve, reject) => {
      razorpayIns.orders
        .create({
          amount: Math.ceil(amount),
          currency: "INR",
        })
        .then(async (order) => {
          orderID = order.id;
          await Transaction.create({
            rental: rentalID,
            orderID: order.id,
            amount: order.amount,
            amount_paid: order.amount_paid,
            amount_due: order.amount_due,
            currency: order.currency,
            status: order.status,
            attempts: order.attempts,
            notes: order.notes,
            createdAt: order.created_at,
          });
          resolve(order);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return orderID;
  }

  async getTransactionsByRentalID(rentalID: string) {
    return Transaction.find({ rental: rentalID });
  }

  async updateTransaction(id: string, data: CreateTransaction) {
    return Transaction.findByIdAndUpdate(id, data);
  }

  async updateTransactionStatus(id: string, status: string) {
    return Transaction.findByIdAndUpdate(id, { status });
  }

  async getTransactionByOrderID(orderID: string) {
    return Transaction.findOne({ orderID });
  }
}
