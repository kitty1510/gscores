import { Injectable } from '@nestjs/common';
import { Subject } from '../base/subject.abstract';

@Injectable()
export class ChemistrySubject extends Subject {
  readonly name = 'Hóa Học';
  readonly dbField = 'hoa_hoc';
  readonly displayName = 'Hóa Học';
}
