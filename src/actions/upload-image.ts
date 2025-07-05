"use server";
"server-only";

import { deleteFileFromS3, uploadFileToS3 } from "@/lib/s3-utils";
import { getSessionUser } from "./user";

export const uploadImage = async (
  formData: FormData,
  slugPage: string,
  name: string
) => {
  const user = await getSessionUser();
  if (!user) {
    return { error: "User not found" };
  }
  const file = formData.get("file") as File;
  if (!(file instanceof File)) {
    return { error: "File not found" };
  }

  //Create a new file with the name of the input
  const newFile = new File([file], `${name}.${file.name.split(".").pop()}`, {
    type: file.type,
    lastModified: file.lastModified,
  });

  const fileUrl = await uploadFileToS3({
    file: newFile,
    path: `users/${user.user.id}/${slugPage}`,
    contentType: file.type,
  });
  return { url: fileUrl };
};

export const deleteImage = async (path: string) => {
  const user = await getSessionUser();
  if (!user) {
    return { error: "User not found" };
  }
  await deleteFileFromS3({
    path: `users/${user.user.id}/${path}`,
  });
};
