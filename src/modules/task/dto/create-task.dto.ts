import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, Length } from 'class-validator';
import { IsNotEmpty, IsNumber, IsString, IsInt } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 500)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 500)
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  priority: boolean;

  @IsNumber()
  @IsInt()
  user_id: number;
}
