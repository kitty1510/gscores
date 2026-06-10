import { ScoreLevel } from './score-level.enum';

export abstract class Subject {
  abstract readonly name: string;
  abstract readonly dbField: string;
  abstract readonly displayName: string;

  getScoreLevel(score: number | null): ScoreLevel | null {
    if (score === null) return null;
    if (score >= 8) return ScoreLevel.EXCELLENT;
    if (score >= 6) return ScoreLevel.GOOD;
    if (score >= 4) return ScoreLevel.AVERAGE;
    return ScoreLevel.POOR;
  }

  getSQLLevelCondition(level: ScoreLevel): string {
    switch (level) {
      case ScoreLevel.EXCELLENT:
        return `"${this.dbField}" >= 8`;
      case ScoreLevel.GOOD:
        return `"${this.dbField}" >= 6 AND "${this.dbField}" < 8`;
      case ScoreLevel.AVERAGE:
        return `"${this.dbField}" >= 4 AND "${this.dbField}" < 6`;
      case ScoreLevel.POOR:
        return `"${this.dbField}" < 4`;
    }
  }

  getCountQuery(level: ScoreLevel): string {
    return `COUNT(CASE WHEN ${this.getSQLLevelCondition(level)} THEN 1 END)::int AS "${level.toLowerCase()}"`;
  }
}
