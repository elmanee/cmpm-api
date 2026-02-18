import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { clearScreenDown } from 'readline';

@Module({
  imports: [TaskModule, AuthModule],
  controllers: [], 
  providers: [],   
})
export class AppModule {}clearScreenDown