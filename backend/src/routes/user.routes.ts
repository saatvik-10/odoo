import { UserController } from "@/controllers/user.controller";
import { authenticate } from "@/middlewares/auth";
import { Hono } from "hono";

const userController = new UserController();
const app = new Hono();

app.get("/me", authenticate, userController.getMe);
app.get("/:id", authenticate, userController.getUserById);
app.post("/address", authenticate, userController.createAddress);
app.put("/address/:id", authenticate, userController.updateAddress);
app.get("/address", authenticate, userController.getAddresses);

export default app;

