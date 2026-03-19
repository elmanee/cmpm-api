import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskSvc;
    constructor(taskSvc: TaskService);
    getTasks(request: any): Promise<any[]>;
    getTaskById(id: number, request: any): Promise<any>;
    insertTask(task: CreateTaskDto, request: any): Promise<any>;
    updateTask(id: number, task: UpdateTaskDto, request: any): Promise<any>;
    deleteTask(id: number, request: any): Promise<boolean>;
}
