import React, { Suspense } from "react";
import { PageCard } from "./page-card";
import { getPagesByUserId } from "@/actions/db/page";

export const PagesList = async () => {
  return (
    <section className="flex-1 p-8">
      <h2 className="text-2xl font-light text-stone-800 mb-2">All Pages</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <RenderPages />
      </Suspense>
    </section>
  );
};

const RenderPages = async () => {
  const pages = await getPagesByUserId();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
      {pages.map((page) => (
        <PageCard key={page.id} page={page} />
      ))}
    </div>
  );
};
