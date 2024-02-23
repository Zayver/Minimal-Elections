import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { VotePersonero, VoteRepresentative } from '../../entity/vote.entity';

@Injectable()
export class AdminService {
    constructor(private em: EntityManager){}

    async getResultsPersonero(): Promise<VotePersonero[]>{
        return await this.em.find(VotePersonero, {relations: ["idCandidate"]})
    }

    async getResultsRepresentative(): Promise<VoteRepresentative[]>{
        return await this.em.find(VoteRepresentative, {relations: ["idCandidate"]})
    }
}
