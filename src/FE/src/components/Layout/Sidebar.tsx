import { NavLink } from 'react-router-dom';

interface Props { open: boolean; onClose: () => void; }

const NAV = [
  {
    to: '/', end: true, label: 'Tra cứu điểm',
    path: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
  },
  {
    to: '/statistics', end: false, label: 'Thống kê',
    path: 'M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z',
  },
  {
    to: '/top10', end: false, label: 'Top 10 Khối A',
    path: 'M5 3l3 6h8l3-6M5 3h14M12 3v9m-4 9h8M8 21v-3a4 4 0 0 1 8 0v3',
  },
];

export function Sidebar({ open, onClose }: Props) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 flex w-64 flex-col
        transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
      style={{ background: '#0d1117', borderRight: '1px solid var(--border)' }}
    >
      {/* Logo */}
      <div
        className="flex h-16 items-center gap-3 px-5 shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl shrink-0"
          style={{ background: 'var(--accent)' }}
        >
          <svg className="w-4.5 h-4.5" fill="var(--accent-fg)" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 0 0-.788 0l-7 3a1 1 0 0 0 0 1.84L5.25 8.051a1 1 0 0 1 .356-.357l4-2a1 1 0 1 1 .894 1.789L8 9.587l1.996.854A1 1 0 0 0 11 10.5v1.146l2.06.882.94-.94V9.5a1 1 0 0 0-.553-.894l-1.447-.62L14 7.24V9a1 1 0 1 0 2 0V6.5a1 1 0 0 0-.617-.924l-5-2.496zM4.447 8.342L10 10.79l5.553-2.448A1 1 0 0 1 17 9.5v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9.5a1 1 0 0 1 1.447-.893z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>G-Scores</p>
          <p className="text-[10px] font-medium tracking-wide" style={{ color: 'var(--muted)' }}>THPT 2024</p>
        </div>
        <button
          className="ml-auto lg:hidden flex items-center justify-center w-7 h-7 rounded-lg transition-colors"
          style={{ color: 'var(--muted)' }}
          onClick={onClose}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
        <p
          className="px-4 pb-3 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: 'var(--muted)' }}
        >
          Điều hướng
        </p>
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-150 ${
                isActive ? '' : 'hover:bg-white/4'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? 'rgba(245,158,11,0.10)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--muted)',
            })}
          >
            {({ isActive }) => (
              <>
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--muted)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.path} />
                </svg>
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: 'var(--accent)' }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 shrink-0">
        <div
          className="rounded-xl px-3.5 py-3 text-[11px] leading-relaxed"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>Dữ liệu trực tiếp</span>
          </div>
          <p style={{ color: 'var(--muted)' }}>Kỳ thi THPT Quốc gia 2024</p>
        </div>
      </div>
    </aside>
  );
}
