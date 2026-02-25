import { Client } from 'pg';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskService {
    private db;
    constructor(db: Client);
    private tasks;
    getTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    insertTask(task: any): Promise<number>;
    updateTask(id: number, taskUpdated: UpdateTaskDto): Promise<any>;
    deleteTask(id: number): Promise<boolean>;
}
