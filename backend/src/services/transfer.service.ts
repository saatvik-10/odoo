import Transfer from "@/models/transfer.model";
import type {
  CreateTransfer,
  TransferStatus,
} from "@/validators/transfer.validator";

export class TransferService {
  async createTransfer(data: CreateTransfer, user: string, vendor: string) {
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

  async updateTransferByID(id: string, data: CreateTransfer) {
    await Transfer.updateOne({ _id: id }, data);
  }

  async updateTransferStatus(id: string, status: TransferStatus) {
    await Transfer.updateOne({ _id: id }, { status });
  }
}
