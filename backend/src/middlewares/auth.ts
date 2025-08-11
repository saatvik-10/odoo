import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../lib/auth.lib";
import type { Context, Next } from "hono";

export const authenticate = async (ctx: Context, next: Next) => {
  try {
    let authorization = ctx.req.header("Authorization");
    if (!authorization) {
      return ctx.json(
        {
          message: "Authorization header is required",
        },
        StatusCodes.UNAUTHORIZED,
      );
    }
    authorization = authorization.split(" ")[1].trim();
    const user = await verifyJWT(authorization);
    ctx.set("user", user.role);
    ctx.set("userID", user._id);
    await next();
    return;
  } catch (e) {
    console.error(e);
    return ctx.json(
      {
        message: "Invalid token",
      },
      StatusCodes.UNAUTHORIZED,
    );
  }
};