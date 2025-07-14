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
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FiltersSidebar } from "./filters-sidebar";
import { AddPageModal } from "./add-page-modal";
import { AddTweetModal } from "./add-tweet-modal";

export const HeaderPage = () => {
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
              <FiltersSidebar />
            </SheetContent>
          </Sheet>

          <h1 className="text-lg md:text-xl font-light text-stone-800 tracking-wide">
            Dev Library
          </h1>
          <Separator
            orientation="vertical"
            className="h-6 bg-stone-300 hidden md:block"
          />

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input
              placeholder="Search websites, tags, or descriptions..."
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10 border-stone-200 bg-stone-50/50 focus:bg-white transition-colors duration-200"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <AddPageModal />
          <AddTweetModal />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-4 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            placeholder="Search websites..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 border-stone-200 bg-stone-50/50 focus:bg-white transition-colors duration-200"
          />
        </div>
      </div>
    </header>
  );
};
