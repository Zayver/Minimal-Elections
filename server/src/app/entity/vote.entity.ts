import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Personero } from "./personero.entity";
import { Representative } from "./representative.entity";

@Entity()
export class VotePersonero {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Personero)
    @JoinColumn({ name: 'id' })
    idCandidate: Personero;

    @Column({default: 0})
    voteCount: number
}

@Entity()
export class VoteRepresentative {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Representative)
    @JoinColumn({ name: 'id' })
    idCandidate: Representative;

    @Column({default: 0})
    voteCount: number
}