import Address from "@/models/address.model";
import type {
  CreateAddress,
  UpdateAddress,
} from "@/validators/address.validator";

export class AddressService {
  async getAddressById(id: string) {
    return Address.findById(id);
  }

  async getAddressByUserId(userId: string) {
    return Address.find({ userId });
  }

  async createAddress(userId: string, address: CreateAddress) {
    await Address.create({
      userId,
      ...address,
    });
  }

  async updateAddress(id: string, userId: string, address: UpdateAddress) {
    await Address.updateOne(
      { id, userId },
      {
        $set: address,
      },
    );
  }
}
