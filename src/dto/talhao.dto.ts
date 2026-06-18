import { IsNotEmpty, IsNumber, Min } from 'class-validator'

export type TalhaoListarDto = {
    id: number
    area: number
    fazendaId: number
}

export class TalhaoDtoCreate {

    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
    area: number

    @IsNotEmpty()
    @IsNumber()
    fazendaId: number
}