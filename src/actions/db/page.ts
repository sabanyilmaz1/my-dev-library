"use server";
"server-only";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

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
  return pages;
};
