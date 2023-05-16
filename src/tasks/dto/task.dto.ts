import { taskStatus } from '../entities/task.entity';
import { IsIn, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsIn([taskStatus.done, taskStatus.in_progress, taskStatus.pending])
  status?: taskStatus;

  @IsNumber()
  @IsOptional()
  idDashboard: number;
}

export class UpdateTaskDto {
  @IsString()
  name: string;

  @IsIn([taskStatus.done, taskStatus.in_progress, taskStatus.pending])
  status?: taskStatus;
}
