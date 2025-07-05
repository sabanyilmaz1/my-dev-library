"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Star,
  ExternalLink,
  Copy,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for demonstration
const mockWebsites = [
  {
    id: 1,
    title: "React Documentation",
    url: "https://react.dev",
    description:
      "Official React documentation with hooks, components, and best practices",
    tags: ["React", "Documentation", "Frontend"],
    favicon: "⚛️",
    isFavorite: true,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 2,
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "Utility-first CSS framework for rapid UI development",
    tags: ["CSS", "Framework", "Design"],
    favicon: "🎨",
    isFavorite: false,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 3,
    title: "Vercel",
    url: "https://vercel.com",
    description: "Platform for frontend frameworks and static sites",
    tags: ["Deployment", "Hosting", "Tools"],
    favicon: "▲",
    isFavorite: true,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 4,
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "Design inspiration and creative community",
    tags: ["Design", "Inspiration", "UI/UX"],
    favicon: "🏀",
    isFavorite: false,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 5,
    title: "GitHub",
    url: "https://github.com",
    description: "Code hosting platform for version control and collaboration",
    tags: ["Git", "Tools", "Development"],
    favicon: "🐙",
    isFavorite: true,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 6,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "Comprehensive web development documentation",
    tags: ["Documentation", "Web", "Reference"],
    favicon: "📚",
    isFavorite: false,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
];

const allTags = [
  "React",
  "Documentation",
  "Frontend",
  "CSS",
  "Framework",
  "Design",
  "Deployment",
  "Hosting",
  "Tools",
  "Inspiration",
  "UI/UX",
  "Git",
  "Development",
  "Web",
  "Reference",
];

export default function DevLinksOrganizer() {
  const [websites, setWebsites] = useState(mockWebsites);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Filter websites based on search and tags
  const filteredWebsites = websites.filter((website) => {
    const matchesSearch =
      website.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => website.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleFavorite = (id: number) => {
    setWebsites((prev) =>
      prev.map((site) =>
        site.id === id ? { ...site, isFavorite: !site.isFavorite } : site
      )
    );
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-white/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-light text-stone-800 tracking-wide">
              Dev Library
            </h1>
            <Separator orientation="vertical" className="h-6 bg-stone-300" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <Input
                placeholder="Search websites, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10 border-stone-200 bg-stone-50/50 focus:bg-white transition-colors duration-200"
              />
            </div>
          </div>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-stone-800 hover:bg-stone-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-6">
                <Plus className="h-4 w-4 mr-2" />
                Add Website
              </Button>
            </DialogTrigger>
            <AddWebsiteModal onClose={() => setIsAddModalOpen(false)} />
          </Dialog>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 border-r border-stone-200/60 bg-white/40 backdrop-blur-sm min-h-screen">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium text-stone-700 tracking-wide uppercase">
                Filters
              </h2>
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTags([])}
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
                  const count = websites.filter((site) =>
                    site.tags.includes(tag)
                  ).length;

                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                        isSelected
                          ? "bg-stone-100 text-stone-800 shadow-sm"
                          : "hover:bg-stone-50 text-stone-600"
                      }`}
                    >
                      <span className="text-sm font-medium">{tag}</span>
                      <span className="text-xs text-stone-400 bg-stone-200/60 px-2 py-1 rounded-full">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-light text-stone-800 mb-2">
                  {selectedTags.length > 0
                    ? `Filtered by ${selectedTags.join(", ")}`
                    : "All Websites"}
                </h2>
                <p className="text-stone-500 text-sm">
                  {filteredWebsites.length}{" "}
                  {filteredWebsites.length === 1 ? "website" : "websites"} found
                </p>
              </div>

              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-stone-100 text-stone-700 hover:bg-stone-200 cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Website Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWebsites.map((website) => (
              <Card
                key={website.id}
                className="group relative overflow-hidden border-stone-200/60 bg-white/60 backdrop-blur-sm hover:shadow-xl hover:shadow-stone-200/40 transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(website.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-0">
                  {/* Thumbnail */}
                  <div className="relative h-32 bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
                    <img
                      src={website.thumbnail || "/placeholder.svg"}
                      alt={website.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Hover Actions */}
                    <div
                      className={`absolute top-2 right-2 flex space-x-1 transition-all duration-200 ${
                        hoveredCard === website.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-2"
                      }`}
                    >
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-sm"
                        onClick={() => toggleFavorite(website.id)}
                      >
                        <Star
                          className={`h-3 w-3 ${
                            website.isFavorite
                              ? "fill-amber-400 text-amber-400"
                              : "text-stone-400"
                          }`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-sm"
                        onClick={() => copyUrl(website.url)}
                      >
                        <Copy className="h-3 w-3 text-stone-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-sm"
                        asChild
                      >
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 text-stone-600" />
                        </a>
                      </Button>
                    </div>

                    {/* Favorite Star */}
                    {website.isFavorite && (
                      <div className="absolute top-2 left-2">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <span className="text-lg">{website.favicon}</span>
                        <h3 className="font-medium text-stone-800 truncate text-sm">
                          {website.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 mb-3 line-clamp-2 leading-relaxed">
                      {website.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {website.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-stone-100 text-stone-600 hover:bg-stone-200 cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {website.tags.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-stone-100 text-stone-500"
                        >
                          +{website.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWebsites.length === 0 && (
            <div className="text-center py-16">
              <div className="text-stone-400 mb-4">
                <Filter className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-stone-600 mb-2">
                  No websites found
                </h3>
                <p className="text-sm text-stone-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function AddWebsiteModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: "",
    tags: [] as string[],
  });

  return (
    <DialogContent className="sm:max-w-md bg-white border-stone-200">
      <DialogHeader>
        <DialogTitle className="text-stone-800 font-medium">
          Add New Website
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="url" className="text-sm font-medium text-stone-700">
            Website URL
          </Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={formData.url}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, url: e.target.value }))
            }
            className="border-stone-200 focus:border-stone-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-stone-700">
            Custom Title
          </Label>
          <Input
            id="title"
            placeholder="Enter a custom title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border-stone-200 focus:border-stone-400"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-stone-700"
          >
            Personal Note
          </Label>
          <Textarea
            id="description"
            placeholder="Add a personal note or description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border-stone-200 focus:border-stone-400 resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-stone-700">Tags</Label>
          <Select>
            <SelectTrigger className="border-stone-200 focus:border-stone-400">
              <SelectValue placeholder="Select or create tags" />
            </SelectTrigger>
            <SelectContent>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="border-stone-200 text-stone-600 hover:bg-stone-50 bg-transparent"
        >
          Cancel
        </Button>
        <Button
          onClick={onClose}
          className="bg-stone-800 hover:bg-stone-700 text-white"
        >
          Add Website
        </Button>
      </div>
    </DialogContent>
  );
}
