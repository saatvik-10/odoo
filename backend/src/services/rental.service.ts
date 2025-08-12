import Rental from "@/models/rental.model";
import type { CreateRental, RentalStatus } from "@/validators/rental.validator";

export class RentalService {
  async createRental(
    userID: string,
    vendorID: string,
    rentalID: number,
    data: CreateRental,
    price: {
      amt: number;
      tax: number;
      couponDiscount: number;
    }
  ) {
    await Rental.create({
      ...data,
      user: userID,
      vendor: vendorID,
      rentalID: rentalID,
      amount: price.amt,
      tax: price.tax,
      couponDiscount: price.couponDiscount,
      totalAmt: price.amt + price.tax - price.couponDiscount,
    });
  }

  async getUserRentals(userID: string) {
    return Rental.find({ user: userID }).populate("products.product");
  }

  async getVendorRentals(vendorID: string) {
    return Rental.find({ vendor: vendorID }).populate([
      "user",
      "products.product",
    ]);
  }

  async getRentalByID(rentalID: string) {
    return Rental.findById(rentalID).populate(["user", "products.product"]);
  }

  async updateRentalStatus(rentalID: string, status: RentalStatus) {
    return Rental.findByIdAndUpdate(rentalID, { status });
  }

  async cancelRental(rentalID: string, reason: string) {
    return Rental.findByIdAndUpdate(rentalID, {
      status: "Cancelled",
      reasonForCancellation: reason,
    });
  }

  async verifyPayment(id: string) {
    await Rental.updateOne({ _id: id }, { paymentStatus: "confirmed" });
  }
}
