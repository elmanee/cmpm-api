import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(100)
  name?: string;
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'La descripción debe tener al menos 3 caracteres',
  })
  @MaxLength(500)
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  priority?: boolean;
}
