import { Injectable } from '@nestjs/common';
import { Subject } from '../base/subject.abstract';

@Injectable()
export class PhysicsSubject extends Subject {
  readonly name = 'Vật Lý';
  readonly dbField = 'vat_li';
  readonly displayName = 'Vật Lý';
}
