import { AdminController } from "@/controllers/admin.controller";
import { adminAuthenticate } from "@/middlewares/admin.middleware";
import { Hono } from "hono";

const adminController = new AdminController();

const app = new Hono();

app.get("/me",adminAuthenticate, adminController.getMe);
// app.get("/:id",adminAuthenticate, adminController.getAdminById);

export default app;
