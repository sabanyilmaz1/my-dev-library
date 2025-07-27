"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { AddPageModal } from "./add-page-modal";
import { AddTweetModal } from "./add-tweet-modal";
import { Tag } from "@prisma/client";
import { FiltersSidebarClient } from "./filters-sidebar-client";

export const HeaderPage = ({ tags }: { tags: Tag[] }) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-amber-50/30  backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Menu Button */}
          <Sheet
            open={isMobileFiltersOpen}
            onOpenChange={setIsMobileFiltersOpen}
          >
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden p-2">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 bg-white/95 backdrop-blur-sm"
            >
              <SheetHeader>
                <SheetTitle className="text-stone-800"></SheetTitle>
              </SheetHeader>
              <FiltersSidebarClient tags={tags} />
            </SheetContent>
          </Sheet>

          <h1 className="text-lg md:text-xl font-light text-stone-800 tracking-wide">
            Dev Library
          </h1>
          <Separator
            orientation="vertical"
            className="h-6 bg-stone-300 hidden md:block"
          />
        </div>
        <div className="flex items-center space-x-2">
          <AddPageModal />
          <AddTweetModal />
        </div>
      </div>
    </header>
  );
};
