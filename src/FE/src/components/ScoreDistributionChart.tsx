import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import type { SubjectDistribution } from '../types';

const LEVELS = [
  { key: '>= 8', dataKey: '>= 8', color: '#34d399', label: 'Giỏi ≥ 8'  },
  { key: '6–8',  dataKey: '6–8',  color: '#22d3ee', label: 'Khá 6–8'   },
  { key: '4–6',  dataKey: '4–6',  color: '#fb923c', label: 'TB 4–6'    },
  { key: '< 4',  dataKey: '< 4',  color: '#f87171', label: 'Yếu < 4'   },
];

interface Row { subject: string; '>= 8': number; '6–8': number; '4–6': number; '< 4': number; }

interface TooltipEntry {
  name: string;
  value?: number | null;
  fill?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + (p.value ?? 0), 0);
  return (
    <div
      className="p-3 text-xs rounded-xl"
      style={{
        background: '#0d1117',
        border: '1px solid var(--border2)',
        color: 'var(--text)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        minWidth: 176,
      }}
    >
      <p className="font-semibold mb-2.5 pb-2" style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border)' }}>
        {label}
      </p>
      {payload.map((p) => (
        <div key={p.name} className="flex justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 inline-block rounded-full shrink-0" style={{ background: p.fill }} />
            <span style={{ color: 'var(--muted)' }}>{p.name}</span>
          </span>
          <span className="font-semibold tabular-nums">
            {(p.value ?? 0).toLocaleString('vi-VN')}
            {total > 0 && (
              <span style={{ color: 'var(--muted)', fontWeight: 400 }}> {(((p.value ?? 0) / total) * 100).toFixed(1)}%</span>
            )}
          </span>
        </div>
      ))}
      <div
        className="flex justify-between mt-2.5 pt-2 font-semibold"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <span style={{ color: 'var(--muted)' }}>Tổng</span>
        <span>{total.toLocaleString('vi-VN')}</span>
      </div>
    </div>
  );
};

export function ScoreDistributionChart({ data }: { data: SubjectDistribution[] }) {
  const rows: Row[] = data.map((d) => ({
    subject: d.subject,
    '>= 8': d.levels.excellent.count,
    '6–8':  d.levels.good.count,
    '4–6':  d.levels.average.count,
    '< 4':  d.levels.poor.count,
  }));

  return (
    <div
      className="p-5 rounded-2xl"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="font-bold" style={{ color: 'var(--text)' }}>Phân bố điểm theo môn học</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Số thí sinh theo 4 mức điểm</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <span
              key={l.key}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ color: l.color, background: l.color + '15', border: `1px solid ${l.color}30` }}
            >
              <span className="w-1.5 h-1.5 inline-block rounded-full shrink-0" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={rows} margin={{ top: 4, right: 4, left: -8, bottom: 64 }} barCategoryGap="28%">
          <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="subject"
            angle={-38}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 10, fill: 'var(--muted)', fontFamily: 'Inter, system-ui' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
            tick={{ fontSize: 10, fill: 'var(--muted)', fontFamily: 'Inter, system-ui' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 6 }} />
          {LEVELS.map((l) => (
            <Bar key={l.key} dataKey={l.dataKey} fill={l.color} radius={[3, 3, 0, 0]} maxBarSize={14} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
