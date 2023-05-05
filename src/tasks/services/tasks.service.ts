import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @Inject('TASK_REPOSITORY')
        private taskRepository: Repository<Task>,
    ) { }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async insert(name: string, idTablero: number) {
        let newTask: Task = this.taskRepository.create({ name: name, idTablero: idTablero })
        return this.taskRepository.save(newTask)
    }

    async update(id: number, task: Task): Promise<Task> {
        const taskUpdated = await this.taskRepository.findOneBy({ id: id });
        this.taskRepository.merge(taskUpdated, task)
        return this.taskRepository.save(taskUpdated)
    }

    async delete(id: number) {
        this.taskRepository.delete(id)
    }

}
