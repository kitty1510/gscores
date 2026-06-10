import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { SubjectRegistry } from '../../subjects/subject.registry';
import { ScoreLevel } from '../../subjects/base/score-level.enum';

interface ScoreEntry {
  displayName: string;
  score: number | null;
  level: ScoreLevel | null;
}

interface StudentResult {
  sbd: string;
  ma_ngoai_ngu: string | null;
  scores: Record<string, ScoreEntry>;
}

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly subjectRegistry: SubjectRegistry,
  ) {}

  async findBySbd(sbd: string): Promise<StudentResult> {
    const student = await this.studentRepository.findOne({ where: { sbd } });
    if (!student) {
      throw new NotFoundException(`Không tìm thấy thí sinh với số báo danh: ${sbd}`);
    }
    return this.formatStudentResult(student);
  }

  private formatStudentResult(student: Student): StudentResult {
    const scores: Record<string, ScoreEntry> = {};
    for (const subject of this.subjectRegistry.getAll()) {
      const score = student[subject.dbField as keyof Student] as number | null;
      scores[subject.dbField] = {
        displayName: subject.displayName,
        score,
        level: score !== null ? subject.getScoreLevel(score) : null,
      };
    }
    return {
      sbd: student.sbd,
      ma_ngoai_ngu: student.ma_ngoai_ngu,
      scores,
    };
  }
}
