"use server";
"server-only";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { Page } from "@prisma/client";
import { z } from "zod";

export const getPagesByUserId = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    throw new Error("User not found");
  }

  const pages = await prisma.page.findMany({
    where: {
      user: {
        id: user.id,
      },
    },
  });
  return pages as Page[];
};

const createPageSchema = z.object({
  url: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).min(1),
});

export const createPage = async (
  prevState: {
    error: boolean;
    message: string;
  },
  formData: FormData
) => {
  // TODO: Implement create page
  const parsed = createPageSchema.safeParse({
    url: formData.get("url"),
    title: formData.get("title"),
    description: formData.get("description"),
    tags: JSON.parse(formData.get("tags") as string),
  });
  console.log(parsed);

  return {
    error: true,
    message: "Page created",
  };
};
