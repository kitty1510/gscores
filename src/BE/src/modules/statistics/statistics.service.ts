import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/student.entity';
import { SubjectRegistry } from '../../subjects/subject.registry';
import { ScoreLevel, SCORE_LEVEL_LABELS } from '../../subjects/base/score-level.enum';
import { GroupASubjectGroup } from '../../subjects/groups/group-a.subject-group';

interface LevelStat {
  label: string;
  count: number;
}

interface SubjectDistribution {
  subject: string;
  dbField: string;
  levels: {
    excellent: LevelStat;
    good: LevelStat;
    average: LevelStat;
    poor: LevelStat;
  };
}

interface Top10Student {
  rank: number;
  sbd: string;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  total_score: number;
}

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly subjectRegistry: SubjectRegistry,
  ) {}

  async getScoreDistribution(): Promise<SubjectDistribution[]> {
    const results: SubjectDistribution[] = [];

    for (const subject of this.subjectRegistry.getAll()) {
      const selectParts = Object.values(ScoreLevel).map((level) =>
        subject.getCountQuery(level),
      );

      const row = await this.studentRepository
        .createQueryBuilder('s')
        .select(selectParts)
        .where(`s.${subject.dbField} IS NOT NULL`)
        .getRawOne<Record<string, number>>();

      results.push({
        subject: subject.displayName,
        dbField: subject.dbField,
        levels: {
          excellent: { label: SCORE_LEVEL_LABELS[ScoreLevel.EXCELLENT], count: row?.excellent ?? 0 },
          good:      { label: SCORE_LEVEL_LABELS[ScoreLevel.GOOD],      count: row?.good ?? 0 },
          average:   { label: SCORE_LEVEL_LABELS[ScoreLevel.AVERAGE],   count: row?.average ?? 0 },
          poor:      { label: SCORE_LEVEL_LABELS[ScoreLevel.POOR],      count: row?.poor ?? 0 },
        },
      });
    }

    return results;
  }

  async getTop10GroupA(): Promise<Top10Student[]> {
    const totalExpr = GroupASubjectGroup.getTotalScoreSQL();

    const rows = await this.studentRepository
      .createQueryBuilder('s')
      .select([
        's.sbd AS sbd',
        's.toan AS toan',
        's.vat_li AS vat_li',
        's.hoa_hoc AS hoa_hoc',
        `(${totalExpr}) AS total_score`,
      ])
      .where('s.toan IS NOT NULL AND s.vat_li IS NOT NULL AND s.hoa_hoc IS NOT NULL')
      .orderBy(`(${totalExpr})`, 'DESC')
      .limit(10)
      .getRawMany<{ sbd: string; toan: string; vat_li: string; hoa_hoc: string; total_score: string }>();

    return rows.map((r, idx) => ({
      rank: idx + 1,
      sbd: r.sbd,
      toan: parseFloat(r.toan),
      vat_li: parseFloat(r.vat_li),
      hoa_hoc: parseFloat(r.hoa_hoc),
      total_score: parseFloat(r.total_score),
    }));
  }
}
