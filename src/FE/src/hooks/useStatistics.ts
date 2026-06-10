import { useEffect, useState } from 'react';
import { getScoreDistribution, getTop10GroupA } from '../services/api';
import type { SubjectDistribution, Top10Student } from '../types';

export function useScoreDistribution() {
  const [data, setData] = useState<SubjectDistribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getScoreDistribution()
      .then((d) => { if (!cancelled) setData(d); })
      .catch(() => { if (!cancelled) setError('Không thể tải dữ liệu thống kê'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useTop10GroupA() {
  const [data, setData] = useState<Top10Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getTop10GroupA()
      .then((d) => { if (!cancelled) setData(d); })
      .catch(() => { if (!cancelled) setError('Không thể tải dữ liệu top 10'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
