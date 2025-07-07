import React from "react";
import { PageCard } from "./page-card";
import { Page } from "../_types/page";

export const PagesList = async ({ pages }: { pages: Page[] }) => {
  return (
    <section className="flex-1 p-8">
      <h2 className="text-2xl font-light text-stone-800 mb-2">All Websites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
        {pages.map((page) => (
          <PageCard key={page.id} page={page} />
        ))}
      </div>
    </section>
  );
};
