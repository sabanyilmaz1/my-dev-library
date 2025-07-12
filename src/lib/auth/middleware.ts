import { z } from "zod";
import { auth } from "./auth";
import { headers } from "next/headers";
import { User } from "better-auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User
) => Promise<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (formData: FormData): Promise<T> => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      throw new Error("User is not authenticated");
    }

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message } as T;
    }

    return action(result.data, formData, user);
  };
}

// Helper function for authenticated actions that don't need validation
export async function withAuth<T>(
  action: (user: User) => Promise<T>
): Promise<T> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  return action(user);
}
