import Admin from "@/models/admin.model";
import { adminSchema, type admin } from "@/validators/admin.validator";

export class AdminService {
    async getAdminByEmail(email: string) {
        return Admin.findOne({ email });
    }

    async createAdmin(adminData: admin ,hash: string) {
        const admin = await Admin.create({
            email: adminData.email,
            password: adminData.password, // Assuming password is hashed before saving
        });
        return admin;
    }
}