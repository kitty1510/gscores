import { Injectable } from '@nestjs/common';
import { Subject } from '../base/subject.abstract';

@Injectable()
export class GeographySubject extends Subject {
  readonly name = 'Địa Lý';
  readonly dbField = 'dia_li';
  readonly displayName = 'Địa Lý';
}
