import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator'

export type PreparacaoSoloListarDto = {
    id: number
    tipo: string
    data: string
    talhaoId: number
}

export class PreparacaoSoloDtoCreate {

    @IsNotEmpty()
    @IsString()
    tipo: string

    @IsNotEmpty()
    @IsDateString()
    data: string

    @IsNotEmpty()
    @IsNumber()
    talhaoId: number
}