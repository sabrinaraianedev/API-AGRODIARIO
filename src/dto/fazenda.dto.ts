import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export type FazendaListarDto = {
    id: number,
    nome: string,
    proprietario: string,
    localizacao: string,
    areaTotal: number
}

export class FazendaDtoCreate {

    @IsNotEmpty()
    @IsString()
    nome: string

    @IsNotEmpty()
    @IsString()
    proprietario: string

    @IsNotEmpty()
    @IsString()
    localizacao: string

    @IsNotEmpty()
    @IsNumber()
    areaTotal: number
}