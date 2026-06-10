import { Injectable } from '@nestjs/common';
import { Subject } from './base/subject.abstract';
import { MathSubject } from './implementations/math.subject';
import { LiteratureSubject } from './implementations/literature.subject';
import { PhysicsSubject } from './implementations/physics.subject';
import { ChemistrySubject } from './implementations/chemistry.subject';
import { BiologySubject } from './implementations/biology.subject';
import { HistorySubject } from './implementations/history.subject';
import { GeographySubject } from './implementations/geography.subject';
import { CivicsSubject } from './implementations/civics.subject';
import { ForeignLanguageSubject } from './implementations/foreign-language.subject';

@Injectable()
export class SubjectRegistry {
  private readonly subjects: Subject[];

  constructor(
    private readonly math: MathSubject,
    private readonly literature: LiteratureSubject,
    private readonly physics: PhysicsSubject,
    private readonly chemistry: ChemistrySubject,
    private readonly biology: BiologySubject,
    private readonly history: HistorySubject,
    private readonly geography: GeographySubject,
    private readonly civics: CivicsSubject,
    private readonly foreignLanguage: ForeignLanguageSubject,
  ) {
    this.subjects = [
      math,
      literature,
      foreignLanguage,
      physics,
      chemistry,
      biology,
      history,
      geography,
      civics,
    ];
  }

  getAll(): Subject[] {
    return this.subjects;
  }

  getGroupA(): Subject[] {
    return [this.math, this.physics, this.chemistry];
  }

  findByField(field: string): Subject | undefined {
    return this.subjects.find((s) => s.dbField === field);
  }
}
