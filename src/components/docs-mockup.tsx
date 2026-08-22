import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl border border-fd-border bg-fd-card p-4 text-sm sm:p-5">
      {children}
    </div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return <div className="mt-4 rounded-lg border border-fd-border p-4 first:mt-0">{children}</div>;
}

export function SectionTitle({ icon: Icon, children, action }: { icon?: LucideIcon; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-1.5 font-medium">
        {Icon && <Icon className="size-4 text-fd-muted-foreground" />}
        {children}
      </div>
      {action && <div className="text-xs text-fd-primary">{action}</div>}
    </div>
  );
}

export function Toolbar({ children }: { children: ReactNode }) {
  return <div className="mb-4 flex flex-wrap items-center gap-2">{children}</div>;
}

export function TabBtn({ children, active, icon: Icon }: { children: ReactNode; active?: boolean; icon?: LucideIcon }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
        active ? 'border border-fd-border bg-fd-background' : 'text-fd-muted-foreground'
      }`}
    >
      {Icon && <Icon className="size-3.5" />}
      {children}
    </span>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return <div className="mb-4 flex flex-wrap gap-2">{children}</div>;
}

export function FakeInput({ children, grow }: { children: ReactNode; grow?: boolean }) {
  return (
    <span
      className={`inline-flex h-8 items-center rounded-lg border border-fd-border bg-fd-background px-3 text-xs text-fd-muted-foreground ${
        grow ? 'flex-1' : ''
      }`}
    >
      {children}
    </span>
  );
}

const tones: Record<string, string> = {
  success: 'bg-fd-success/10 text-fd-success',
  warning: 'bg-fd-warning/10 text-fd-warning',
  danger: 'bg-fd-error/10 text-fd-error',
  info: 'bg-fd-info/10 text-fd-info',
  neutral: 'bg-fd-muted text-fd-muted-foreground',
};

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: keyof typeof tones }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Table({ columns, children }: { columns: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-fd-border">
      <table className="w-full min-w-[480px] border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-fd-border bg-fd-muted/50 text-fd-muted-foreground">
            {columns.map((c) => (
              <th key={c} className="whitespace-nowrap px-3 py-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Tr({ children }: { children: ReactNode }) {
  return <tr className="border-b border-fd-border last:border-0">{children}</tr>;
}

export function Td({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <td className={`whitespace-nowrap px-3 py-2.5 ${muted ? 'text-fd-muted-foreground' : ''}`}>{children}</td>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{children}</div>;
}

export function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-lg border border-fd-border p-3">
      <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-fd-primary/10 text-fd-primary">
        <Icon className="size-4" />
      </div>
      <div className="text-xs text-fd-muted-foreground">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs text-fd-muted-foreground">{sub}</div>}
    </div>
  );
}

export function ProgressRow({ label, value, max, tone = 'success' }: { label: string; value: number; max: number; tone?: 'success' | 'warning' | 'danger' }) {
  const barTone = tone === 'success' ? 'bg-fd-success' : tone === 'warning' ? 'bg-fd-warning' : 'bg-fd-error';
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span>{label}</span>
        <span className="text-fd-muted-foreground">
          {value} / {max}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-fd-muted">
        <div className={`h-full rounded-full ${barTone}`} style={{ width: `${max === 0 ? 0 : (value / max) * 100}%` }} />
      </div>
    </div>
  );
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function FieldGroupTitle({ icon: Icon, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <div className="mb-2 mt-4 flex items-center gap-1.5 text-xs font-semibold text-fd-muted-foreground first:mt-0">
      {Icon && <Icon className="size-3.5" />}
      {children}
    </div>
  );
}

export function Field({
  label,
  placeholder,
  required,
  full,
  type = 'text',
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  full?: boolean;
  type?: 'text' | 'select' | 'date' | 'textarea';
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <div className="mb-1 text-xs text-fd-muted-foreground">
        {label}
        {required && <span className="text-fd-error"> *</span>}
      </div>
      <div
        className={`flex items-center rounded-lg border border-fd-border bg-fd-background px-3 text-xs text-fd-muted-foreground/70 ${
          type === 'textarea' ? 'h-16 items-start pt-2' : 'h-8'
        }`}
      >
        {type === 'select' ? (placeholder ?? 'Seleccione...') : (placeholder ?? '')}
      </div>
    </div>
  );
}

export function Btn({ children, tone = 'default', icon: Icon }: { children: ReactNode; tone?: 'default' | 'primary' | 'success' | 'warning'; icon?: LucideIcon }) {
  const toneClass =
    tone === 'primary'
      ? 'bg-fd-primary text-fd-primary-foreground'
      : tone === 'success'
        ? 'bg-fd-success/15 text-fd-success'
        : tone === 'warning'
          ? 'bg-fd-warning/15 text-fd-warning'
          : 'border border-fd-border';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${toneClass}`}>
      {Icon && <Icon className="size-3.5" />}
      {children}
    </span>
  );
}

