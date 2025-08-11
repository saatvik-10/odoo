import Rental from "@/models/rental.model";
import type { CreateRental } from "@/validators/rental.validator";

export class RentalService {
  async createRental(userID: string, vendorID: string, data: CreateRental) {
    await Rental.create({
      ...data,
      user: userID,
      vendor: vendorID,
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

  async cancelRental(rentalID: string) {
    return Rental.findByIdAndUpdate(rentalID, { status: "Cancelled" });
  }

  async approveRental(rentalID: string) {
    return Rental.findByIdAndUpdate(rentalID, { status: "Reserved" });
  }

  async updateRentalStatus(rentalID: string, status: string) {
    return Rental.findByIdAndUpdate(rentalID, { status });
  }
}
