import { MediaController } from "@/controllers/media.controller";
import { uploadMiddleware } from "@/middlewares/upload.middleware";
import { Hono } from "hono";

const mediaController = new MediaController();

const app = new Hono();

app.post("/upload", uploadMiddleware, mediaController.uploadMedia);

export default app;
