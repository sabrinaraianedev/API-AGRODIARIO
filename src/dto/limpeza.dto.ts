import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator'

export type LimpezaListarDto = {
    id: number
    tipo: string
    data: string
    talhaoId: number
}

export class LimpezaDtoCreate {

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