import { Controller, Get, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { SearchStudentDto } from './dto/search-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('search')
  search(@Query() query: SearchStudentDto) {
    return this.studentsService.findBySbd(query.sbd);
  }
}
