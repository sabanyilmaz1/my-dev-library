import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";

export const LinkToPage = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button asChild>
      <Link
        className={cn(
          className,
          buttonVariants({ variant: "default" }),
          "bg-rose-600 hover:bg-rose-700 text-white"
        )}
        href={href}
      >
        {children}
      </Link>
    </Button>
  );
};
