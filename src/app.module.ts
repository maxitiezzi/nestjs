import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [TasksModule, DashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
