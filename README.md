# Edoma

Centro de documentación (PWA) que reúne los manuales de usuario de todos los sistemas internos de la empresa. Cada sistema se documenta por rol (ej. Administrativo, Profesor, Padre de familia), y cada rol se organiza en módulos con guías paso a paso.

Construido con **Next.js 16 + Fumadocs** (contenido en MDX, búsqueda instantánea generada en build time) y **Serwist** (PWA instalable, offline). Diseño inspirado en el Notion Help Center.

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000. El service worker de PWA está deshabilitado en desarrollo (`NODE_ENV=development`).

## Producción

```bash
npm run build
npm run start
```

`npm run build` compila los docs, regenera el índice estático de búsqueda (`/api/search`, pre-renderizado — no se recalcula por request) y empaqueta el service worker.

## Cómo está organizado el contenido

Cada sistema (aquí llamado "manual") vive en `content/docs/<manual>/`, y dentro de él cada rol es una subcarpeta con sus propios módulos y páginas:

```
content/docs/
  <manual>/
    <rol>/
      index.mdx          # bienvenida del rol
      <módulo>/
        meta.json         # orden de las páginas del módulo
        <pagina>.mdx
      meta.json           # orden de los módulos dentro del rol
    meta.json              # orden de los roles dentro del manual
  meta.json                 # orden de los manuales (sistemas)
```

Ejemplo real: `content/docs/sistema-gestion-escolar/administrativo/academico/ano-lectivo.mdx`.

El orden de navegación en el sidebar lo controla siempre el `meta.json` de cada carpeta (array `pages`); si una carpeta no tiene `meta.json`, Fumadocs ordena alfabéticamente.

### Agregar una página a un sistema existente

1. Crea el archivo `.mdx` con frontmatter `title` y `description`, dentro del módulo correspondiente.
2. Agrega su slug al array `pages` del `meta.json` de esa carpeta.
3. Reemplaza el contenido placeholder (`<Callout>`, `<Steps>`) por los pasos reales y capturas de pantalla (colócalas en `public/screenshots/<manual>/<rol>/<módulo>/`).

### Agregar un sistema nuevo

Esta app está pensada para escalar a todos los sistemas de la empresa, no solo al de gestión escolar:

1. Registra el manual en `src/lib/manuals.ts`: agrega una entrada al array `manuals` con `slug`, `title`, `description`, `Icon` (de `lucide-react`) y su lista de `roles`.
2. Crea la carpeta de contenido `content/docs/<slug-del-manual>/...` siguiendo la misma estructura rol → módulo → página descrita arriba.
3. Agrega el slug del manual al array `pages` de `content/docs/meta.json`.

Con eso, el manual aparece automáticamente en el selector de la home, en la búsqueda y en el sidebar de documentación (con el árbol de navegación generado a partir de las carpetas).

## Búsqueda

La búsqueda (`Cmd/Ctrl+K`) usa el índice de Fumadocs generado **en build time** (`src/app/api/search/route.ts`, `staticGET`) y se resuelve del lado del cliente (`src/components/search-dialog.tsx`). No hay indexado en runtime: si agregas o editas contenido, corre `npm run build` (o redeploy) para que la búsqueda lo refleje.

## Identidad / Splash screen

El logo vive en `public/logo/logo.svg` y se usa en el splash screen (`src/components/splash-screen.tsx`), que se muestra cada vez que se entra a la home. El tema claro/oscuro lo maneja `next-themes` vía Fumadocs (respeta la última preferencia guardada del usuario).

## Íconos de la PWA

`public/icons/*.png` son placeholders sólidos generados con `scripts/generate-placeholder-icons.mjs`. Reemplázalos por los íconos de marca definitivos (192×192, 512×512 y una versión maskable de 512×512) antes de salir a producción.

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (`next dev --webpack`) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `node scripts/scaffold-content.mjs` | Genera el árbol inicial de contenido placeholder para un manual (se corre una sola vez al armar uno nuevo, después se edita a mano) |
| `node scripts/generate-placeholder-icons.mjs` | Regenera los íconos placeholder de la PWA |

## Despliegue

Pensado para desplegarse en **Vercel** (soporte nativo de Next.js, CDN global, deploys automáticos por push). No requiere variables de entorno para funcionar.
