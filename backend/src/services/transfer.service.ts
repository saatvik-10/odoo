import Transfer from "@/models/transfer.model";
import type { CreateTransfer } from "@/validators/transfer.validator";

export class TransferService {
  async createTransfer(data: CreateTransfer) {
    await Transfer.create(data);
  }

  async getTransferByID(id: string) {
    return Transfer.findById(id);
  }

  async getTransferByRentalID(id: string) {
    return Transfer.find({ rentalID: id });
  }

  async getTransferByUserID(id: string) {
    return Transfer.find({ user: id });
  }

  async getTransferByVendorID(id: string) {
    return Transfer.find({ vendor: id });
  }
}
