export class Portrait{
    id: number
    imgUrl: string
    name: string

    constructor(options:{id: number, imgUrl: string, name: string}){
        this.id = options.id
        this.imgUrl = options.imgUrl
        this.name = options.name
    }
}