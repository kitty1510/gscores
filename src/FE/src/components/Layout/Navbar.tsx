import { NavLink } from 'react-router-dom';

export function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">G-Scores</span>
          <span className="text-xs text-gray-400 mt-1">THPT 2024</span>
        </div>
        <div className="flex gap-2">
          <NavLink to="/" className={linkClass} end>
            Tra cứu điểm
          </NavLink>
          <NavLink to="/statistics" className={linkClass}>
            Thống kê
          </NavLink>
          <NavLink to="/top10" className={linkClass}>
            Top 10 Khối A
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
