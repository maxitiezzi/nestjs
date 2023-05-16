import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Dashboard } from '../entities/dashboard.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashBoardServide: DashboardService) {}

  @Get()
  @ApiTags('dashboard')
  @ApiOperation({
    summary: 'Devuelve un array con todos los dashboards, merge request',
    description: 'Devuelve un array con todos los dashboards',
  })
  @ApiResponse({ status: 200, type: Dashboard })
  @ApiResponse({ status: 404, type: Error })
  getAll() {
    return this.dashBoardServide.getAll();
  }

  @Get(':id/tasks')
  @ApiTags('dashboard')
  @ApiOperation({
    summary: 'Devuelve el listado de tareas del tablero',
    description: 'Devuelve el listado de tareas del tablero    ',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    description: 'Array de tareas',
    schema: {
      type: 'array',
      items: {
        type: 'object',
      },
    },
  })
  @ApiResponse({ status: 404, type: Error })
  getTasks(@Param('id') id: number): Promise<Task[]> {
    return this.dashBoardServide.getTareas(id);
  }

  @Post()
  insert(@Body('name') name: string) {
    return this.dashBoardServide.insert(name);
  }
}
