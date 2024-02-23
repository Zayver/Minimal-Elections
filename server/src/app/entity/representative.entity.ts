import { Entity } from "typeorm";
import { Candidate } from "./candidate.entity";

@Entity()
export class Representative extends Candidate{}