import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TaskController {
    private readonly taskSvc;
    constructor(taskSvc: TaskService);
    getTask(): Promise<any[]>;
    getTaskById(id: number): Promise<any>;
    insertTask(task: CreateTaskDto): Promise<any>;
    updateTask(id: number, task: any): Promise<any>;
    deleteTask(id: number): Promise<string>;
}
