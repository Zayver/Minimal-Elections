export class Vote{
    personero: number
    representative: number

    constructor(options: {personero: number, representative: number}){
        this.personero = options.personero
        this.representative = options.representative
    }
}