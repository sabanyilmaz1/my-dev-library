"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useMemo, useCallback, useState, useEffect } from "react";

interface Tag {
  id: string;
  label: string;
  value: string;
}

interface FiltersSidebarClientProps {
  tags: Tag[];
}

// Hook personnalisé pour le debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const FiltersSidebarClientDebounced = ({ tags }: FiltersSidebarClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // État local pour l'interface utilisateur (immédiat)
  const [localTags, setLocalTags] = useState<string[]>([]);

  // Debounce pour les mises à jour URL (après 150ms)
  const debouncedTags = useDebounce(localTags, 150);

  // Initialiser l'état local avec les searchParams
  useEffect(() => {
    const tagsParam = searchParams.get("tags");
    const currentTags = tagsParam ? tagsParam.split(",") : [];
    setLocalTags(currentTags);
  }, [searchParams]);

  // Mettre à jour l'URL quand les tags debouncés changent
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (debouncedTags.length > 0) {
      params.set("tags", debouncedTags.join(","));
    } else {
      params.delete("tags");
    }

    // Éviter la mise à jour si les params sont identiques
    const currentUrl = `${pathname}?${params.toString()}`;
    const expectedUrl = `${pathname}?${searchParams.toString()}`;
    
    if (currentUrl !== expectedUrl) {
      replace(currentUrl);
    }
  }, [debouncedTags, pathname, replace, searchParams]);

  const selectedTagsSet = useMemo(() => {
    return new Set(localTags);
  }, [localTags]);

  const toggleTag = useCallback((tagLabel: string) => {
    setLocalTags(prev => {
      if (prev.includes(tagLabel)) {
        return prev.filter(tag => tag !== tagLabel);
      } else {
        return [...prev, tagLabel];
      }
    });
  }, []);

  const clearFilters = useCallback(() => {
    setLocalTags([]);
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-stone-700 tracking-wide uppercase">
          Filters
        </h2>
        {localTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-stone-500 hover:text-stone-700 h-6 px-2"
          >
            Clear
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {tags.map((tag) => {
            const isSelected = selectedTagsSet.has(tag.label);
            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.label)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-150 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-stone-50 text-stone-600"
                }`}
              >
                <span className="text-sm font-medium">{tag.label}</span>
                {isSelected && (
                  <span className="text-xs bg-primary-foreground/20 text-primary-foreground px-2 py-1 rounded-full">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
          {tags.length === 0 && (
            <div className="text-center py-8 text-stone-500">
              <p className="text-sm">Aucun tag disponible</p>
              <p className="text-xs mt-1">Ajoutez des pages avec des tags</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};