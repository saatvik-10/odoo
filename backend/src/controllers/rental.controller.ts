import { rentalSchema } from "@/models/rental.model";
import { CouponService } from "@/services/coupon.service";
import { ProductService } from "@/services/product.service";
import { RentalService } from "@/services/rental.service";
import { TransactionService } from "@/services/transaction.service";
import {
  cancelRentalSchema,
  createRentalSchema,
  type CreateRental,
} from "@/validators/rental.validator";
import type { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const rentalService = new RentalService();
const productService = new ProductService();
const couponService = new CouponService();
const transactionService = new TransactionService();

export class RentalController {
  async createRental(ctx: Context) {
    try {
      const user = ctx.get("userId");
      let body: CreateRental = await ctx.req.json();
      body.startDate = new Date(body.startDate);
      body.endDate = new Date(body.endDate);
      body = createRentalSchema.parse(body);
      const products = await productService.getProductsFromIDList(
        body.products.map((product) => product.product),
      );
      if (products.length < 1 || products.length != body.products.length) {
        return ctx.json(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
      }
      if (products.find((product) => product == null)) {
        return ctx.json(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
      }
      let amt = 0;
      products.forEach((product) => {
        if (!product) {
          return;
        }
        let price = product.price;
        for (let i = 0; i < product.specialPrices.length; i++) {
          if (
            body.startDate >= product.specialPrices[i].startDate! &&
            body.endDate <= product.specialPrices[i].endDate!
          ) {
            price = product.specialPrices[i];
            break;
          }
        }

        switch (body.duration.durationType) {
          case "monthly":
            amt += price!.monthly ?? 0 * body.duration.durationValue;
            break;
          case "daily":
            amt += price!.daily ?? 0 * body.duration.durationValue;
            break;
          case "hourly":
            amt += price!.hourly ?? 0 * body.duration.durationValue;
            break;
          default:
        }
      });
      let tax = amt + amt * 0.18;

      //TODO: Check if products are available for the same time.
      //
      //TODO: Reduce available quantity of products.

      //TODO: Check if coupon code is applicable and apply it.
      let couponDiscount = 0;
      if (body.couponCode) {
        const coupon = await couponService.getCouponByCode(body.couponCode);
        if (coupon) {
          if (coupon.mov > amt) {
            couponDiscount = coupon.discount;
          }
        }
      }

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
      const rentalID = Math.floor(Math.random() * 1000000); // Generate a random rental ID
      await rentalService.createRental(
        user,
        vendor.toString(),
        rentalID,
        body,
        {
          amt,
          tax,
          couponDiscount,
        },
      );

      const orderID = await transactionService.createTransaction(
        rentalID,
        amt + tax - couponDiscount,
      );

      return ctx.json(
        {
          order_id: orderID,
        },
        StatusCodes.CREATED,
      );
    } catch (error) {
      console.error(error);
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRentalsForUser(ctx: Context) {
    try {
      const user = ctx.get("userId");
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
      const body = cancelRentalSchema.parse(await ctx.req.json());
      await rentalService.cancelRental(id, body.reason);
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
