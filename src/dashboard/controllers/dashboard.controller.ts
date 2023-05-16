import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Dashboard } from '../entities/dashboard.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { CreateDashboardDto } from '../dto/dashboard.dto';
import { Repository } from 'typeorm';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private dashBoardServide: DashboardService,
    @Inject('DASHBOARD_REPOSITORY')
    private dashboardRepository: Repository<Dashboard>,
  ) {}

  @Get()
  @ApiTags('dashboard')
  @ApiOperation({
    summary: 'Devuelve un array con todos los dashboards',
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
    description: 'Devuelve el listado de tareas del tablero',
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
  @ApiTags('dashboard')
  @ApiOperation({
    summary: 'inserta un nuevo dashboard',
    description: 'inserta un nuevo dashboard',
  })
  @ApiBody({
    description: 'Tiene que llegar un objeto con la propiedad name',
    type: CreateDashboardDto,
  })
  insert(@Body() newDashboard: CreateDashboardDto) {    
    let dash: Dashboard = this.dashboardRepository.create({
      name: newDashboard.name,
    });
    return this.dashBoardServide.insert(dash);
  }
}
