
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";

export class ExampleController {
  async example(ctx: Context) {
	return ctx.json("", StatusCodes.OK);
  }

}