import { rentalSchema } from "@/models/rental.model";
import { ProductService } from "@/services/product.service";
import { RentalService } from "@/services/rental.service";
import { createRentalSchema } from "@/validators/rental.validator";
import type { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const rentalService = new RentalService();
const productService = new ProductService();

export class RentalController {
  async createRental(ctx: Context) {
    try {
      const user = ctx.get("userID");
      const body = createRentalSchema.parse(await ctx.req.json());
      const products = await productService.getProductsFromIDList(
        body.products.map((product) => product.product),
      );
      if (products.length < 1) {
        return ctx.json(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
      }

      //TODO: Check if products are available for the same time.

      //Checking if all products belong to same vendor
      const vendor = products[0].vendor;
      for (let i = 0; i < products.length; i++) {
        if (products[i].vendor != vendor) {
          return ctx.json(
            { msg: "Cannot create rental with different vendors" },
            StatusCodes.BAD_REQUEST,
          );
        }
      }

      // Creating rental
      await rentalService.createRental(user, vendor.toString(), body);

      return ctx.json(ReasonPhrases.CREATED, StatusCodes.CREATED);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRentalsForUser(ctx: Context) {
    try {
      const user = ctx.get("userID")
      const rentals = await rentalService.getUserRentals(user);
      return ctx.json(rentals);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRentalsByVendorId(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const rentals = await rentalService.getVendorRentals(id as string);
      return ctx.json(rentals);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRentalByID(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const rental = await rentalService.getRentalByID(id as string);
      return ctx.json(rental);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateRentalStatus(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const body = await ctx.req.json();
      await rentalService.updateRentalStatus(id, body.status);
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async cancelRental(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      await rentalService.updateRentalStatus(id, "Cancelled");
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async approveRental(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      await rentalService.updateRentalStatus(id, "Reserved");
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
