import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Client } from 'pg';
import { UpdateTaskDto } from './dto/update-task.dto'; 
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Client,
    private prisma: PrismaService,
  ) {}

  public async getTasks(): Promise<any[]> {
    return await this.prisma.task.findMany();
  }

  public async getTaskById(id: number): Promise<any> {
    return await this.prisma.task.findUnique({
      where: { id: id },
    });
  }

  public async insertTask(task: CreateTaskDto): Promise<any> {
    return await this.prisma.task.create({
      data: task,
    });
  }

  public async updateTask(id: number, taskUpdated: UpdateTaskDto): Promise<any> {
    return await this.prisma.task.update({
      where: { id: id },
      data: taskUpdated,
    });
  }

  public async deleteTask(id: number): Promise<boolean> {
    const task = await this.prisma.task.delete({
      where: { id: id },
    });
    return !!task;
  }
}