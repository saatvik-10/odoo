import { CouponController } from "@/controllers/coupon.controller";
import { Hono } from "hono";

const couponController = new CouponController();

const app = new Hono()

app.post("/", couponController.createCoupon)
app.get("/", couponController.getCoupons)
app.get("/code/:code", couponController.getCouponByCode)
app.get("/:id", couponController.getCouponByID)

export default app;
