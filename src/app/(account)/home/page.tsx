import { Metadata } from "next";
import { HeaderPage } from "../_components/header-page";
import { PagesList } from "../_components/pages-list";
import { getTagsByUserId } from "@/actions/db/tags";
import { FiltersSidebarClient } from "../_components/filters-sidebar-client";

interface HomePageProps {
  searchParams: Promise<{ tags?: string }>;
}

export const metadata: Metadata = {
  title: "My Dev Library - Home",
  description:
    "My Dev Library est une bibliothèque de ressources pour les développeurs. Elle permet de stocker et de partager des ressources utiles pour les développeurs.",
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const tags = await getTagsByUserId();

  return (
    <main>
      <HeaderPage tags={tags} />
      <div className="flex">
        <aside className="hidden md:block w-72 border-r border-stone-200/60 bg-white/40 backdrop-blur-sm min-h-screen">
          <FiltersSidebarClient tags={tags} />
        </aside>
        <PagesList searchParams={resolvedSearchParams} />
      </div>
    </main>
  );
}
