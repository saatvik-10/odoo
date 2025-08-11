import UserModal from "@/models/user.model";
import type { RegisterUserValidator, User } from "@/validators/user.validator";
export class UserService {
  async getUserById(id: string) {
    return UserModal.findById(id);
  }

  async getUserByEmail(email: string) {
    return UserModal.findOne({ email });
  }

  async createUser(userData: RegisterUserValidator, hash: string) {
    const user = await UserModal.create({
      name: userData.name,
      email: userData.email,
      mobileNumber: userData.mobileNumber!,
      hash,
      
    });
    return user;
  }

  async updateUser(id: string, userData: Partial<User>) {
    return UserModal.findByIdAndUpdate({ _id: id }, { $set: userData });
  }
}
