import { CouponController } from "@/controllers/coupon.controller";
import { admin } from "@/middlewares/admin";
import { authenticate } from "@/middlewares/auth";
import { Hono } from "hono";

const couponController = new CouponController();

const app = new Hono();

app.post("/", authenticate, admin, couponController.createCoupon);
app.get("/", authenticate, admin, couponController.getCoupons);
app.get("/code/:code", couponController.getCouponByCode);
app.get("/:id", authenticate, admin, couponController.getCouponByID);
app.delete("/:id", authenticate, admin, couponController.deleteCoupon);

export default app;
