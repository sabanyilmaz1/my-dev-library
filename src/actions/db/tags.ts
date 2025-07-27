"use server";
"server-only";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { Tag } from "@prisma/client";

export const getTagsByUserId = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    throw new Error("User not found");
  }

  const tags = await prisma.tag.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      numbers_pages: "desc",
    },
  });

  return tags as Tag[];
};
