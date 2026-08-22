import { notFound } from 'next/navigation';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { getManualPage, generateManualParams } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { ManualHome } from '@/components/manual-home';
import { getManual } from '@/lib/manuals';
import type { Metadata } from 'next';

export default async function Page(props: {
  params: Promise<{ manual: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const manualDef = getManual(params.manual);
  if (!manualDef) notFound();

  if (!params.slug || params.slug.length === 0) {
    return <ManualHome manual={manualDef} />;
  }

  const page = getManualPage(params.manual, params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return generateManualParams();
}

export async function generateMetadata(props: {
  params: Promise<{ manual: string; slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const manualDef = getManual(params.manual);
  if (!manualDef) notFound();

  if (!params.slug || params.slug.length === 0) {
    return {
      title: manualDef.title,
      description: manualDef.description,
    };
  }

  const page = getManualPage(params.manual, params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
