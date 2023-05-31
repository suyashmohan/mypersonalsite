import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
};
