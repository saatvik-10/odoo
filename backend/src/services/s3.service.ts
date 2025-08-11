import {getFileKey, getFileUrl} from '../lib/s3.lib'
import {s3} from '../utils/s3'
import {PutObjectCommand, type PutObjectCommandOutput} from '@aws-sdk/client-s3'
import {MediaService} from "./media.service";

const mediaService = new MediaService()
export default class S3Service {
    async uploadFile(
        file: File,
        fileName: string
    ): Promise<PutObjectCommandOutput> {
        const key = getFileKey(fileName)
        const command = new PutObjectCommand({
            Key: key,
            Body: Buffer.from(await file.arrayBuffer()),
            Bucket: process.env.S3_BUCKET,
            ACL: 'public-read',
        })
        const image = await s3.send(command)
        await mediaService.createMedia({
            eTag: image.ETag,
            key,
            url: getFileUrl(fileName),
            createdAt: new Date().toISOString(),
        })
        return image
    }
}