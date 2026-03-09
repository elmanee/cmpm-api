import { CreateTaskDto } from './dto/create-task.dto';
import { Client } from 'pg';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
export declare class TaskService {
    private db;
    private prisma;
    constructor(db: Client, prisma: PrismaService);
    getTasks(): Promise<any[]>;
    getTaskById(id: number): Promise<any>;
    insertTask(task: CreateTaskDto): Promise<any>;
    updateTask(id: number, taskUpdated: UpdateTaskDto): Promise<any>;
    deleteTask(id: number): Promise<boolean>;
}
