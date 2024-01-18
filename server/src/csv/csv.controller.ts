import { CsvService } from './csv.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ReadQueryDto } from './dto';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Get()
  async read(@Query() query: ReadQueryDto) {
    return await this.csvService.read(query);
  }
}
