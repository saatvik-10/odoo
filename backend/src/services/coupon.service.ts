import Coupon from "@/models/coupon.model";
import type { CreateCoupon } from "@/validators/coupon.validator";

export class CouponService {
  async createCoupon(data: CreateCoupon) {
    await Coupon.create(data);
  }

  async getCouponByCode(code: string) {
    return await Coupon.findOne({ code });
  }

  async getCouponByID(id: string) {
    return await Coupon.findById(id);
  }
}
