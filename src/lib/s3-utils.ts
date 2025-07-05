import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

function getS3Client() {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY is not set");
  }

  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

export async function uploadFileToS3({
  file,
  path,
  contentType,
}: {
  file: File;
  path: string;
  contentType: string;
}) {
  const s3Client = getS3Client();
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  const fileName = file.name.split(".")[0];
  const fileExtension = file.name.split(".").pop();
  const filePath = `${path}/${fileName}.${fileExtension}`;
  console.log(filePath);
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: filePath,
    Body: buffer,
    ContentType: contentType || file.type,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error(error);
    throw error;
  }

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;
}

export async function deleteFileFromS3({ path }: { path: string }) {
  const s3Client = getS3Client();
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: path,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
