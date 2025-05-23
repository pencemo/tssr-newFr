// src/services/s3Service.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const AWS_REGION = import.meta.env.VITE_AWS_REGION;
const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFile = async (file) => {
  const key = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

  // Convert file (Blob/File) to ArrayBuffer
  const fileBuffer = await file.arrayBuffer();

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return {
      fileName: file.name,
      url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`,
      status: "success",
    };
  } catch (error) {
    return {
      fileName: file.name,
      error: error.message,
      status: "failed",
    };
  }
};