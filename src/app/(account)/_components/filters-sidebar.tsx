import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const selectedTags = ["React", "Next.js", "Tailwind CSS"];
const allTags = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
];

export const FiltersSidebar = () => (
  <div className="p-4 md:p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-sm font-medium text-stone-700 tracking-wide uppercase">
        Filters
      </h2>
      {selectedTags.length > 0 && (
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
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              // onClick={() => toggleTag(tag)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                isSelected
                  ? "bg-stone-100 text-stone-800 shadow-sm"
                  : "hover:bg-stone-50 text-stone-600"
              }`}
            >
              <span className="text-sm font-medium">{tag}</span>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  </div>
);
