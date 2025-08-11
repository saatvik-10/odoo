import { TransferService } from "@/services/transfer.service";
import {
  createTransferSchema,
  type CreateTransfer,
} from "@/validators/transfer.validator";
import type { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const transferService = new TransferService();

export class TransferController {
  async createTransfer(ctx: Context) {
    try {
      let body: CreateTransfer = await ctx.req.json();
      body.pickupDate = new Date(body.pickupDate);
      body = createTransferSchema.parse(body);
      const rental = await transferService.getTransferByID(body.rentalID);
      if (!rental) {
        return ctx.json(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
      }
      await transferService.createTransfer(
        body,
        rental.user.toString(),
        rental.vendor.toString()
      );
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getTransferByID(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const transfer = await transferService.getTransferByID(id);
      return ctx.json(transfer, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getTransferByRentalID(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const transfer = await transferService.getTransferByRentalID(id);
      return ctx.json(transfer, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getTransferByUserID(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const transfer = await transferService.getTransferByUserID(id);
      return ctx.json(transfer, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getTransferByVendorID(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const transfer = await transferService.getTransferByVendorID(id);
      return ctx.json(transfer, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateTransferByID(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const body = createTransferSchema.parse(await ctx.req.json());
      await transferService.updateTransferByID(id, body);
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateTransferStatus(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const { status } = await ctx.req.json();
      await transferService.updateTransferStatus(id, status);
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
