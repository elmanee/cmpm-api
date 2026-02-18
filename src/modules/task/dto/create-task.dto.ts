import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min,IsInt } from 'class-validator';


export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsBoolean()
  @IsNotEmpty()
  priority: boolean;

  @IsNumber()
  @IsInt()
  user_id: number;
}