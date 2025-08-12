import { MediaService } from "@/services/media.service";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";

const mediaService = new MediaService();

export class MediaController {
  async uploadMedia(ctx: Context) {
    try {
      const files = ctx.get("files");
      if (!files || !files.length) {
        return ctx.json(
          { error: "No files uploaded" },
          StatusCodes.BAD_REQUEST
        );
      }
      return ctx.json(files, StatusCodes.CREATED);
    } catch (error) {
      return ctx.json(
        { error: "Failed to upload media" },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
