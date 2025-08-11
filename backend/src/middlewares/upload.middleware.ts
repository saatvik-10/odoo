import type {Context, Next} from "hono";
import S3Service from "../services/s3.service";
import {getFileUrl, modifyFileName} from "../lib/s3.lib";

const s3Service = new S3Service()
export const uploadMiddleware = async (ctx: Context, next: Next) => {
    try {
        const body = await ctx.req.parseBody({all: true})
        let files = body['files'] as File[]
        const fileUrls: string[] = []
        if (!Array.isArray(files)) {
            if (files) {
                files = [files]
            } else {
                files = []
            }
        }
        const uploadedFiles = await Promise.all(files.map(async (file) => {
            const fileName = modifyFileName(file.name)
            fileUrls.push(getFileUrl(fileName))
            return s3Service.uploadFile(file, fileName)
        }))
        ctx.set('files', fileUrls)
        await next()
        return
    } catch (err) {
        console.error(err)
        return ctx.json({message: "Internal Server Error"}, 500)
    }
}