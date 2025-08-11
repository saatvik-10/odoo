import { CouponController } from "@/controllers/coupon.controller";
import { adminAuthenticate } from "@/middlewares/admin.middleware";
import { authenticate } from "@/middlewares/auth";
import { Hono } from "hono";

const couponController = new CouponController();

const app = new Hono();

app.post("/", authenticate, adminAuthenticate, couponController.createCoupon);
app.get("/", authenticate, adminAuthenticate, couponController.getCoupons);
app.get("/code/:code", couponController.getCouponByCode);
app.get(
  "/:id",
  authenticate,
  adminAuthenticate,
  couponController.getCouponByID,
);
app.delete(
  "/:id",
  authenticate,
  adminAuthenticate,
  couponController.deleteCoupon,
);

export default app;
