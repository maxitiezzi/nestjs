import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum taskStatus {
  pending = 'pending',
  in_progress = 'in_Progress',
  done = 'done',
}

@Entity()
export class Task {
  @ApiProperty({
    description: 'Primary key',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nombre de la tarea',
    maximum: 150,
  })
  @Column({ length: 500 })
  name: string;

  @ApiProperty({
    description:
      "Estado de la tarea, los posibles estados son 'done', 'in_progress', 'pending'",
  })
  @Column({ nullable: false })
  status: string;

  @ApiProperty({
    description: 'Foreign key a la tabla dashboard',
  })
  @Column({ nullable: false })
  idDashboard: number;
}
