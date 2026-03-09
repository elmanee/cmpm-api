import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TaskModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}