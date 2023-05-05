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


    get(id: number): Promise<Dashboard> {
        return this.dashboardRepository.findOneBy({ id: id })
    }

    getTareas(idDashBoard: number): Promise<Task[]> {
        return this.taskRepository.findBy({ idTablero: idDashBoard })
    }

    insert(name: string): Promise<Dashboard>{
        let dash:Dashboard = this.dashboardRepository.create({nombre:name})
        return this.dashboardRepository.save(dash)
    }

}
