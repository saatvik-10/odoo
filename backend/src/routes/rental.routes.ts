import { RentalController } from "@/controllers/rental.controller";
import { authenticate } from "@/middlewares/auth";
import { vendorAuthenticate } from "@/middlewares/vendor.middleware";
import { Hono } from "hono";

const rentalController = new RentalController();

const app = new Hono();

app.post("/", authenticate, rentalController.createRental);

app.post("/verify/payment", authenticate, rentalController.verifyRentalPayment);

app.get("/", authenticate, rentalController.getRentalsForUser);

app.get("/vendor/:id", rentalController.getRentalsByVendorId);

app.get("/:id", rentalController.getRentalByID);

app.patch(
  "/status/:id",
  vendorAuthenticate,
  rentalController.updateRentalStatus
);

app.delete("/cancel/:id", vendorAuthenticate, rentalController.cancelRental);

app.patch("/approve/:id", vendorAuthenticate, rentalController.approveRental);

export default app;
