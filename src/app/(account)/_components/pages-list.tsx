import React, { Suspense } from "react";
import { PageCard } from "./page-card";
import { Page } from "../_types/page";
import { getPagesByUserId } from "@/actions/db/page";

export const PagesList = async () => {
  return (
    <section className="flex-1 p-8">
      <h2 className="text-2xl font-light text-stone-800 mb-2">All Pages</h2>
      <PagesListSuspense />
    </section>
  );
};

const PagesListSuspense = async () => {
  const pages = (await getPagesByUserId()) as Page[];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
        {pages.map((page) => (
          <PageCard key={page.id} page={page} />
        ))}
      </div>
    </Suspense>
  );
};
