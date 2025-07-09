import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_API_URL ?? "",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  },
});

export async function uploadFileToS3(params: {
  file: File;
  prefix: string;
  fileName?: string;
}) {
  const fileBuffer = await params.file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const fileName = params.fileName ?? params.file.name.split(".").pop();

  const fileExtension = params.file.name.split(".").pop();
  const uniqueFileName = `${params.prefix}/${fileName}.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: uniqueFileName,
    Body: buffer,
    ContentType: params.file.type,
  });

  try {
    await s3.send(command);
    return `${process.env.R2_URL}/${uniqueFileName}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
