import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags?: string[];
  author?: string;
  draft?: boolean;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
  readingTime: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllPosts(): Promise<Post[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const posts = await Promise.all(
      files
        .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
        .map(async (file) => {
          const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
          const { data, content } = matter(raw);
          const slug = file.replace(/\.mdx?$/, "");
          return {
            slug,
            frontmatter: data as PostFrontmatter,
            body: content,
            readingTime: readingTime(content).text,
          } satisfies Post;
        })
    );
    return posts
      .filter((p) => !p.frontmatter.draft)
      .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const file = path.join(BLOG_DIR, `${slug}.mdx`);
    const raw = await fs.readFile(file, "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      frontmatter: data as PostFrontmatter,
      body: content,
      readingTime: readingTime(content).text,
    };
  } catch {
    return null;
  }
}