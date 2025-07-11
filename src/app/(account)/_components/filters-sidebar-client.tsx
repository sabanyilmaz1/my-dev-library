"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useMemo, useCallback, useTransition } from "react";

interface Tag {
  id: string;
  label: string;
  value: string;
}

interface FiltersSidebarClientProps {
  tags: Tag[];
}

export const FiltersSidebarClient = ({ tags }: FiltersSidebarClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // Mémoiser les tags sélectionnés pour éviter le recalcul
  const selectedTags = useMemo(() => {
    const tagsParam = searchParams.get('tags');
    return tagsParam ? tagsParam.split(',') : [];
  }, [searchParams]);

  // Mémoiser les tags sélectionnés en Set pour des recherches plus rapides
  const selectedTagsSet = useMemo(() => {
    return new Set(selectedTags);
  }, [selectedTags]);

  // Fonction pour basculer la sélection d'un tag (mémorisée avec transition)
  const toggleTag = useCallback((tagLabel: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      const currentTags = params.get('tags');
      
      let newTags: string[] = [];
      if (currentTags) {
        const tagsArray = currentTags.split(',');
        if (tagsArray.includes(tagLabel)) {
          // Retirer le tag s'il est déjà sélectionné
          newTags = tagsArray.filter(tag => tag !== tagLabel);
        } else {
          // Ajouter le tag s'il n'est pas sélectionné
          newTags = [...tagsArray, tagLabel];
        }
      } else {
        // Premier tag sélectionné
        newTags = [tagLabel];
      }

      if (newTags.length > 0) {
        params.set('tags', newTags.join(','));
      } else {
        params.delete('tags');
      }
      
      replace(`${pathname}?${params.toString()}`);
    });
  }, [searchParams, pathname, replace, startTransition]);

  // Fonction pour effacer tous les filtres (mémorisée avec transition)
  const clearFilters = useCallback(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete('tags');
      replace(`${pathname}?${params.toString()}`);
    });
  }, [searchParams, pathname, replace, startTransition]);

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-stone-700 tracking-wide uppercase">
          Filters
        </h2>
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={isPending}
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
                disabled={isPending}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-100 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-stone-50 text-stone-600"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
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