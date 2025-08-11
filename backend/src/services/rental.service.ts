import Rental from "@/models/rental.model";
import type { CreateRental, RentalStatus } from "@/validators/rental.validator";

export class RentalService {
  async createRental(userID: string, vendorID: string, rentalID: number, data: CreateRental) {
    await Rental.create({
      ...data,
      user: userID,
      vendor: vendorID,
      rentalID: rentalID,
    });
  }

  async getUserRentals(userID: string) {
    return Rental.find({ user: userID });
  }

  async getVendorRentals(vendorID: string) {
    return Rental.find({ vendor: vendorID });
  }

  async getRentalByID(rentalID: string) {
    return Rental.findById(rentalID);
  }

  async updateRentalStatus(rentalID: string, status: RentalStatus) {
    return Rental.findByIdAndUpdate(rentalID, { status });
  }

  async cancelRental(rentalID: string, reason: string) {
    return Rental.findByIdAndUpdate(rentalID, { status: "Cancelled", reasonForCancellation: reason });
  }
}
