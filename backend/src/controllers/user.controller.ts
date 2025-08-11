import { UserService } from "@/services/user.service";
import { responseUserSchema, userSchema } from "@/validators/user.validator";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const userServices = new UserService();

export class UserController {
  async getMe(ctx: Context) {
    try {
      const userId = ctx.get("userId");
      const user = await userServices.getUserById(userId);
      return ctx.json(
        responseUserSchema.parse({
          ...user?.toObject(),
          id: user?._id.toString(),
        }),
        StatusCodes.OK
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        { error: "An error occurred while fetching user data" },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getUserById(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const user = await userServices.getUserById(id);
      if (!user) {
        return ctx.json({ error: "User not found" }, StatusCodes.NOT_FOUND);
      }
      return ctx.json(
        userSchema.parse({
          ...user.toObject(),
          _id: user._id.toString(),
        }),
        StatusCodes.OK
      );
    } catch (error) {
      return ctx.json(
        {
          error: "An error occurred while fetching user data",
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
