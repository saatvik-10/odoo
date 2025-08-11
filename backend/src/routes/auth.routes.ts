import { AuthController } from "@/controllers/auth.controller";
import { Hono } from "hono";

const authController = new AuthController();
const app = new Hono();

app.post("/login", authController.userLogin);
app.post("/register", authController.userRegister);
app.post("/auth/admin/login", authController.adminLogin);
app.post("/auth/admin/register", authController.adminRegister);
app.post("/vendor/login", authController.vendorLogin);
app.post("/vendor/register", authController.vendorRegister);

export default app;