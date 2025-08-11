import { UserService } from "@/services/user.service";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";

const userServices = new UserService();

export class userController {
    async getMe(ctx : Context){
        try {
            const userId = ctx.get("userId")
            const user = await userServices.getUserById(userId);
            return ctx.json(user,200);
        } catch (error) {
            
        }
    }
}