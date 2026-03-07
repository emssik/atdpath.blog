import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/content/blog";
export const PIY_PATH = "src/content/piy";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.coerce.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["other"]),
    description: z.string(),
    canonicalURL: z.string().optional(),
  }),
});

const piy = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${PIY_PATH}` }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDatetime: z.coerce.date(),
    draft: z.boolean().optional(),
    repo: z.string().optional(),
    tags: z.array(z.string()).default([]),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  }),
});

export const collections = { blog, piy };
