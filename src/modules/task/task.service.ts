import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { Client } from 'pg';

@Injectable()
export class TaskService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Client,
    private prisma: PrismaService,
  ) {}

  public async getTasks(userId: number): Promise<any[]> {
    return await this.prisma.task.findMany({
      where: { user_id: userId },
    });
  }

  public async getTaskById(id: number, userId: number): Promise<any> {
    return await this.prisma.task.findFirst({
      where: { id, user_id: userId },
    });
  }

  public async insertTask(task: CreateTaskDto): Promise<any> {
    return await this.prisma.task.create({
      data: task,
    });
  }

  public async updateTask(id: number, userId: number, taskUpdated: UpdateTaskDto): Promise<any> {
    const task = await this.prisma.task.findFirst({ where: { id, user_id: userId } });
    if (!task) throw new HttpException('No tienes permiso o la tarea no existe', HttpStatus.FORBIDDEN);
    return await this.prisma.task.update({
      where: { id },
      data: taskUpdated,
    });
  }

  public async deleteTask(id: number, userId: number): Promise<any> {
    try {
      const task = await this.getTaskById(id, userId);
      if (!task) throw new Error();
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (e) {
      throw new HttpException('No se pudo eliminar la tarea', HttpStatus.FORBIDDEN);
    }
  }
}