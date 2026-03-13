import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { SITE } from "@/config";

const fontsDir = resolve(process.cwd(), "src/assets/fonts");

const playfairBold = readFileSync(resolve(fontsDir, "PlayfairDisplay-Bold.ttf"));
const sourceSerif = readFileSync(resolve(fontsDir, "SourceSerif4-Regular.ttf"));

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getCollection("piy");
  return projects
    .filter(p => !p.data.draft)
    .map(project => ({
      params: { slug: project.id },
      props: { title: project.data.title, description: project.data.description },
    }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as { title: string; description: string };

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "#161618",
          fontFamily: "Source Serif 4",
        },
        children: [
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", gap: "20px" },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "20px",
                      color: "#e8915a",
                      letterSpacing: "2px",
                      textTransform: "uppercase" as const,
                    },
                    children: "PIY — Prompt It Yourself",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: title.length > 60 ? "40px" : "52px",
                      fontFamily: "Playfair Display",
                      fontWeight: 700,
                      color: "#f0ede8",
                      lineHeight: 1.2,
                      letterSpacing: "-0.5px",
                    },
                    children: title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "22px",
                      color: "#b0aaa4",
                      lineHeight: 1.5,
                      maxWidth: "900px",
                    },
                    children:
                      description.length > 140
                        ? description.slice(0, 140) + "…"
                        : description,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #3a3a3e",
                paddingTop: "24px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "18px",
                      color: "#b0aaa4",
                    },
                    children: SITE.author,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "18px",
                      color: "#e8915a",
                    },
                    children: "blog.atdpath.com",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Playfair Display", data: playfairBold, weight: 700, style: "normal" },
        { name: "Source Serif 4", data: sourceSerif, weight: 400, style: "normal" },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
