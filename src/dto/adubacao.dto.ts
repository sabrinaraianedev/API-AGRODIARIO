import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator'

export type AdubacaoListarDto = {
    id: number
    tipoAdubacao: string
    tipoAdubo: string
    data: string
    talhaoId: number
}

export class AdubacaoDtoCreate {

    @IsNotEmpty()
    @IsString()
    tipoAdubacao: string

    @IsNotEmpty()
    @IsString()
    tipoAdubo: string

    @IsNotEmpty()
    @IsDateString()
    data: string

    @IsNotEmpty()
    @IsNumber()
    talhaoId: number
}