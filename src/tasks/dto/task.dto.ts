import { taskStatus } from '../entities/task.entity';
import {
  IsIn,
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn([taskStatus.done, taskStatus.in_progress, taskStatus.pending])
  @IsNotEmpty()
  status?: taskStatus;

  @IsNumber()
  @IsOptional()
  idDashboard: number;
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn([taskStatus.done, taskStatus.in_progress, taskStatus.pending])
  @IsNotEmpty()
  status?: taskStatus;
}
