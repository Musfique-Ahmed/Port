import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import { BlogGrid } from "@/components/sections/blog-grid";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing from the work — research notes, engineering, and community.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <section className="pt-28 md:pt-36">
      <BlogGrid posts={posts} />
    </section>
  );
}