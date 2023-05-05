import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Dashboard } from './dashboard.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Controller('dashboard')
export class DashboardController {

    constructor(private dashBoardServide: DashboardService) { }

    @Get(':id')
    @ApiTags('dashboard')
    @ApiOperation({ summary: 'Devuelve un dashboard', description: 'Devuelve una dashboard' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: Dashboard, })
    @ApiResponse({ status: 404, type: Error, })
    getAll(@Param('id') id: number) {
        return this.dashBoardServide.get(id)
    }

    @Get(':id/tasks')
    @ApiTags('dashboard')
    @ApiOperation({ summary: 'Devuelve el listado de tareas del tablero', description: 'Devuelve el listado de tareas del tablero' })
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
    @ApiResponse({ status: 404, type: Error, })
    getTasks(@Param('id') id: number): Promise<Task[]> {
        return this.dashBoardServide.getTareas(id)
    }

    @Post()
    insert(@Body('nombre') nombre: string){        
        return this.dashBoardServide.insert(nombre)
    }
}
