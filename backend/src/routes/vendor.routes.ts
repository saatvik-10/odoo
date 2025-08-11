import { Hono } from "hono";
import { VendorController } from "@/controllers/vendor.controller";
import { vendorAuthenticate } from "@/middlewares/vendor.middleware";

const vendorController = new VendorController();
const app = new Hono();

app.get("/me", vendorAuthenticate, vendorController.getMe);
app.get("/:id", vendorAuthenticate, vendorController.getVendorById);

export default app;
