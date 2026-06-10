export enum ScoreLevel {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  AVERAGE = 'AVERAGE',
  POOR = 'POOR',
}

export const SCORE_LEVEL_LABELS: Record<ScoreLevel, string> = {
  [ScoreLevel.EXCELLENT]: '>= 8 điểm',
  [ScoreLevel.GOOD]: '6 - 8 điểm',
  [ScoreLevel.AVERAGE]: '4 - 6 điểm',
  [ScoreLevel.POOR]: '< 4 điểm',
};
