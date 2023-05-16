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

  async insert(task: Task) {
    return this.taskRepository.save(task);
  }

  async update(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async delete(id: number) {
    this.taskRepository.delete(id);
  }
}
