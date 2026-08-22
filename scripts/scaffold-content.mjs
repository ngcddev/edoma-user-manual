// Genera el árbol inicial de contenido MDX (placeholders) a partir del mapa de
// features. Se corre una sola vez para el scaffold; después el contenido se
// edita a mano.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../content/docs/', import.meta.url);

const roles = [
  {
    slug: 'administrativo',
    title: 'Administrativo',
    description: 'Guías para el rol Administrativo del sistema.',
    groups: [
      {
        slug: 'general',
        title: 'General',
        pages: [{ slug: 'dashboard', title: 'Dashboard' }],
      },
      {
        slug: 'registro',
        title: 'Registro',
        pages: [
          { slug: 'docente', title: 'Docente' },
          { slug: 'padres-de-familia', title: 'Padres de familia' },
          { slug: 'estudiantes', title: 'Estudiantes' },
        ],
      },
      {
        slug: 'academico',
        title: 'Académico',
        pages: [
          { slug: 'renovacion-matricula', title: 'Renovación de matrícula' },
          { slug: 'cursos-y-grados', title: 'Cursos y grados' },
          { slug: 'horarios', title: 'Horarios' },
          { slug: 'periodos', title: 'Periodos' },
          { slug: 'ano-lectivo', title: 'Año lectivo' },
          { slug: 'sistema-evaluacion', title: 'Sistema de evaluación' },
        ],
      },
      {
        slug: 'sistemas',
        title: 'Sistemas',
        pages: [
          { slug: 'sedes', title: 'Sedes' },
          { slug: 'reportes', title: 'Reportes' },
          { slug: 'configuracion', title: 'Configuración' },
        ],
        groups: [
          {
            slug: 'documentos',
            title: 'Documentos',
            pages: [
              { slug: 'boletines', title: 'Boletines' },
              { slug: 'libro-final', title: 'Libro final' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'profesor',
    title: 'Profesor',
    description: 'Guías para el rol Profesor del sistema.',
    groups: [
      {
        slug: 'general',
        title: 'General',
        pages: [{ slug: 'dashboard', title: 'Dashboard de entrada' }],
      },
      {
        slug: 'modulos',
        title: 'Módulos',
        pages: [
          { slug: 'registrar-notas', title: 'Registrar notas' },
          { slug: 'horario', title: 'Mirar horario' },
          { slug: 'observador', title: 'Observador' },
          { slug: 'direccion-de-grupo', title: 'Director / Dirección de grupo' },
          { slug: 'rendimiento', title: 'Rendimiento' },
        ],
      },
    ],
  },
  {
    slug: 'padre',
    title: 'Padre de familia',
    description: 'Guías para el rol Padre de familia del sistema.',
    groups: [
      {
        slug: 'general',
        title: 'General',
        pages: [{ slug: 'dashboard', title: 'Dashboard de entrada' }],
      },
      {
        slug: 'modulos',
        title: 'Módulos',
        pages: [
          { slug: 'notas', title: 'Notas' },
          { slug: 'asistencias', title: 'Asistencias' },
          { slug: 'horario', title: 'Horario' },
          { slug: 'boletin', title: 'Boletín' },
          { slug: 'observador', title: 'Observador' },
        ],
      },
    ],
  },
];

function writeMeta(dirUrl, pages) {
  const metaPath = new URL('meta.json', dirUrl);
  if (!existsSync(metaPath)) {
    writeFileSync(metaPath, JSON.stringify({ pages }, null, 2) + '\n');
  }
}

function pagePlaceholder(title) {
  return `---
title: ${title}
description: Guía de uso de "${title}".
---

<Callout type="info">
  Esta página es un placeholder. Reemplaza este contenido con los pasos reales
  y capturas de pantalla del sistema.
</Callout>

## ¿Qué encontrarás aquí?

Explicación breve de para qué sirve esta sección.

<Steps>
<Step>

### Paso 1

Descripción del primer paso, con una captura de pantalla debajo.

</Step>
<Step>

### Paso 2

Descripción del segundo paso.

</Step>
</Steps>
`;
}

for (const role of roles) {
  const roleDir = new URL(`${role.slug}/`, ROOT);
  mkdirSync(roleDir, { recursive: true });

  const indexPath = new URL('index.mdx', roleDir);
  if (!existsSync(indexPath)) {
    writeFileSync(
      indexPath,
      `---\ntitle: ${role.title}\ndescription: ${role.description}\n---\n\nBienvenido/a a la guía del rol **${role.title}**. Usa el menú lateral para navegar por cada módulo.\n`,
    );
  }

  const topLevelPages = ['index'];

  for (const group of role.groups) {
    const groupDir = new URL(`${group.slug}/`, roleDir);
    mkdirSync(groupDir, { recursive: true });
    topLevelPages.push(`${group.slug}`);

    const groupPages = [];
    for (const page of group.pages) {
      groupPages.push(page.slug);
      const pagePath = new URL(`${page.slug}.mdx`, groupDir);
      if (!existsSync(pagePath)) {
        writeFileSync(pagePath, pagePlaceholder(page.title));
      }
    }

    if (group.groups) {
      for (const sub of group.groups) {
        const subDir = new URL(`${sub.slug}/`, groupDir);
        mkdirSync(subDir, { recursive: true });
        groupPages.push(`${sub.slug}`);
        const subPages = [];
        for (const page of sub.pages) {
          subPages.push(page.slug);
          const pagePath = new URL(`${page.slug}.mdx`, subDir);
          if (!existsSync(pagePath)) {
            writeFileSync(pagePath, pagePlaceholder(page.title));
          }
        }
        writeMeta(subDir, subPages);
      }
    }

    writeMeta(groupDir, groupPages);
  }

  writeMeta(roleDir, topLevelPages);
}

writeMeta(ROOT, roles.map((r) => r.slug));

console.log('Contenido MDX inicial generado en content/docs/');
