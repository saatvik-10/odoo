import VendorModal from "../models/vendor.model";
import type { RegisterVendorValidator, Vendor } from "../validators/vendor.validator";

export class VendorService {
    async getVendorById(id: string) {
        return VendorModal.findById(id);
    }

    async getVendorByEmail(email : string){
        return VendorModal.findOne({ email });
    }

    async createVendor(vendorData : RegisterVendorValidator , hash: string) {
        const vendor = await VendorModal.create({
            name: vendorData.name,
            email: vendorData.email,
            mobileNumber: vendorData.mobileNumber!,
            hash,
        });
        return vendor;
    }
    async updateVendor(id: string, vendorData: Partial<Vendor>) {
        return VendorModal.findByIdAndUpdate({ _id: id },{ $set: vendorData })
    }
}