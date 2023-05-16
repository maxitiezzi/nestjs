import { Get, Inject, Injectable } from '@nestjs/common';
import { Dashboard } from '../entities/dashboard.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('DASHBOARD_REPOSITORY')
    private dashboardRepository: Repository<Dashboard>,
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  getAll(): Promise<Dashboard[]> {
    return this.dashboardRepository.find();
  }

  get(id: number): Promise<Dashboard> {
    return this.dashboardRepository.findOneBy({ id: id });
  }

  getTareas(idDashboard: number): Promise<Task[]> {
    return this.taskRepository.findBy({ idDashboard: idDashboard });
  }

  insert(dashboard: Dashboard): Promise<Dashboard> {
    return this.dashboardRepository.save(dashboard);
  }
}
