import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { Client } from 'pg';
export declare class TaskService {
    private db;
    private prisma;
    constructor(db: Client, prisma: PrismaService);
    getTasks(userId: number): Promise<any[]>;
    getTaskById(id: number, userId: number): Promise<any>;
    insertTask(task: CreateTaskDto): Promise<any>;
    updateTask(id: number, userId: number, taskUpdated: UpdateTaskDto): Promise<any>;
    deleteTask(id: number, userId: number): Promise<any>;
}
