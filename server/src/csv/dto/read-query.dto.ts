import { IsNumberString, IsOptional, Max } from 'class-validator';

export class ReadQueryDto {
  @IsNumberString()
  @IsOptional()
  @Max(30)
  limit: number;

  @IsNumberString()
  @IsOptional()
  page: number;
}
