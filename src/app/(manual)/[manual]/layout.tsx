import { notFound } from 'next/navigation';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
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
    </DocsLayout>
  );
}
