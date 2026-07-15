import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center pt-32">
      <div className="container text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-fg">
          404
        </span>
        <h1 className="mt-4 text-display-1">Lost in the system.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-1">
          That page either moved or never existed. Head back home or use the ⌘K menu.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:opacity-90"
          >
            Take me home
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-11 items-center rounded-full border border-hairline bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.05]"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </section>
  );
}