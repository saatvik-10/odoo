import { RentalController } from "@/controllers/rental.controller";
import { Hono } from "hono";

const rentalController = new RentalController();

const app = new Hono()

app.post("/", rentalController.createRental)

app.get("/", rentalController.getRentalsForUser)

app.get("/vendor/:id", rentalController.getRentalsByVendorId)

app.get("/:id", rentalController.getRentalByID)

app.patch("/status/:id", rentalController.updateRentalStatus)

app.delete("/cancel/:id", rentalController.cancelRental)

app.patch("/approve/:id", rentalController.approveRental)

export default app;
