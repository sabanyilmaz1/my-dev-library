import { getTagsByUserId } from "@/actions/db/tags";
import { FiltersSidebarClient } from "./filters-sidebar-client";
// import { FiltersSidebarClientDebounced } from "./filters-sidebar-client-debounced";
import React from "react";

export const FiltersSidebar = async () => {
  const tags = await getTagsByUserId();
  return <FiltersSidebarClient tags={tags} />;
  // Pour tester la version debouncée, décommentez la ligne ci-dessous et commentez celle du dessus :
  // return <FiltersSidebarClientDebounced tags={tags} />;
};
