import { FiltersSidebar } from "../_components/filters-sidebar";
import { HeaderPage } from "../_components/header-page";
import { PagesList } from "../_components/pages-list";

interface HomePageProps {
  searchParams: Promise<{ tags?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <main>
      <HeaderPage />
      <div className="flex">
        <aside className="hidden md:block w-72 border-r border-stone-200/60 bg-white/40 backdrop-blur-sm min-h-screen">
          <FiltersSidebar />
        </aside>
        <PagesList searchParams={resolvedSearchParams} />
      </div>
    </main>
  );
}
