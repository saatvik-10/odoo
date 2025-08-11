import { Hono } from "hono"
import { ExampleController } from "../controllers/example.controller";

const exampleController = new ExampleController();

const app = new Hono();
app.get("/example", (ctx) => exampleController.example(ctx));

export default app;
