"use server";
"server-only";

import { uploadFileToS3 } from "@/lib/s3-utils";
import { getSessionUser } from "./user";

export const uploadImage = async (formData: FormData, name: string) => {
  const user = await getSessionUser();
  if (!user) {
    return { error: "User not found" };
  }
  const file = formData.get("file") as File;
  if (
    !file ||
    !(file instanceof File) ||
    file.size === 0 ||
    file.name === "undefined"
  ) {
    return { error: "No valid file selected" };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "File must be an image" };
  }

  // const maxSize = 5 * 1024 * 1024;
  // if (file.size > maxSize) {
  //   return { error: "File size must be less than 5MB" };
  // }

  try {
    const url = await uploadFileToS3({
      file,
      prefix: `users/${user.user.id}`,
      fileName: name,
    });

    if (!url) {
      return { error: "Failed to upload file" };
    }

    return { success: true, url };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload file" };
  }
};

// export const deleteImage = async (path: string) => {
//   const user = await getSessionUser();
//   if (!user) {
//     return { error: "User not found" };
//   }
//   await deleteFileFromS3({
//     path: `users/${user.user.id}/${path}`,
//   });
// };
