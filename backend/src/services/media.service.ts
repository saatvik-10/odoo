import { MediaModel } from "@/models/media.model";

export class MediaService{
    async createMedia(data: any){
        MediaModel.create(data)
    }
}