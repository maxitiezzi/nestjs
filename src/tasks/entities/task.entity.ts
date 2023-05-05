import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Nombre de la tarea',
        maximum: 150
    })
    @Column({ length: 500 })
    name: string;

    @ApiProperty()
    @Column({ default: false })
    isPublished: boolean;

    @ApiProperty({ nullable: true })
    @Column({ nullable: true })
    idTablero: number;

}