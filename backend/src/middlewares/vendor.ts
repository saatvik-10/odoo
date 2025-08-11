import type { Context, Next } from "hono";
import { StatusCodes } from "http-status-codes";

export const vendor = async (ctx: Context, next: Next) => {
  const userId = ctx.get("userId");
  if (!userId) {
    return ctx.json(
      { message: "User ID is required" },
      StatusCodes.UNAUTHORIZED
    );
  }
  const role = ctx.get("role");
  if (role !== "vendor") {
    return ctx.json(
      {
        message: "You do not have permission to access this resource",
      },
      StatusCodes.FORBIDDEN
    );
  }
};