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
    "## Blog Posts",
    "",
  ];

  for (const post of sortedPosts) {
    const date = post.data.pubDatetime.toISOString().slice(0, 10);
    const url = `${SITE.website}posts/${post.id}`;
    lines.push(`- [${post.data.title}](${url})`);
    lines.push(`  Date: ${date}`);
    lines.push(`  ${post.data.description}`);
    lines.push("");
  }

  lines.push("## Links");
  lines.push("");
  lines.push(`- [Full content for LLMs](${SITE.website}llms-full.txt)`);
  lines.push(`- [RSS Feed](${SITE.website}rss.xml)`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
