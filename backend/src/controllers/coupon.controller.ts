import { CouponService } from "@/services/coupon.service";
import { createCouponSchema } from "@/validators/coupon.validator";
import type { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const couponService = new CouponService();

export class CouponController {
  async createCoupon(ctx: Context) {
    try {
      const body = createCouponSchema.parse(await ctx.req.json());
      await couponService.createCoupon(body);
      return ctx.json(ReasonPhrases.CREATED, StatusCodes.CREATED);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCoupons(ctx: Context) {
    try {
      const coupons = await couponService.getAllCoupons();
      return ctx.json(coupons);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCouponByCode(ctx: Context) {
    try {
      const code = ctx.req.param("code");
      if (!code) {
        return ctx.json(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
      }
      const coupons = await couponService.getCouponByCode(code);
      return ctx.json(coupons);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCouponByID(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const coupon = await couponService.getCouponByID(id as string);
      return ctx.json(coupon);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCoupon(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      await couponService.deleteCoupon(id as string);
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
