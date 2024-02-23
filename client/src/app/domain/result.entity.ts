import { Portrait } from "./portrait.entity";

export class Result {
    idCandidate: Portrait
    voteCount: number

    constructor(options: {idCandidate: Portrait, voteCount: number}){
        this.idCandidate = options.idCandidate
        this.voteCount = options.voteCount
    }
}