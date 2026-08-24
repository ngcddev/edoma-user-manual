import { notFound } from 'next/navigation';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';
import { getManualPageTree } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { getManual } from '@/lib/manuals';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ manual: string }>;
}) {
  const { manual } = await params;
  const manualDef = getManual(manual);
  if (!manualDef) notFound();

  return (
    <DocsLayout tree={getManualPageTree(manual)} {...baseOptions(manualDef)}>
      {children}
      <a
        href="#"
        aria-label="Volver arriba"
        className="fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full border border-fd-border bg-fd-secondary/80 text-fd-foreground shadow-md backdrop-blur transition-colors hover:bg-fd-accent"
      >
        <ArrowUp className="size-4" />
      </a>
    </DocsLayout>
  );
}
