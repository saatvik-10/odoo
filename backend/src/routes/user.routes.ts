import { UserController } from "@/controllers/user.controller";
import { authenticate } from "@/middlewares/auth";
import { Hono } from "hono";

const userController = new UserController();
const app = new Hono();

app.get("/me", authenticate, userController.getMe);
app.get("/:id", authenticate, userController.getUserById);
