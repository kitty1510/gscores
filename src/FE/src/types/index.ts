export interface ScoreInfo {
  displayName: string;
  score: number | null;
  level: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR' | null;
}

export interface StudentResult {
  sbd: string;
  ma_ngoai_ngu: string | null;
  scores: Record<string, ScoreInfo>;
}

export interface ScoreLevelStats {
  label: string;
  count: number;
}

export interface SubjectDistribution {
  subject: string;
  dbField: string;
  levels: {
    excellent: ScoreLevelStats;
    good: ScoreLevelStats;
    average: ScoreLevelStats;
    poor: ScoreLevelStats;
  };
}

export interface Top10Student {
  rank: number;
  sbd: string;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  total_score: number;
}
