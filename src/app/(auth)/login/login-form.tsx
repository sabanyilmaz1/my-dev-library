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
import { signIn } from "@/actions/user";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const initialState = {
    error: "",
  };
  const [state, formAction, pending] = useActionState(signIn, initialState);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bon retour parmi nous</CardTitle>
          <CardDescription>
            Connectez-vous à votre compte pour accéder à votre espace
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
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a> */}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? "Connexion..." : "Connexion"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Pas encore de compte ?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Créer un compte
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
