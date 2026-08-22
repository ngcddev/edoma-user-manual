import type { LucideIcon } from 'lucide-react';
import { GraduationCap, School, Users } from 'lucide-react';

export interface ManualRole {
  slug: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export interface Manual {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  Icon: LucideIcon;
  roles: ManualRole[];
}

export const manuals: Manual[] = [
  {
    slug: 'sistema-gestion-escolar',
    title: 'Sistema de Gestión Escolar',
    description:
      'Guías paso a paso del sistema de gestión escolar. Busca un tema o elige tu rol para empezar.',
    Icon: School,
    roles: [
      {
        slug: 'administrativo',
        title: 'Administrativo',
        description:
          'Registro de docentes, padres y estudiantes, gestión académica, sedes, reportes y configuración del sistema.',
        Icon: School,
      },
      {
        slug: 'profesor',
        title: 'Profesor',
        description:
          'Registro de notas, horario, observador, dirección de grupo y rendimiento académico.',
        Icon: GraduationCap,
      },
      {
        slug: 'padre',
        title: 'Padre de familia',
        description:
          'Consulta de notas, asistencias, horario, boletín y observador de tu hijo o hija.',
        Icon: Users,
      },
    ],
  },
];

export function getManual(slug: string): Manual | undefined {
  return manuals.find((manual) => manual.slug === slug);
}
