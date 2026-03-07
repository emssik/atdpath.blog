import { getCollection } from "astro:content";
import { SITE } from "@/config";
import getSortedPosts from "@/utils/getSortedPosts";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  const lines: string[] = [
    `# ${SITE.title}`,
    "",
    `> ${SITE.desc}`,
    "",
    `Author: ${SITE.author}`,
    `Website: ${SITE.website}`,
    "",
    "---",
    "",
  ];

  for (const post of sortedPosts) {
    const date = post.data.pubDatetime.toISOString().slice(0, 10);
    const url = `${SITE.website}posts/${post.id}`;
    const tags = post.data.tags.join(", ");

    lines.push(`## ${post.data.title}`);
    lines.push("");
    lines.push(`URL: ${url}`);
    lines.push(`Date: ${date}`);
    if (tags) lines.push(`Tags: ${tags}`);
    lines.push(`Description: ${post.data.description}`);
    lines.push("");
    lines.push(post.body ?? "");
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
