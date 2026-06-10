import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('score-distribution')
  getScoreDistribution() {
    return this.statisticsService.getScoreDistribution();
  }

  @Get('top10-group-a')
  getTop10GroupA() {
    return this.statisticsService.getTop10GroupA();
  }
}
