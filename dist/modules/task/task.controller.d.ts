import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskSvc;
    constructor(taskSvc: TaskService);
    getTask(): Promise<any[]>;
    getTaskById(id: number): Promise<any>;
    insertTask(task: CreateTaskDto): Promise<any>;
    updateTask(id: number, task: UpdateTaskDto): Promise<any>;
    deleteTask(id: number): Promise<boolean>;
}
