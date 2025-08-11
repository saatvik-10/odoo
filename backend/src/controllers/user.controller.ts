import { AddressService } from "@/services/address.service";
import { UserService } from "@/services/user.service";
import {
  createAddressValidator,
  updateAddressValidator,
} from "@/validators/address.validator";
import { responseUserSchema, userSchema } from "@/validators/user.validator";
import type { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const userServices = new UserService();
const addressServices = new AddressService();

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
        StatusCodes.OK,
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        { error: "An error occurred while fetching user data" },
        StatusCodes.INTERNAL_SERVER_ERROR,
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
        StatusCodes.OK,
      );
    } catch (error) {
      return ctx.json(
        {
          error: "An error occurred while fetching user data",
        },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createAddress(ctx: Context) {
    try {
      const userId = ctx.get("userID");
      const body = createAddressValidator.parse(await ctx.req.json());
      await addressServices.createAddress(userId, body);
      return ctx.json(ReasonPhrases.CREATED, StatusCodes.CREATED);
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        { error: "An error occurred while creating address" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAddresses(ctx: Context) {
    try {
      const userId = ctx.get("userID");
      const addresses = await addressServices.getAddressByUserId(userId);
      return ctx.json(
        addresses.map((address) => ({
          ...address.toObject(),
          id: address._id.toString(),
        })),
        StatusCodes.OK,
      );
    } catch (error) {
      return ctx.json(
        { error: "An error occurred while fetching addresses" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateAddress(ctx: Context) {
    try {
      const userId = ctx.get("userID");
      const addressId = ctx.req.param("id");
      const body = updateAddressValidator.parse(await ctx.req.json());
      await addressServices.updateAddress(addressId, userId, body);
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        { error: "An error occurred while updating address" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
