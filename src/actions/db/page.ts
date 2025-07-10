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
  url: z
    .string()
    .min(1, "URL is required")
    .url("Must be a valid URL")
    .max(2048, "URL is too long"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters")
    .trim(),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag cannot be empty")
        .max(50, "Tag must be less than 50 characters")
        .regex(/^[a-zA-Z0-9\s\-_]+$/, "Tag contains invalid characters")
        .trim()
    )
    .min(1, "At least one tag is required")
    .max(10, "Maximum 10 tags allowed"),
});

export const createPage = async (
  prevState: {
    error: boolean;
    message: string;
    data: {
      url: string;
      title: string;
      description: string;
      tags: string[];
    };
  },
  formData: FormData
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return {
      error: true,
      message: "User not found",
      data: prevState.data,
    };
  }

  const newState = {
    ...prevState,
    data: {
      url: formData.get("url") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      tags: JSON.parse(formData.get("tags") as string),
    },
  };

  const parsed = createPageSchema.safeParse({
    url: formData.get("url"),
    title: formData.get("title"),
    description: formData.get("description"),
    tags: JSON.parse(formData.get("tags") as string),
  });

  if (!parsed.success) {
    console.log("error");
    const firstError = parsed.error.errors[0];
    return {
      error: true,
      message: firstError.message || "Invalid data provided",
      data: newState.data,
    };
  }

  await prisma.page.create({
    data: {
      url: parsed.data.url,
      title: parsed.data.title,
      description: parsed.data.description,
      thumbnail: "",
      tags: [{ id: "1", label: "React", value: "react" }],
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  const tags = parsed.data.tags.map((tag) => ({
    id: tag,
    label: tag,
    value: tag.toLowerCase(),
    userId: user.id,
  }));

  if (tags && tags.length > 0) {
    await prisma.tag.createMany({
      data: tags,
      skipDuplicates: true,
    });
  }

  return {
    error: false,
    message: "Page created",
    data: {
      url: "",
      title: "",
      description: "",
      tags: [],
    },
  };
};
