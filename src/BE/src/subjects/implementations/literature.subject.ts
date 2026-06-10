import { Injectable } from '@nestjs/common';
import { Subject } from '../base/subject.abstract';

@Injectable()
export class LiteratureSubject extends Subject {
  readonly name = 'Ngữ Văn';
  readonly dbField = 'ngu_van';
  readonly displayName = 'Ngữ Văn';
}
