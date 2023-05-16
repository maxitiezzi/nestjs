import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { DatabaseModule } from '../database/database.module';
import { taskProviders } from './task.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...taskProviders, TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
