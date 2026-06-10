import { Injectable } from '@nestjs/common';
import { Subject } from '../base/subject.abstract';

@Injectable()
export class BiologySubject extends Subject {
  readonly name = 'Sinh Học';
  readonly dbField = 'sinh_hoc';
  readonly displayName = 'Sinh Học';
}
