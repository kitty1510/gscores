import { useState, type FormEvent } from "react";
import { useStudentSearch } from "../hooks/useStudentSearch";
import { ScoreCard } from "../components/ScoreCard";

export function SearchPage() {
  const [sbd, setSbd] = useState("");
  const { result, loading, error, search } = useStudentSearch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = sbd.trim();
    if (v) search(v);
  };

  const hasContent = result || error || loading;

  return (
    <div className={`min-h-full flex flex-col items-center px-5 lg:px-8 ${hasContent ? 'justify-start pt-8 pb-12' : 'justify-center py-12'}`}>
      <div className="w-full max-w-2xl fade-in ">
        {/* ── Hero (only when no result yet) ── */}
        {!hasContent && (
          <div className="text-center mb-7">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 "
              style={{
                background: "rgba(245,158,11,0.10)",
                border: "2px solid rgba(245,158,11,0.22)",
              }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--accent)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>
            </div>
            <h1
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              G-Scores
            </h1>
            <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
              Tra cứu kết quả kỳ thi THPT Quốc gia 2024
            </p>
            <div className="flex items-center justify-center gap-5 mt-4">
              {[
                { label: "Thí sinh", value: "1M+" },
                { label: "Môn thi", value: "9" },
                { label: "Năm học", value: "2024" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="text-base font-extrabold"
                    style={{ color: "var(--accent)" }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-wide font-medium mt-0.5"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Search card ── */}
        <div
          className="rounded-md overflow-hidden"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          <div
            className="px-6 py-4 flex items-center gap-3"
            style={{
              borderBottom: "1px solid var(--border)",
              background: "var(--surface2)",
            }}
          >
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.22)",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--accent)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </div>
            <div>
              <h2
                className="text-sm font-bold leading-none"
                style={{ color: "var(--text)" }}
              >
                Kết quả thi THPT 2024
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                Nhập số báo danh gồm 8 chữ số
              </p>
            </div>
          </div>

          <div className="px-6 py-5">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  inputMode="numeric"
                  value={sbd}
                  onChange={(e) =>
                    setSbd(e.target.value.replace(/\D/g, "").slice(0, 8))
                  }
                  onKeyDown={(e) => {
                    if (sbd.length >= 8 && /^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="VD: 01000001"
                  className="w-full h-11 pl-4 pr-14 text-sm font-mono tracking-[0.15em] outline-none rounded-xl transition-all"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border2)",
                    color: "var(--text)",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border2)")
                  }
                />
                {sbd.length > 0 && (
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] tabular-nums font-medium"
                    style={{
                      color:
                        sbd.length === 8 ? "var(--excellent)" : "var(--muted)",
                    }}
                  >
                    {sbd.length}/8
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={loading || sbd.trim().length < 8}
                className="h-11 px-6 text-sm font-bold rounded-xl transition-all disabled:opacity-40 shrink-0 whitespace-nowrap"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-fg)",
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Đang tìm...
                  </span>
                ) : (
                  "Tra cứu"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div
            className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl mt-4"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(248,113,113,0.3)",
              color: "var(--poor)",
            }}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {/* ── Result ── */}
        {result && (
          <div className="mt-6">
            <ScoreCard student={result} />
          </div>
        )}
      </div>
    </div>
  );
}
