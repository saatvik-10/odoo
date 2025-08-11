import { AdminService } from "@/services/admin.service";
import {
  adminSchema,
} from "@/validators/admin.validator";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const adminService = new AdminService();

export class AdminController {
  async getMe(ctx: Context) {
    try {
      const adminId = ctx.get("adminId");
      const admin = await adminService.getAdminById(adminId);
      return ctx.json(
        {
          admin: adminSchema.parse({
            ...admin?.toObject(),
            id: admin?._id.toString(),
          }),
        },
        StatusCodes.OK
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json({
        error: "An error occurred while fetching admin data",
      }, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getAdminById(ctx: Context) {
    try{
        const id = ctx.req.param("id");
        const admin = await adminService.getAdminById(id);
        if (!admin) {
          return ctx.json({ error: "Admin not found" }, StatusCodes.NOT_FOUND);
        }
        return ctx.json({
            admin: adminSchema.parse({
                ...admin.toObject(),
                _id: admin._id.toString(),
            }),
        }, StatusCodes.OK);
    }
    catch (error) {
        console.error(error);
        return ctx.json({
            error : "An error occured while fetching the admin data"
        },StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
