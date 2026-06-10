import type { StudentResult, ScoreInfo } from "../types";

const LEVEL = {
  EXCELLENT: { color: "#34d399", label: "Giỏi", bg: "rgba(52,211,153,0.12)" },
  GOOD: { color: "#22d3ee", label: "Khá", bg: "rgba(34,211,238,0.12)" },
  AVERAGE: {
    color: "#fb923c",
    label: "Trung bình",
    bg: "rgba(251,146,60,0.12)",
  },
  POOR: { color: "#f87171", label: "Yếu", bg: "rgba(248,113,113,0.12)" },
} as const;

type LevelKey = keyof typeof LEVEL;
const LEVEL_KEYS: LevelKey[] = ["EXCELLENT", "GOOD", "AVERAGE", "POOR"];

function avgToLevel(avg: number): LevelKey {
  if (avg >= 8) return "EXCELLENT";
  if (avg >= 6) return "GOOD";
  if (avg >= 4) return "AVERAGE";
  return "POOR";
}

function SubjectCard({ info }: { info: ScoreInfo }) {
  const cfg = info.level ? LEVEL[info.level] : null;
  const pct = info.score !== null ? (info.score / 10) * 100 : 0;

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: "var(--bg)",
        border: `1px solid ${cfg ? cfg.color + "28" : "var(--border)"}`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className="text-sm font-medium leading-snug"
          style={{ color: "var(--text)" }}
        >
          {info.displayName}
        </span>
        {cfg && (
          <span
            className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap"
            style={{ color: cfg.color, background: cfg.bg }}
          >
            {cfg.label}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div
            className="h-2 w-full rounded-full"
            style={{ background: "var(--border)" }}
          >
            <div
              className="h-full rounded-full grow-x"
              style={{
                width: `${pct}%`,
                background: cfg ? cfg.color : "var(--border2)",
              }}
            />
          </div>
          <div
            className="flex justify-between mt-1"
            style={{ color: "var(--muted)" }}
          >
            <span className="text-[10px]">0</span>
            <span className="text-[10px]">10</span>
          </div>
        </div>
        <span
          className="text-xl font-extrabold tabular-nums shrink-0 w-13 text-right"
          style={{ color: cfg ? cfg.color : "var(--muted)" }}
        >
          {info.score !== null ? info.score.toFixed(2) : "—"}
        </span>
      </div>
    </div>
  );
}

export function ScoreCard({ student }: { student: StudentResult }) {
  const entries = Object.entries(student.scores);
  const scored = entries.filter(([, i]) => i.score !== null);
  const notScored = entries.filter(([, i]) => i.score === null);
  const avg = scored.length
    ? scored.reduce((s, [, i]) => s + i.score!, 0) / scored.length
    : null;
  const counts: Record<LevelKey, number> = {
    EXCELLENT: 0,
    GOOD: 0,
    AVERAGE: 0,
    POOR: 0,
  };
  scored.forEach(([, i]) => {
    if (i.level) counts[i.level]++;
  });

  const avgLevel = avg !== null ? avgToLevel(avg) : null;
  const avgCfg = avgLevel ? LEVEL[avgLevel] : null;

  return (
    <div
      className="rounded-md overflow-hidden fade-in"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── Hero header ── */}
      <div
        style={{
          background: "var(--surface2)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="px-6 pt-6 pb-5">
          <div className="flex flex-wrap items-start justify-between gap-5">
            {/* SBD block */}
            <div>
              <p
                className="text-[10px] uppercase tracking-widest font-semibold mb-2"
                style={{ color: "var(--muted)" }}
              >
                Số báo danh
              </p>
              <p
                className="text-3xl font-extrabold tracking-[0.14em] font-mono leading-none"
                style={{ color: "var(--accent)" }}
              >
                {student.sbd}
              </p>
              {student.ma_ngoai_ngu && (
                <span
                  className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-medium px-2.5 py-1 rounded-full"
                  style={{ background: "var(--border)", color: "var(--muted)" }}
                >
                  Mã ngoại ngữ:&nbsp;
                  <strong style={{ color: "var(--text)" }}>
                    {student.ma_ngoai_ngu}
                  </strong>
                </span>
              )}
            </div>

            {/* Average score block */}
            {avg !== null && avgCfg && (
              <div
                className="flex flex-col items-center justify-center px-5 py-4 rounded-2xl"
                style={{
                  background: avgCfg.bg,
                  border: `1px solid ${avgCfg.color}30`,
                  minWidth: "116px",
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-wide font-semibold mb-1 whitespace-nowrap"
                  style={{ color: avgCfg.color }}
                >
                  Điểm TB
                </p>
                <p
                  className="text-3xl font-extrabold tabular-nums leading-none"
                  style={{ color: avgCfg.color }}
                >
                  {avg.toFixed(2)}
                </p>
                <span
                  className="text-[10px] font-bold mt-2 px-2 py-0.5 rounded-full"
                  style={{
                    color: avgCfg.color,
                    background: avgCfg.color + "20",
                  }}
                >
                  {avgCfg.label}
                </span>
              </div>
            )}
          </div>

          {/* Level summary pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {LEVEL_KEYS.map((key) =>
              counts[key] > 0 ? (
                <span
                  key={key}
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap"
                  style={{ color: LEVEL[key].color, background: LEVEL[key].bg }}
                >
                  <span className="font-extrabold text-sm leading-none">
                    {counts[key]}
                  </span>
                  {LEVEL[key].label}
                </span>
              ) : null,
            )}
            {notScored.length > 0 && (
              <span
                className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap"
                style={{
                  background: "rgba(100,116,139,0.12)",
                  color: "var(--muted)",
                }}
              >
                <span className="font-extrabold text-sm leading-none">
                  {notScored.length}
                </span>
                Không thi
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Subject grid ── */}
      <div className="p-5">
        {scored.length > 0 && (
          <>
            <p
              className="text-[10px] uppercase tracking-widest font-semibold mb-3.5"
              style={{ color: "var(--muted)" }}
            >
              Kết quả {scored.length} môn thi
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {scored.map(([field, info]) => (
                <SubjectCard key={field} info={info} />
              ))}
            </div>
          </>
        )}

        {/* Not tested subjects */}
        {notScored.length > 0 && (
          <div
            className={scored.length > 0 ? "mt-5 pt-5" : ""}
            style={
              scored.length > 0 ? { borderTop: "1px solid var(--border)" } : {}
            }
          >
            <p
              className="text-[10px] uppercase tracking-widest font-semibold mb-3"
              style={{ color: "var(--muted)" }}
            >
              Không thi / Không có điểm
            </p>
            <div className="flex flex-wrap gap-2">
              {notScored.map(([field, info]) => (
                <span
                  key={field}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    background: "var(--surface2)",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {info.displayName}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
