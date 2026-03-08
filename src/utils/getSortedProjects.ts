import type { CollectionEntry } from "astro:content";

const getSortedProjects = (projects: CollectionEntry<"piy">[]) => {
  return projects
    .filter((p) => !p.data.draft)
    .sort(
      (a, b) =>
        b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
    );
};

export default getSortedProjects;
