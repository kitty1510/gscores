import type { Top10Student } from '../types';

const MEDAL: Record<number, { color: string; bg: string; emoji: string }> = {
  1: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  emoji: '🥇' },
  2: { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', emoji: '🥈' },
  3: { color: '#cd7c2f', bg: 'rgba(205,124,47,0.12)',  emoji: '🥉' },
};

function MiniBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const color = value >= 9 ? '#34d399' : value >= 7 ? '#22d3ee' : '#fb923c';
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-sm font-semibold tabular-nums w-10 text-right"
        style={{ color: 'var(--text)' }}
      >
        {value.toFixed(2)}
      </span>
      <div className="w-14 h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export function Top10Table({ data }: { data: Top10Student[] }) {
  const max = data[0]?.total_score ?? 30;
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      }}
    >
      {/* Table header */}
      <div
        className="px-6 py-4"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}
      >
        <h2 className="font-bold text-sm" style={{ color: 'var(--text)' }}>Bảng xếp hạng đầy đủ</h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Toán · Vật Lý · Hóa Học</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Hạng', 'SBD', 'Toán', 'Vật Lý', 'Hóa Học', 'Tổng điểm'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--muted)', background: 'var(--surface2)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((s) => {
              const medal = MEDAL[s.rank];
              return (
                <tr
                  key={s.sbd}
                  className="transition-colors"
                  style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
                      style={
                        medal
                          ? { background: medal.bg, color: medal.color }
                          : { color: 'var(--muted)', background: 'var(--surface2)' }
                      }
                    >
                      {medal?.emoji ?? `#${s.rank}`}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono font-semibold tracking-wider" style={{ color: 'var(--accent)' }}>
                      {s.sbd}
                    </span>
                  </td>
                  <td className="px-5 py-3.5"><MiniBar value={s.toan} /></td>
                  <td className="px-5 py-3.5"><MiniBar value={s.vat_li} /></td>
                  <td className="px-5 py-3.5"><MiniBar value={s.hoa_hoc} /></td>
                  <td className="px-5 py-3.5">
                    <div>
                      <span className="text-base font-extrabold tabular-nums" style={{ color: '#34d399' }}>
                        {s.total_score.toFixed(2)}
                      </span>
                      <div className="mt-1 h-1.5 w-20 rounded-full" style={{ background: 'var(--border)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(s.total_score / max) * 100}%`, background: '#34d399' }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
