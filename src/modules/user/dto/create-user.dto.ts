import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
//import { Task } from 'src/modules/task/entities/task.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 250)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 250)
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password?: string;

  created_at: Date;

  // tasks: Task[];
}