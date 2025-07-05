"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { createUser } from "@/actions/user";
import Link from "next/link";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const initialState = {
    error: "",
  };
  const [state, formAction, pending] = useActionState(createUser, initialState);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Créer un compte</CardTitle>
          <CardDescription>
            Créez un compte pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Prénom</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                  />
                </div>
                {/* Confirm Password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? "Inscription en cours..." : "Inscription"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Vous avez déjà un compte ?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Connexion
                </Link>
              </div>
              {state.error && (
                <div className="text-center text-sm text-red-500">
                  {state.error}
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        En cliquant sur continuer, vous acceptez nos{" "}
        <a href="#">Conditions d&apos;utilisation</a> et{" "}
        <a href="#">Politique de confidentialité</a>.
      </div>
    </div>
  );
}
