import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Candidate{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    imgUrl: string
}