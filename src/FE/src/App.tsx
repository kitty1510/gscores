import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { SearchPage } from './pages/SearchPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { Top10Page } from './pages/Top10Page';

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {open && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Mobile-only minimal bar with hamburger */}
        <div
          className="lg:hidden flex h-12 shrink-0 items-center gap-3 px-4"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
        >
          <button
            className="flex items-center justify-center w-8 h-8 rounded-xl"
            style={{ color: 'var(--muted)', background: 'var(--surface2)' }}
            onClick={() => setOpen(true)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>G-Scores</span>
        </div>

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/top10" element={<Top10Page />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
