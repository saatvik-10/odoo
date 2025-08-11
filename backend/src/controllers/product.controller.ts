import { ProductService } from "@/services/product.service";
import {
  createProductSchema,
  updateProductSchema,
} from "@/validators/product.validator";
import type { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const productService = new ProductService();

export class ProductController {
  async getProducts(ctx: Context) {
    try {
      const products = await productService.getProducts();
      return ctx.json(products);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsByVendorId(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const products = await productService.getProductsByVendorId(id as string);
      return ctx.json(products);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductById(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const product = await productService.getProductById(id as string);
      return ctx.json(product);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createProduct(ctx: Context) {
    try {
      const vendor = ctx.get("userId");
      const body = createProductSchema.parse(await ctx.req.json());
      await productService.createProduct(vendor, body);
      return ctx.json(ReasonPhrases.CREATED, StatusCodes.CREATED);
    } catch (error) {
      console.error(error)
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProduct(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const body = updateProductSchema.parse(await ctx.req.json());
      await productService.updateProduct(id, body);
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProductPublic(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      const { isPublic } = await ctx.req.json();
      await productService.updateProductPublic(id, isPublic);
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProduct(ctx: Context) {
    try {
      const id = ctx.req.param("id");
      await productService.deleteProduct(id);
      return ctx.json(ReasonPhrases.OK, StatusCodes.OK);
    } catch (error) {
      return ctx.json(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
