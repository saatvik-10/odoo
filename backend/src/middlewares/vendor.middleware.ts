import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../lib/auth.lib";
import type { Context, Next } from "hono";

export const vendorAuthenticate = async (ctx: Context, next: Next) => {
  try {
    let authorization = ctx.req.header("Authorization");
    if (!authorization) {
      return ctx.json(
        { message: "Authorization header is required" },
        StatusCodes.UNAUTHORIZED
      );
    }
    authorization = authorization.split(" ")[1].trim();
    const user = await verifyJWT(authorization);
    ctx.set("userId", user._id);
    ctx.set("role", user.role);
    // Set vendorId if user is a vendor
    if (user.role === "vendor") {
      ctx.set("vendorId", user._id);
    }
    await next();
  } catch (e) {
    console.error(e);
    return ctx.json(
      { message: "Invalid token" },
      StatusCodes.UNAUTHORIZED
    );
  }
};