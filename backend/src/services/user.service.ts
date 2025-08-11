import UserModal from "@/models/user.model";
import type { RegisterUserValidator, User } from "@/validators/user.validator";
export class UserService {
  async getUserById(id: string) {
    return UserModal.findById(id);
  }

  async createUser(userData: RegisterUserValidator, hash: string) {
    await UserModal.create({
      name: userData.name,
      email: userData.email,
      mobileNumber: userData.mobileNumber!,
      hash,
    });
  }

  async updateUser(id: string, userData: Partial<User>) {
    return UserModal.findByIdAndUpdate({ _id: id }, { $set: userData });
  }
}
