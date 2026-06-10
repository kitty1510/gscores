import { Injectable } from '@nestjs/common';
import { Subject } from '../base/subject.abstract';

@Injectable()
export class ForeignLanguageSubject extends Subject {
  readonly name = 'Ngoại Ngữ';
  readonly dbField = 'ngoai_ngu';
  readonly displayName = 'Ngoại Ngữ';
}
