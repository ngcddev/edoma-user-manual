import type { Metadata, Viewport } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { esTranslations } from '@/lib/translations';
import StaticSearchDialog from '@/components/search-dialog';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'Edoma',
    template: '%s | Edoma',
  },
  description: 'Centro de ayuda: elige un manual para ver sus guías.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e88e5' },
    { media: '(prefers-color-scheme: dark)', color: '#0d47a1' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          i18n={{ locale: 'es', translations: esTranslations }}
          search={{ SearchDialog: StaticSearchDialog }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
