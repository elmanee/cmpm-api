import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  public login(): string {
    return 'Task exitoso';
  }
}