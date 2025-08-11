import { VendorService } from "@/services/vendor.services";
import { vendorSchema } from "@/validators/vendor.validator";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const vendorServices = new VendorService();

export class VendorController {
  async getMe(ctx: Context) {
    try {
      const vendorId = ctx.get("vendorId");
      const vendor = await vendorServices.getVendorById(vendorId);

      if (!vendor) {
        return ctx.json({ error: "Vendor not found" }, StatusCodes.NOT_FOUND);
      }

      const validatedVendor = vendorSchema.parse({
        ...vendor.toObject(),
        vendorId: vendor._id.toString(),
        _id: vendor._id.toString(),
      });

      return ctx.json(
        {
          vendor: validatedVendor,
          _id: vendor._id.toString(), // The _id is now included in the top-level response.
        },
        StatusCodes.OK
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        { error: "An error occurred while fetching vendor data" },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getVendorById(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const vendor = await vendorServices.getVendorById(id);

      if (!vendor) {
        return ctx.json({ error: "Vendor not found" }, StatusCodes.NOT_FOUND);
      }

      // Explicitly parse the vendor object with the _id as a string
      const validatedVendor = vendorSchema.parse({
        ...vendor.toObject(),
        _id: vendor._id.toString(),
      });

      return ctx.json(
        {
          vendor: validatedVendor,
        },
        StatusCodes.OK
      );
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors specifically
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      console.error("An error occurred while fetching vendor data:", error);
      return ctx.json(
        {
          error: "An error occurred while fetching the vendor data",
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    }
}
