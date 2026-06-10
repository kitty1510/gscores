import { useState } from 'react';
import { searchStudent } from '../services/api';
import type { StudentResult } from '../types';

export function useStudentSearch() {
  const [result, setResult] = useState<StudentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (sbd: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await searchStudent(sbd);
      setResult(data);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: unknown } } };
      const apiMsg = e?.response?.data?.message;
      if (typeof apiMsg === 'string') {
        setError(apiMsg);
      } else if (e?.response) {
        setError('Đã xảy ra lỗi, vui lòng thử lại');
      } else {
        setError('Không thể kết nối đến máy chủ');
      }
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, search };
}
