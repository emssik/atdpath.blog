import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { SITE } from "@/config";
import getSortedPosts from "@/utils/getSortedPosts";

const fontsDir = resolve(process.cwd(), "src/assets/fonts");

const playfairBold = readFileSync(resolve(fontsDir, "PlayfairDisplay-Bold.ttf"));
const sourceSerif = readFileSync(resolve(fontsDir, "SourceSerif4-Regular.ttf"));

const avatarPath = resolve(process.cwd(), "public/avatar.jpg");
const avatarBase64 = `data:image/jpeg;base64,${readFileSync(avatarPath).toString("base64")}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return getSortedPosts(posts).map(post => ({
    params: { slug: post.id },
    props: { title: post.data.title, description: post.data.description },
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
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexGrow: 1,
                paddingBottom: "40px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: title.length > 50 ? "52px" : "64px",
                      fontFamily: "Playfair Display",
                      fontWeight: 700,
                      color: "#f0ede8",
                      lineHeight: 1.25,
                      letterSpacing: "-0.5px",
                      maxWidth: "1000px",
                    },
                    children: title,
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
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "16px",
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: avatarBase64,
                    width: 56,
                    height: 56,
                    style: {
                      borderRadius: "28px",
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "20px",
                      color: "#706b65",
                    },
                    children: SITE.author,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "20px",
                      color: "#706b65",
                    },
                    children: "·",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "20px",
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
