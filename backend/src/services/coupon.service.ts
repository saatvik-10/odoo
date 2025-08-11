import Coupon from "@/models/coupon.model";
import type { CreateCoupon } from "@/validators/coupon.validator";

export class CouponService {
  async createCoupon(data: CreateCoupon) {
    await Coupon.create(data);
  }

  async getAllCoupons() {
    return Coupon.find({});
  }

  async getCouponByCode(code: string) {
    return Coupon.findOne({ code });
  }

  async getCouponByID(id: string) {
    return Coupon.findById(id);
  }

  async deleteCoupon(id: string) {
    await Coupon.deleteOne({ _id: id });
  }
}
