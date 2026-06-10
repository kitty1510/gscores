import { Injectable } from '@nestjs/common';
import { Subject } from '../base/subject.abstract';

@Injectable()
export class HistorySubject extends Subject {
  readonly name = 'Lịch Sử';
  readonly dbField = 'lich_su';
  readonly displayName = 'Lịch Sử';
}
