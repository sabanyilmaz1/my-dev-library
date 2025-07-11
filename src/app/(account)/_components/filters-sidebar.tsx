import { getTagsByUserId } from "@/actions/db/tags";
import { FiltersSidebarClient } from "./filters-sidebar-client";
import React from "react";

export const FiltersSidebar = async () => {
  const tags = await getTagsByUserId();
  return <FiltersSidebarClient tags={tags} />;
};
