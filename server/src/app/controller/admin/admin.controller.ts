import { Controller, Get } from '@nestjs/common';
import { VotePersonero } from '../../entity/vote.entity';
import { AdminService } from '../../service/admin/admin.service';

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService){}

    @Get('personero')
    async getResultsPersonero(): Promise<VotePersonero[]>{
        return this.adminService.getResultsPersonero()
    }

    @Get('representative')
    async getResultsRepresentative(): Promise<VotePersonero[]>{
        return this.adminService.getResultsRepresentative()
    }
}
