import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { dashboardProviders } from './dashboard.provider';
import { DatabaseModule } from 'src/database/database.module';
import { TasksService } from 'src/tasks/services/tasks.service';
import { taskProviders } from 'src/tasks/task.provider';

@Module({
  providers: [
    ...dashboardProviders,
    ...taskProviders,
    DashboardService,
    TasksService],
  controllers: [DashboardController],
  imports: [DatabaseModule]
})
export class DashboardModule { }
