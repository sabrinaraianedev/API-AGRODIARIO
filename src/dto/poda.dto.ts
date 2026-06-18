import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator'

export type PodaListarDto = {
    id: number
    tipo: string // <-- Adicionado
    data: string
    talhaoId: number
}

export class PodaDtoCreate {

    @IsNotEmpty()
    @IsString()
    tipo: string // <-- Adicionado

    @IsNotEmpty()
    @IsDateString()
    data: string

    @IsNotEmpty()
    @IsNumber()
    talhaoId: number
}