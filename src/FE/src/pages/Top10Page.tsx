import { useTop10GroupA } from '../hooks/useStatistics';
import { Top10Table } from '../components/Top10Table';

const PODIUM = [
  { rank: 2, medal: '🥈', accentColor: '#94a3b8', ringColor: 'rgba(148,163,184,0.2)', order: 0 },
  { rank: 1, medal: '🥇', accentColor: '#f59e0b', ringColor: 'rgba(245,158,11,0.2)',  order: 1 },
  { rank: 3, medal: '🥉', accentColor: '#cd7c2f', ringColor: 'rgba(205,124,47,0.2)',  order: 2 },
];

export function Top10Page() {
  const { data, loading, error } = useTop10GroupA();

  return (
    <div className="space-y-6 fade-in px-5 py-6 lg:px-8 lg:py-7">
      {/* Page header */}
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
          style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5 3l3 6h8l3-6M5 3h14M12 3v9m-4 9h8M8 21v-3a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Top 10 Khối A</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            10 thí sinh có tổng điểm Toán + Vật Lý + Hóa Học cao nhất kỳ thi THPT 2024
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24 gap-3" style={{ color: 'var(--muted)' }}>
          <svg className="w-5 h-5 spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Đang tải...</span>
        </div>
      )}

      {error && (
        <div
          className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl"
          style={{ background: 'var(--surface)', border: '1px solid rgba(239,68,68,0.25)', color: 'var(--poor)' }}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* Podium top 3 */}
      {!loading && !error && data.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 items-end">
          {PODIUM.map(({ rank, medal, accentColor, ringColor }) => {
            const s = data[rank - 1];
            const isFirst = rank === 1;
            return (
              <div
                key={rank}
                className="flex flex-col items-center rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${isFirst ? 'rgba(245,158,11,0.4)' : 'var(--border)'}`,
                  boxShadow: isFirst
                    ? '0 8px 24px rgba(245,158,11,0.12)'
                    : '0 2px 8px rgba(0,0,0,0.2)',
                  paddingTop: isFirst ? '28px' : '20px',
                  paddingBottom: '20px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                }}
              >
                {/* Medal */}
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full mb-3 text-2xl"
                  style={{ background: ringColor, border: `2px solid ${accentColor}40` }}
                >
                  {medal}
                </div>

                {/* Rank badge */}
                <span
                  className="text-[10px] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded-full"
                  style={{ background: ringColor, color: accentColor }}
                >
                  #{rank}
                </span>

                {/* SBD */}
                <p
                  className="font-mono font-bold text-sm tracking-wider mb-1 text-center"
                  style={{ color: isFirst ? 'var(--accent)' : 'var(--text)' }}
                >
                  {s.sbd}
                </p>

                {/* Score */}
                <p
                  className="text-2xl font-extrabold tabular-nums"
                  style={{ color: accentColor }}
                >
                  {s.total_score.toFixed(2)}
                </p>
                <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'var(--muted)' }}>điểm</p>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !error && data.length > 0 && <Top10Table data={data} />}
    </div>
  );
}
