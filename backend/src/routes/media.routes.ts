import { MediaController } from "@/controllers/media.controller";
import { Hono } from "hono";

const mediaController = new MediaController()

const app = new Hono();

app.post("/upload", mediaController.uploadMedia); 

export default app