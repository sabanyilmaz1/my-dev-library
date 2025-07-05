"use server";
"server-only";

import { z } from "zod";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { validatedAction } from "./helper";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  name: z.string().min(1),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createUser = validatedAction(createUserSchema, async (data) => {
  const { email, password, confirmPassword, name } = data;
  if (password !== confirmPassword) {
    return { error: "Les mots de passe ne correspondent pas" };
  }
  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });
  } catch (error) {
    return { error: "Erreur lors de la création du compte : " + error };
  }
  redirect("/home");
});

export const signIn = validatedAction(signInSchema, async (data) => {
  const { email, password } = data;
  try {
    await auth.api.signInEmail({
      body: { email, password },
    });
  } catch (error) {
    return { error: "Erreur lors de la connexion : " + error };
  }
  redirect("/home");
});

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    redirect("/login");
  } catch (error) {
    return { error: "Erreur lors de la déconnexion : " + error };
  }
};

export const getSessionUser = async () => {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  return user;
};
