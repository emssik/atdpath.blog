import { getCollection } from "astro:content";
import { SITE } from "@/config";
import getSortedPosts from "@/utils/getSortedPosts";
import getSortedProjects from "@/utils/getSortedProjects";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  const piyProjects = getSortedProjects(await getCollection("piy"));

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

  if (piyProjects.length > 0) {
    lines.push("# PIY — Prompt It Yourself");
    lines.push("");
    lines.push("---");
    lines.push("");

    for (const project of piyProjects) {
      const date = project.data.pubDatetime.toISOString().slice(0, 10);
      const url = `${SITE.website}piy/${project.id}`;
      const tags = project.data.tags.join(", ");

      lines.push(`## ${project.data.title}`);
      lines.push("");
      lines.push(`URL: ${url}`);
      lines.push(`Date: ${date}`);
      if (tags) lines.push(`Tags: ${tags}`);
      lines.push(`Description: ${project.data.description}`);
      lines.push("");
      lines.push(project.body ?? "");
      lines.push("");
      lines.push("---");
      lines.push("");
    }
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
