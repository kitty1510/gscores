import axios from 'axios';
import type { StudentResult, SubjectDistribution, Top10Student } from '../types';

const api = axios.create({ baseURL: '/api', timeout: 10_000 });

export const searchStudent = async (sbd: string): Promise<StudentResult> => {
  const { data } = await api.get<StudentResult>('/students/search', { params: { sbd } });
  return data;
};

export const getScoreDistribution = async (): Promise<SubjectDistribution[]> => {
  const { data } = await api.get<SubjectDistribution[]>('/statistics/score-distribution');
  return data;
};

export const getTop10GroupA = async (): Promise<Top10Student[]> => {
  const { data } = await api.get<Top10Student[]>('/statistics/top10-group-a');
  return data;
};
