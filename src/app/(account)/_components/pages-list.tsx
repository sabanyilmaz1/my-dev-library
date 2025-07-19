import React, { Suspense } from "react";
import { PageCard } from "./page-card";
import { getPagesByUserId } from "@/actions/db/page";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PagesListProps {
  searchParams?: { tags?: string };
}

export const PagesList = async ({ searchParams }: PagesListProps) => {
  const selectedTags = searchParams?.tags
    ? searchParams.tags.split(",").filter((tag) => tag.trim())
    : undefined;

  return (
    <section className="flex-1 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-light text-stone-800 mb-2">
          {selectedTags && selectedTags.length > 0
            ? `Pages filtrées par: ${selectedTags.join(", ")}`
            : "All Pages"}
        </h2>
        {selectedTags && selectedTags.length > 0 && (
          <p className="text-sm text-stone-600">
            Cliquez sur les tags pour les désélectionner
          </p>
        )}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <RenderPages selectedTags={selectedTags} />
      </Suspense>
    </section>
  );
};

const RenderPages = async ({ selectedTags }: { selectedTags?: string[] }) => {
  const pages = await getPagesByUserId();

  if (pages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-stone-400 mb-4">
          <p className="text-lg font-medium text-stone-600 mb-2">
            Aucune page trouvée
          </p>
          <p className="text-sm text-stone-500">
            {selectedTags && selectedTags.length > 0
              ? "Essayez de modifier les filtres de tags"
              : "Commencez par ajouter votre première page"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {pages.map((page) => (
          <PageCard key={page.id} page={page} />
        ))}
      </div>
    </ScrollArea>
  );
};
