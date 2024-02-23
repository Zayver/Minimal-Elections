import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Candidate } from '../../entity/candidate.entity';
import { Personero } from '../../entity/personero.entity';
import { Representative } from '../../entity/representative.entity';
import { VoteRequest } from '../../entity/vote.request';
import { VotePersonero, VoteRepresentative } from '../../entity/vote.entity';

@Injectable()
export class VoteService {
    constructor(private em: EntityManager, private ds: DataSource) { }

    async getPersoneros(): Promise<Candidate[]> {
        return this.em.find(Personero)
    }

    async getRepresentatives(): Promise<Candidate[]> {
        return this.em.find(Representative)
    }

    async vote(vote: VoteRequest) {
        const personero = await this.em.findBy(Personero, {id: vote.personero})
        const representative = await this.em.findBy(Representative, {id: vote.representative})
        
        const voteP = await this.em.findOne(VotePersonero, {where: {idCandidate: personero}})
        voteP.voteCount += 1
        await this.em.save(voteP)

        const voteR = await this.em.findOne(VoteRepresentative, {where: {idCandidate: representative}})
        voteR.voteCount += 1
        await this.em.save(voteR)
    }

}
