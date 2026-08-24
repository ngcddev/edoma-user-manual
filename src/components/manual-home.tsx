import Link from 'next/link';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import type { Manual } from '@/lib/manuals';

export function ManualHome({ manual }: { manual: Manual }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 [grid-area:main]">
      <div className="mb-10 flex flex-col gap-2">
        <span className="text-sm font-medium text-fd-primary">
          Centro de ayuda
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {manual.title}
        </h1>
        <p className="max-w-xl text-fd-muted-foreground">{manual.description}</p>
      </div>

      <FullSearchTrigger className="mb-10 h-12 w-full justify-start rounded-xl border border-fd-border bg-fd-secondary/40 px-4 text-sm text-fd-muted-foreground shadow-sm" />

      <div className="grid gap-4 sm:grid-cols-3">
        {manual.roles.map(({ slug, title, description, Icon }) => (
          <Link
            key={slug}
            href={`/${manual.slug}/${slug}`}
            className="group flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-fd-primary/40 hover:shadow-md"
          >
            <Icon
              className="size-6 text-fd-primary"
              strokeWidth={1.75}
              aria-hidden
            />
            <span className="text-base font-semibold group-hover:text-fd-primary">
              {title}
            </span>
            <span className="text-sm text-fd-muted-foreground">
              {description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
