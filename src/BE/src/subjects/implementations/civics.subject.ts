import { Injectable } from '@nestjs/common';
import { Subject } from '../base/subject.abstract';

@Injectable()
export class CivicsSubject extends Subject {
  readonly name = 'GDCD';
  readonly dbField = 'gdcd';
  readonly displayName = 'Giáo Dục Công Dân';
}
