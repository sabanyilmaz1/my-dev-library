"use client";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import React, { useActionState } from "react";
import { signOut } from "@/actions/user";

export const ProfilLogout = () => {
  const [state, action, pending] = useActionState(signOut, { error: "" });

  return (
    <form action={action}>
      <Button
        variant="ghost"
        className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
      >
        <LogOut size={16} />

        {pending ? (
          <p className="ml-2 flex items-center gap-2">
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            <span>Déconnexion</span>
          </p>
        ) : (
          <span className="ml-2">Déconnexion</span>
        )}
        {state.error && <p className="ml-2">{state.error}</p>}
      </Button>
    </form>
  );
};
