import { generateJWT, getPasswordKeys, validatePassword } from "@/lib/auth.lib";
import { AdminService } from "@/services/admin.service";
import { UserService } from "@/services/user.service";
import { VendorService } from "@/services/vendor.services";
import { adminSchema, registerAdminSchema } from "@/validators/admin.validator";
import {
  loginUserSchema,
  registerUserSchema,
  userSchema,
} from "@/validators/user.validator";
import {
  loginVendorSchema,
  registerVendorSchema,
  vendorSchema,
} from "@/validators/vendor.validator";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const userServices = new UserService();
const vendorService = new VendorService();
const adminService = new AdminService();

export class AuthController {
  async userLogin(ctx: Context) {
    try {
      const body = loginUserSchema.parse(await ctx.req.json());
      const user = await userServices.getUserByEmail(body.email);
      if (!user) {
        return ctx.json({ error: "User not found" }, StatusCodes.NOT_FOUND);
      }
      const isPasswordValid = await validatePassword(body.password, user.hash);
      if (!isPasswordValid) {
        return ctx.json(
          { error: "Invalid password" },
          StatusCodes.UNAUTHORIZED
        );
      }
      const token = await generateJWT({
        _id: user._id.toString(),
        role: "user",
      });
      return ctx.json(
        {
          token,
          user: userSchema.parse({
            ...user.toObject(),
            _id: user._id.toString(),
          }),
        },
        StatusCodes.OK
      );
    } catch (error) {
        console.error(error);
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(

        { error: "An error occurred during login" },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async userRegister(ctx: Context) {
    try {
      const body = registerUserSchema.parse(await ctx.req.json());
      const existingUser = await userServices.getUserByEmail(body.email);
      if (existingUser) {
        return ctx.json({ error: "User already exists" }, StatusCodes.CONFLICT);
      }
      const { hash } = await getPasswordKeys(body.password);
      const createdUser = await userServices.createUser(body, hash);
      const token = await generateJWT({
        _id: createdUser._id.toString(),
        role: "user",
      });
      return ctx.json({
        token,
        user: createdUser,
      },StatusCodes.CREATED);
    } catch (error) {
        console.error(error);
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json({
        error: "Interval Server Error",
      },StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async vendorLogin(ctx: Context) {
    try {
      const body = loginVendorSchema.parse(await ctx.req.json());
      const vendor = await userServices.getUserByEmail(body.email);
      if (!vendor) {
        return ctx.json({ error: "Vendor not found" }, StatusCodes.NOT_FOUND);
      }
      const isPasswordValid = await validatePassword(
        body.password,
        vendor.hash
      );
      if (!isPasswordValid) {
        return ctx.json(
          { error: "Invalid password" },
          StatusCodes.UNAUTHORIZED
        );
      }
      const token = await generateJWT({
        _id: vendor._id.toString(),
        role: "vendor",
      });
      return ctx.json(
        {
          token,
          vendor: vendorSchema.parse({
            ...vendor.toObject(),
            _id: vendor._id.toString(),
          }),
        },
        StatusCodes.OK
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        {
          error: "Interval Server Error",
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async vendorRegister(ctx: Context) {
    try {
      const body = registerVendorSchema.parse(await ctx.req.json());

      const existingVendor = await vendorService.getVendorByEmail(body.email);
      if (existingVendor) {
        return ctx.json(
          { error: "Vendor already exists" },
          StatusCodes.CONFLICT
        );
      }
      const { hash } = await getPasswordKeys(body.password);
      const createdVendor = await vendorService.createVendor(body, hash);
      const token = await generateJWT({
        _id: createdVendor._id.toString(),
        role: "vendor",
      });
      return ctx.json({
        token,
        vendor: createdVendor,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        {
          error: "Interval Server Error",
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async adminLogin(ctx: Context) {
    try {
      const body = adminSchema.parse(await ctx.req.json());
      const admin = await adminService.getAdminByEmail(body.email);
      if (!admin) {
        return ctx.json({ error: "Admin not found" }, StatusCodes.NOT_FOUND);
      }
      const isPasswordValid = await validatePassword(body.password, admin.hash);
      if (!isPasswordValid) {
        return ctx.json(
          { error: "Invalid password" },
          StatusCodes.UNAUTHORIZED
        );
      }
      const token = await generateJWT({
        _id: admin._id.toString(),
        role: "admin",
      });
      return ctx.json(
        {
          token,
          admin: adminSchema.parse({
            ...admin.toObject(),
            _id: admin._id.toString(),
          }),
        },
        StatusCodes.OK
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        {
          error: "An error occurred during admin login",
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async adminRegister(ctx: Context) {
    try {
      const body = registerAdminSchema.parse(await ctx.req.json());
      const existingAdmin = await adminService.getAdminByEmail(body.email);
      if (existingAdmin) {
        return ctx.json(
          { error: "Admin already exists" },
          StatusCodes.CONFLICT
        );
      }
      const { hash } = await getPasswordKeys(body.password);
      const createdAdmin = await adminService.createAdmin({
        email: body.email,
        password: hash,
      });
      const token = await generateJWT({
        _id: createdAdmin._id.toString(),
        role: "admin",
      });
      return ctx.json(
        {
          token,
          admin: createdAdmin,
        },
        StatusCodes.CREATED
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return ctx.json(error.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        {
          error: "An error occurred during admin registration",
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
