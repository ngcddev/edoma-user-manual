import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Home } from 'lucide-react';
import type { Manual } from '@/lib/manuals';

export function baseOptions(manual: Manual): BaseLayoutProps {
  return {
    nav: {
      title: manual.shortTitle ?? manual.title,
      url: `/${manual.slug}`,
    },
    links: [
      {
        icon: <Home />,
        text: 'Volver al inicio',
        url: '/',
      },
    ],
    themeSwitch: {
      enabled: true,
    },
  };
}
