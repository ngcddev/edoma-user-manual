import { docs } from '../../.source/server';
import { loader } from 'fumadocs-core/source';
import type { Root } from 'fumadocs-core/page-tree';
import { getManual } from '@/lib/manuals';

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});

export function getManualPage(manual: string, slug: string[] = []) {
  return source.getPage([manual, ...slug]);
}

export function getManualPageTree(manual: string): Root {
  const manualDef = getManual(manual);
  const folder = source.pageTree.children.find(
    (node) => node.type === 'folder' && node.$ref?.folder === manual,
  );

  return {
    ...source.pageTree,
    name: manualDef?.title ?? manual,
    children: folder?.type === 'folder' ? folder.children : [],
  };
}

export function generateManualParams() {
  return source.generateParams().map(({ slug }) => ({
    manual: slug[0],
    slug: slug.slice(1),
  }));
}
