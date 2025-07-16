"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Page } from "@prisma/client";
import { getFaviconUrl } from "@/utils/get-favicon-url";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const PageCard = ({ page }: { page: Page }) => {
  const faviconUrl = getFaviconUrl(page.url);
  const tags = page.tags as { id: string; label: string }[];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleTagClick = (tagLabel: string) => {
    const params = new URLSearchParams(searchParams);
    const currentTags = params.get("tags");

    let newTags: string[] = [];
    if (currentTags) {
      const tagsArray = currentTags.split(",");
      if (tagsArray.includes(tagLabel)) {
        // Retirer le tag s'il est déjà sélectionné
        newTags = tagsArray.filter((tag) => tag !== tagLabel);
      } else {
        // Ajouter le tag s'il n'est pas sélectionné
        newTags = [...tagsArray, tagLabel];
      }
    } else {
      // Premier tag sélectionné
      newTags = [tagLabel];
    }

    if (newTags.length > 0) {
      params.set("tags", newTags.join(","));
    } else {
      params.delete("tags");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(page.url);
      // Optionnel: ajouter un toast de confirmation
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  return (
    <Card
      key={page.id}
      className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 pb-6 pt-0"
    >
      <CardContent className="p-0">
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
          {page.thumbnail ? (
            <img
              src={page.thumbnail}
              alt={`Screenshot of ${page.title}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget
                  .nextElementSibling as HTMLElement;
                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />
          ) : null}

          {/* Fallback placeholder */}
          <div
            className={`${
              page.thumbnail ? "hidden" : "flex"
            } w-full h-full items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200`}
            style={{ display: page.thumbnail ? "none" : "flex" }}
          >
            <div className="text-center text-stone-400">
              <div className="text-2xl mb-1">🌐</div>
              <div className="text-xs">No preview</div>
            </div>
          </div>

          {/* Hover Actions */}
          <div className="absolute top-2 right-2 flex space-x-1 transition-all duration-200 opacity-0 group-hover:opacity-100">
            <Button
              size="sm"
              variant="secondary"
              className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-sm"
              onClick={copyUrl}
            >
              <Copy className="h-3 w-3 text-stone-600" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-sm"
              asChild
            >
              <a href={page.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 text-stone-600" />
              </a>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              {faviconUrl ? (
                <img
                  src={faviconUrl}
                  alt={`${page.title} favicon`}
                  className="w-4 h-4 flex-shrink-0"
                  onError={(e) => {
                    // Fallback to emoji if favicon fails to load
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.setAttribute(
                      "style",
                      "display: inline"
                    );
                  }}
                />
              ) : null}
              <span
                className="text-lg"
                style={{ display: faviconUrl ? "none" : "inline" }}
              >
                🟠
              </span>
              <h3 className="font-medium text-stone-800 truncate text-sm">
                {page.title}
              </h3>
            </div>
          </div>

          <p className="text-xs text-stone-600 mb-3 line-clamp-2 leading-relaxed">
            {page.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {tags &&
              tags.map((tag) => {
                const currentTags = searchParams.get("tags");
                const isSelected = currentTags
                  ? currentTags.split(",").includes(tag.label)
                  : false;

                return (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className={`text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground hover:bg-primary/80"
                        : "bg-accent text-accent-foreground hover:bg-accent/80"
                    }`}
                    onClick={() => handleTagClick(tag.label)}
                  >
                    {tag.label}
                  </Badge>
                );
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
