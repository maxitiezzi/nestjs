import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/task.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { Repository } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TasksService,
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  @Get()
  @ApiTags('tasks')
  @ApiOperation({
    summary: 'Devuelve todas las tareas',
    description: 'Devuelve todas las tareas',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Task })
  @ApiResponse({ status: 404, type: Error })
  getAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiTags('tasks')
  @ApiOperation({
    summary: 'Devuelve una tarea',
    description: 'Devuelve una tarea',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Task })
  @ApiResponse({ status: 404, type: Error })
  get(@Param('id') id: number) {
    return this.taskService.get(id);
  }

  @Post()
  @ApiTags('tasks')
  @ApiOperation({
    summary: 'Inserta una nueva tarea',
    description:
      'Inserta una nueva tarea en la DB asociada a un tablero especifico',
  })
  @ApiBody({
    description: 'Tiene que llegar un objeto de tipo Task',
    type: Task,
  })
  @ApiResponse({ status: 200, type: Task })
  @ApiResponse({ status: 404, type: Error })
  insert(@Body() newTask: CreateTaskDto) {
    let task: Task = this.taskRepository.create({
      name: newTask.name,
      status: newTask.status,
      idDashboard: newTask.idDashboard,
    });

    return this.taskService.insert(task);
  }

  @Put(':id')
  @ApiTags('tasks')
  @ApiOperation({
    summary: 'Modifica una tarea',
    description: 'Modifica una tarea y la devuelve',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Task })
  @ApiResponse({ status: 404, type: Error })
  async update(@Param('id') id: number, @Body() task: UpdateTaskDto) {
    const taskUpdated = await this.taskRepository.findOneBy({ id: id });
    if (!taskUpdated || !taskUpdated.id) {
      throw new HttpException('No se encontro la tarea a modificar', 404);
    }
    taskUpdated.name = task.name;
    taskUpdated.status = task.status;

    return this.taskService.update(taskUpdated);
  }

  @Delete(':id')
  @ApiTags('tasks')
  @ApiOperation({
    summary: 'Elimina una tarea',
    description: 'Elimina una tarea',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, type: Error })
  async delete(@Param('id') id: number) {
    const taskUpdated = await this.taskRepository.findOneBy({ id: id });
    if (!taskUpdated || !taskUpdated.id) {
      throw new HttpException('No se encontro la tarea a eliminar', 404);
    }
    return this.taskService.delete(id);
  }
}
