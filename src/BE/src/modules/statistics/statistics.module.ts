import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { StudentsModule } from '../students/students.module';
import { SubjectsModule } from '../../subjects/subjects.module';

@Module({
  imports: [StudentsModule, SubjectsModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
