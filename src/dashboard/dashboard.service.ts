import { Get, Inject, Injectable } from '@nestjs/common';
import { Dashboard } from './dashboard.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class DashboardService {
    constructor(
        @Inject('DASHBOARD_REPOSITORY')
        private dashboardRepository: Repository<Dashboard>,
        @Inject('TASK_REPOSITORY')
        private taskRepository: Repository<Task>,
    ) { }

    getAll(): Promise<Dashboard[]> {
        return this.dashboardRepository.find()
    }

    get(id: number): Promise<Dashboard> {
        return this.dashboardRepository.findOneBy({ id: id })
    }

    getTareas(idDashboard: number): Promise<Task[]> {
        return this.taskRepository.findBy({ idDashboard: idDashboard })
    }

    insert(name: string): Promise<Dashboard> {
        let dash: Dashboard = this.dashboardRepository.create({ name: name })
        return this.dashboardRepository.save(dash)
    }

}
