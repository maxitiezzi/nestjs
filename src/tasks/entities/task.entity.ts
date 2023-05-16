import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum taskStatus {
  pending = 'pending',
  in_progress = 'in_Progress',
  done = 'done',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nombre de la tarea',
    maximum: 150,
  })
  @Column({ length: 500 })
  name: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  idDashboard: number;
}
