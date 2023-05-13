import { ApiProperty } from "@nestjs/swagger";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Dashboard {

    @ApiProperty({ nullable: true })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Nombre del tablero',
        maximum: 75
    })
    @Column()
    name: string;

    @OneToMany(type => Task, task => task.id)
    tasks: Task[];

}