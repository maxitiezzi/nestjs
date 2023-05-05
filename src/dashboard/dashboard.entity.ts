import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    nombre: string;

}