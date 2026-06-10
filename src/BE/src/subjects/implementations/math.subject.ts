import { Injectable } from '@nestjs/common';
import { Subject } from '../base/subject.abstract';

@Injectable()
export class MathSubject extends Subject {
  readonly name = 'Toán';
  readonly dbField = 'toan';
  readonly displayName = 'Toán học';
}
