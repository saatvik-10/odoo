import {randomUUID} from "node:crypto";

export const getFileKey = (fileName: string) => {
    return `${process.env.S3_OBJECT_FOLDER}/${fileName}`
}

export const getFileUrl = (filename: string) => {
    return `${process.env.S3_OBJECT_URL}/${getFileKey(filename)}`
}

export const modifyFileName = (filename: string) => {
    return `${randomUUID()}-${filename}`
}