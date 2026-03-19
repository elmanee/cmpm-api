import {
  Body, Controller, Delete, Get, HttpCode,
  HttpException, HttpStatus, Param, ParseIntPipe,
  Post, Put, Req, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('tasks')
@UseGuards(AuthGuard)
@Controller('/api/task')
export class TaskController {
  constructor(private readonly taskSvc: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Lista las tareas del usuario' })
  public async getTasks(@Req() request: any): Promise<any[]> {
    const userId = request.user.id;
    return await this.taskSvc.getTasks(userId);
  }

  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: any,
  ): Promise<any> {
    const userId = request.user.id;
    const task = await this.taskSvc.getTaskById(id, userId);
    if (!task) throw new HttpException('Task Not Found or Access Denied', 404);
    return task;
  }

  @Post()
  public async insertTask(
    @Body() task: CreateTaskDto,
    @Req() request: any,
  ): Promise<any> {
    const userId = request.user.id;
    return await this.taskSvc.insertTask({ ...task, user_id: userId });
  }

  @Put(':id')
  public async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
    @Req() request: any,
  ): Promise<any> {
    const userId = request.user.id;
    return await this.taskSvc.updateTask(id, userId, task);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: any,
  ): Promise<boolean> {
    const userId = request.user.id;
    await this.taskSvc.deleteTask(id, userId);
    return true;
  }
}