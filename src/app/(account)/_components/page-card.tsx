import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Page } from "../_types/page";

export const PageCard = ({ page }: { page: Page }) => {
  return (
    <Card
      key={page.id}
      className="group relative overflow-hidden border-stone-200/60 bg-white/60 backdrop-blur-sm hover:shadow-xl hover:shadow-stone-200/40 transition-all duration-300 hover:-translate-y-1"
    >
      <CardContent className="p-0">
        <div className="relative h-32 bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
          <iframe
            src={page.url}
            className="border-0 pointer-events-none"
            style={{
              width: "300%",
              height: "300%",
              transform: "scale(0.33)",
              transformOrigin: "top left",
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
          {/* Hover Actions */}
          <div
            className={`absolute top-2 right-2 flex space-x-1 transition-all duration-200
            `}
          >
            <Button
              size="sm"
              variant="secondary"
              className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-sm"
              // onClick={() => copyUrl(website.url)}
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
              <span className="text-lg">🟠</span>
              <h3 className="font-medium text-stone-800 truncate text-sm">
                {page.title}
              </h3>
            </div>
          </div>

          <p className="text-xs text-stone-600 mb-3 line-clamp-2 leading-relaxed">
            {page.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {page.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-xs bg-stone-100 text-stone-600 hover:bg-stone-200 cursor-pointer"
                // onClick={() => toggleTag(tag)}
              >
                {tag.label}
              </Badge>
            ))}
            {page.tags.length > 3 && (
              <Badge
                variant="secondary"
                className="text-xs bg-stone-100 text-stone-500"
              >
                +{page.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
