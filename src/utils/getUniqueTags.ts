import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

interface TagInfo {
  tag: string;
  count: number;
}

const getUniqueTags = (
  posts: CollectionEntry<"blog">[],
  projects?: CollectionEntry<"piy">[]
): TagInfo[] => {
  const tagMap = new Map<string, number>();

  posts.filter(postFilter).forEach((post) => {
    post.data.tags.forEach((tag) => {
      const normalized = tag.toLowerCase();
      tagMap.set(normalized, (tagMap.get(normalized) ?? 0) + 1);
    });
  });

  if (projects) {
    projects
      .filter((p) => !p.data.draft)
      .forEach((project) => {
        project.data.tags.forEach((tag) => {
          const normalized = tag.toLowerCase();
          tagMap.set(normalized, (tagMap.get(normalized) ?? 0) + 1);
        });
      });
  }

  return [...tagMap.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
};

export default getUniqueTags;
