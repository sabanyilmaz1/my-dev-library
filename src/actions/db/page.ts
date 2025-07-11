"use server";
"server-only";

import { withAuth, validatedActionWithUser } from "@/lib/auth/middleware";
import prisma from "@/lib/prisma";
import { Page } from "@prisma/client";
import { z } from "zod";

export const getPagesByUserId = async () => {
  return withAuth(async (user) => {
    const pages = await prisma.page.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });
    return pages as Page[];
  });
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

type CreatePageState = {
  error: boolean;
  message: string;
  data: {
    url: string;
    title: string;
    description: string;
    tags: string[];
  };
};

const createPageFormSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.string().transform((str) => {
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  }),
});

export const createPage = async (
  prevState: CreatePageState,
  formData: FormData
): Promise<CreatePageState> => {
  const newState = {
    ...prevState,
    data: {
      url: formData.get("url") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      tags: JSON.parse((formData.get("tags") as string) || "[]"),
    },
  };

  try {
    const result = await validatedActionWithUser(
      createPageFormSchema,
      async (formData, _, user) => {
        const parsed = createPageSchema.safeParse({
          url: formData.url,
          title: formData.title,
          description: formData.description,
          tags: formData.tags,
        });

        if (!parsed.success) {
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
      }
    )(formData);

    return result;
  } catch (error) {
    return {
      error: true,
      message: error instanceof Error ? error.message : "User not found",
      data: newState.data,
    };
  }
};
