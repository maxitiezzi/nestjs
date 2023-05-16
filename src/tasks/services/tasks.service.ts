import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  async get(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async insert(name: string, status: string, idDasboard: number) {
    let newTask: Task = this.taskRepository.create({
      name: name,
      status: status,
      idDashboard: idDasboard,
    });
    return this.taskRepository.save(newTask);
  }

  async update(id: number, name: string, status: string): Promise<Task> {
    const taskUpdated = await this.taskRepository.findOneBy({ id: id });
    taskUpdated.name = name;
    taskUpdated.status = status;
    return this.taskRepository.save(taskUpdated);
  }

  async delete(id: number) {
    this.taskRepository.delete(id);
  }
}
