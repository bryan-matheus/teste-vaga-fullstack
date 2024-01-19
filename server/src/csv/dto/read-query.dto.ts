import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class ReadQueryDto {
  @Min(5)
  @Max(30)
  @IsNumber()
  @IsOptional()
  @Transform((v) => Number(v.value))
  limit: number;

  @IsNumberString()
  @IsOptional()
  @Transform((v) => Number(v.value))
  page: number;
}
