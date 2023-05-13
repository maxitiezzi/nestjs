import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/task.entity';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type } from 'os';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()
    @ApiTags('tasks')
    @ApiOperation({ summary: 'Devuelve todas las tareas', description: 'Devuelve todas las tareas' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: Task, })
    @ApiResponse({ status: 404, type: Error, })
    getAll() {
        return this.taskService.findAll()
    }

    @Get(':id')
    @ApiTags('tasks')
    @ApiOperation({ summary: 'Devuelve una tarea', description: 'Devuelve una tarea' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: Task, })
    @ApiResponse({ status: 404, type: Error, })
    get(@Param('id') id: number) {
        return this.taskService.get(id)
    }

    @Post()
    @ApiTags('tasks')
    @ApiOperation({ summary: 'Inserta una nueva tarea', description: 'Inserta una nueva tarea en la DB asociada a un tablero especifico' })
    @ApiBody(({ description: 'Tiene que llegar un objeto de tipo Task', type: Task }))
    @ApiResponse({ status: 200, type: Task, })
    @ApiResponse({ status: 404, type: Error, })
    insert(@Body() newTask: CreateTaskDto) {
        return this.taskService.insert(newTask.name, newTask.status, newTask.idDashboard)
    }

    @Put(':id')
    @ApiTags('tasks')
    @ApiOperation({ summary: 'Modifica una tarea', description: 'Modifica una tarea y la devuelve' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: Task, })
    @ApiResponse({ status: 404, type: Error, })
    update(@Param('id') id: number, @Body() task: UpdateTaskDto) {
        return this.taskService.update(id, task.name, task.status)
    }

    @Delete(':id')
    @ApiTags('tasks')
    @ApiOperation({ summary: 'Elimina una tarea', description: 'Elimina una tarea' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, })
    @ApiResponse({ status: 404, type: Error, })
    delete(@Param('id') id: number) {
        return this.taskService.delete(id)
    }
}
