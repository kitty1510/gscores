import { useScoreDistribution } from '../hooks/useStatistics';
import { ScoreDistributionChart } from '../components/ScoreDistributionChart';

const LEVELS = [
  { key: 'excellent', label: 'Giỏi ≥ 8',      color: '#34d399', bg: 'rgba(52,211,153,0.1)'  },
  { key: 'good',      label: 'Khá 6–8',        color: '#22d3ee', bg: 'rgba(34,211,238,0.1)'  },
  { key: 'average',   label: 'Trung bình 4–6', color: '#fb923c', bg: 'rgba(251,146,60,0.1)'  },
  { key: 'poor',      label: 'Yếu < 4',        color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
];

export function StatisticsPage() {
  const { data, loading, error } = useScoreDistribution();

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
              d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Thống kê phân bố điểm</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            Số lượng thí sinh theo từng mức điểm của mỗi môn học
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24 gap-3" style={{ color: 'var(--muted)' }}>
          <svg className="w-5 h-5 spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Đang tải dữ liệu...</span>
        </div>
      )}

      {error && (
        <div
          className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl"
          style={{ background: 'var(--surface)', border: '1px solid rgba(239,68,68,0.25)', color: 'var(--poor)' }}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
          {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="flex flex-col items-center py-24 gap-3" style={{ color: 'var(--muted)' }}>
          <svg className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
          </svg>
          <p className="text-sm">Không có dữ liệu thống kê</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <ScoreDistributionChart data={data} />

          {/* Per-subject grid */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
              Chi tiết theo môn học
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {data.map((subject) => {
                const total = Object.values(subject.levels).reduce((s, l) => s + l.count, 0);
                return (
                  <div
                    key={subject.dbField}
                    className="p-4 rounded-2xl"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-3.5">
                      <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                        {subject.subject}
                      </p>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--surface2)', color: 'var(--muted)' }}
                      >
                        {total.toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {LEVELS.map(({ key, label, color }) => {
                        const lv = subject.levels[key as keyof typeof subject.levels];
                        const pct = total > 0 ? (lv.count / total) * 100 : 0;
                        return (
                          <div key={key}>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                                <span
                                  className="w-2 h-2 inline-block rounded-full shrink-0"
                                  style={{ background: color }}
                                />
                                {label}
                              </span>
                              <span className="tabular-nums font-semibold" style={{ color }}>
                                {pct.toFixed(1)}%
                              </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full" style={{ background: 'var(--border)' }}>
                              <div
                                className="h-full rounded-full grow-x"
                                style={{ width: `${pct}%`, background: color }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
