import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('/api/task')
export class TaskController {

  constructor(private readonly taskSvc: TaskService) {}
  
  // ? http://localhost:3000/api/task
  @Get()
  public async getTask(): Promise<any[]> {
    return await this.taskSvc.getTasks();
  }

  //!GET  http://localhost:3000/api/task/1
  @Get(':id')
  public async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const task = await this.taskSvc.getTaskById(id);
    if (task) {
        return task;
    } else {
        throw new HttpException(`Task no found`, HttpStatus.NOT_FOUND);
    }
  }

  //* POST http://localhost:3000/api/task
  @Post()
  public async insertTask(@Body() task: CreateTaskDto): Promise<any> {
    const newTask = await this.taskSvc.insertTask(task);
    return {
      message: "Tarea creada con éxito",
      data: newTask
    };
    
  }

  //! PUT http://localhost:3000/api/task/:id
  @Put(':id')
  public async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: any,
  ): Promise<any> {
    const updatedTask = await this.taskSvc.updateTask(id, task);
    
    return {
      success: true,
      message: `Tarea con ID ${id} actualizada con éxito`,
      data: updatedTask // Aquí vendrán los datos que regresa el service
    };
  }

  //? DELETE http://localhost:3000/api/task/:id
  @Delete(':id')
  public async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return await this.taskSvc.deleteTask(id);
  }
}