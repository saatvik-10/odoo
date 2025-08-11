import Admin from "@/models/admin.model";
import { adminSchema, type admin } from "@/validators/admin.validator";

export class AdminService {
    async getAdminByEmail(email: string) {
        return Admin.findOne({ email });
    }

    async getAdminById(id: string) {
        return Admin.findById(id);
    }

    async createAdmin(adminData: admin ,hash: string) {
        const admin = await Admin.create({
            name: adminData.name,
            email: adminData.email,
            hash 
        });
        return admin;
    }
}