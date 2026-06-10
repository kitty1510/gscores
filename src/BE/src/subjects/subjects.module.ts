import { Module } from '@nestjs/common';
import { MathSubject } from './implementations/math.subject';
import { LiteratureSubject } from './implementations/literature.subject';
import { PhysicsSubject } from './implementations/physics.subject';
import { ChemistrySubject } from './implementations/chemistry.subject';
import { BiologySubject } from './implementations/biology.subject';
import { HistorySubject } from './implementations/history.subject';
import { GeographySubject } from './implementations/geography.subject';
import { CivicsSubject } from './implementations/civics.subject';
import { ForeignLanguageSubject } from './implementations/foreign-language.subject';
import { SubjectRegistry } from './subject.registry';

const SUBJECT_PROVIDERS = [
  MathSubject,
  LiteratureSubject,
  PhysicsSubject,
  ChemistrySubject,
  BiologySubject,
  HistorySubject,
  GeographySubject,
  CivicsSubject,
  ForeignLanguageSubject,
  SubjectRegistry,
];

@Module({
  providers: SUBJECT_PROVIDERS,
  exports: SUBJECT_PROVIDERS,
})
export class SubjectsModule {}
