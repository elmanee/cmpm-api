import { Client } from 'pg';
export declare class TaskService {
    private db;
    constructor(db: Client);
    private tasks;
    getTasks(): Promise<any[]>;
    getTaskById(id: number): Promise<any>;
    insertTask(task: any): Promise<number>;
    updateTask(id: number, task: any): Promise<any>;
    deleteTask(id: number): string;
}
