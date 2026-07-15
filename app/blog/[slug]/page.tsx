import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPost } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/reveal";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const all = await getAllPosts();
  const related = all
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.frontmatter.category === post.frontmatter.category
    )
    .slice(0, 3);
  const fallbackRelated = related.length > 0
    ? related
    : all.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pt-28 md:pt-36">
      <div className="container">
        <FadeUp>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            All posts
          </Link>
        </FadeUp>

        <FadeUp delay={0.05} className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{post.frontmatter.category}</Badge>
            {(post.frontmatter.tags ?? []).map((t) => (
              <Badge key={t} size="sm">
                {t}
              </Badge>
            ))}
          </div>
          <h1 className="mt-5 text-display-2">{post.frontmatter.title}</h1>
          <p className="mt-4 text-lg text-muted-1">{post.frontmatter.description}</p>
          <div className="mt-6 flex items-center gap-4 font-mono text-[11px] text-muted-2">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1} className="prose-tuning mx-auto mt-14 max-w-3xl">
          <MDXRemote
            source={post.body}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark-dimmed" }]],
              },
            }}
          />
        </FadeUp>

        {fallbackRelated.length > 0 && (
          <div className="mx-auto mt-24 max-w-3xl">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
              Related posts
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {fallbackRelated.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-white/15"
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-2">
                    {p.frontmatter.category}
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-white">
                    {p.frontmatter.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}