export function Toggle({ on, label }: { on?: boolean; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full ${on ? 'bg-fd-primary' : 'bg-fd-muted'}`}>
        <span className={`inline-block size-3.5 rounded-full bg-fd-background ${on ? 'ml-[18px]' : 'ml-1'}`} />
      </span>
      {label && <span className="text-xs">{label}</span>}
    </div>
  );
}

export function Steps({ steps, active }: { steps: string[]; active: number }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {steps.map((s, i) => (
        <div
          key={s}
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs ${
            i === active ? 'border-fd-primary bg-fd-primary/10 font-medium text-fd-primary' : 'border-fd-border text-fd-muted-foreground'
          }`}
        >
          <span
            className={`flex size-4 items-center justify-center rounded-full text-[10px] ${
              i === active ? 'bg-fd-primary text-fd-primary-foreground' : 'bg-fd-muted'
            }`}
          >
            {i + 1}
          </span>
          {s}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-fd-border py-10 text-center">
      <Icon className="size-6 text-fd-muted-foreground" />
      <div className="text-sm font-medium">{title}</div>
      {subtitle && <div className="text-xs text-fd-muted-foreground">{subtitle}</div>}
    </div>
  );
}

const blockClasses = [
  'bg-fd-info/15 text-fd-info',
  'bg-fd-success/15 text-fd-success',
  'bg-fd-primary/15 text-fd-primary',
  'bg-fd-warning/15 text-fd-warning',
  'bg-fd-error/15 text-fd-error',
];

export type ScheduleBlock = { time: string; subject: string; tone?: number } | 'break';

export function ScheduleGrid({ days }: { days: { label: string; blocks: ScheduleBlock[] }[] }) {
  return (
    <div className="grid gap-3 overflow-x-auto sm:grid-cols-3" style={{ gridAutoFlow: 'column', gridAutoColumns: 'minmax(140px, 1fr)' }}>
      {days.map((d) => (
        <div key={d.label}>
          <div className="mb-2 text-xs font-semibold">{d.label}</div>
          <div className="space-y-1.5">
            {d.blocks.map((b, i) =>
              b === 'break' ? (
                <div key={i} className="rounded-md border border-dashed border-fd-border px-2 py-1.5 text-center text-[11px] italic text-fd-muted-foreground">
                  Descanso
                </div>
              ) : (
                <div key={i} className={`rounded-md px-2 py-1.5 text-[11px] ${blockClasses[b.tone ?? 0]}`}>
                  <div className="font-medium">{b.time}</div>
                  <div>{b.subject}</div>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ActionRow({ icon: Icon, title, subtitle, action }: { icon: LucideIcon; title: string; subtitle: string; action: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-fd-border p-3">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
          <Icon className="size-4" />
        </div>
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-fd-muted-foreground">{subtitle}</div>
        </div>
      </div>
      {action}
    </div>
  );
}

export function Chip({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium ${
        active ? 'bg-fd-primary text-fd-primary-foreground' : 'border border-fd-border text-fd-muted-foreground'
      }`}
    >
      {children}
    </span>
  );
}

export function SegmentedBar({ segments }: { segments: { value: number; className: string }[] }) {
  return (
    <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-fd-muted">
      {segments.map((s, i) => (
        <div key={i} className={s.className} style={{ width: `${s.value}%` }} />
      ))}
    </div>
  );
}

export function Callout2({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="mb-4 flex items-start gap-2 rounded-lg bg-fd-info/10 p-3 text-xs text-fd-info">
      <Icon className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
