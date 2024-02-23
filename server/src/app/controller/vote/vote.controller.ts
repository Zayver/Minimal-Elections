import { Body, Controller, Get, Post, } from '@nestjs/common';
import { Candidate } from '../../entity/candidate.entity';
import { VoteService } from '../../service/vote/vote.service';
import { VoteRequest } from '../../entity/vote.request';

@Controller('vote')
export class VoteController {

    constructor(private voteService: VoteService){}

    @Get("personeros")
    async getPersoneros(): Promise<Candidate[]> {
        return await this.voteService.getPersoneros()
    }

    @Get("representatives")
    async getRepresentatives(): Promise<Candidate[]> {
        return await this.voteService.getRepresentatives()
    }

    @Post()
    async vote(@Body() req: VoteRequest): Promise<any>{
        return await this.voteService.vote(req)
    }
}
