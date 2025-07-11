import { getTagsByUserId } from "@/actions/db/tags";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export const FiltersSidebar = async () => {
  const tags = await getTagsByUserId();
  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-stone-700 tracking-wide uppercase">
          Filters
        </h2>
        {tags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            // onClick={() => setSelectedTags([])}
            className="text-stone-500 hover:text-stone-700 h-6 px-2"
          >
            Clear
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {tags.map((tag) => {
            const isSelected = false;
            return (
              <button
                key={tag.id}
                // onClick={() => toggleTag(tag)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-stone-100 text-stone-800 shadow-sm"
                    : "hover:bg-stone-50 text-stone-600"
                }`}
              >
                <span className="text-sm font-medium">{tag.label}</span>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
