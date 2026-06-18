export type TalhaoProps = {
    id: number
    area: number
    fazendaId: number
}

export class Talhao {

    private constructor(readonly props: TalhaoProps) {}

    public static build(
        area: number,
        fazendaId: number
    ) {
        // Regra de negócio simples: validação interna dos próprios atributos
        if (area <= 0) {
            throw new Error("A área do talhão deve ser maior que zero")
        }

        if (!fazendaId || fazendaId <= 0) {
            throw new Error("O talhão deve estar vinculado a uma fazenda válida")
        }

        const props: TalhaoProps = {
            id: 0,
            area,
            fazendaId
        }

        return new Talhao(props)
    }

    public static construir(
        id: number,
        area: number,
        fazendaId: number
    ) {
        const props: TalhaoProps = {
            id,
            area,
            fazendaId
        }

        return new Talhao(props)
    }

    public get id() {
        return this.props.id
    }

    public get area() {
        return this.props.area
    }

    public get fazendaId() {
        return this.props.fazendaId
    }

    public toJSON() {
        return {
            id: this.props.id,
            area: this.props.area,
            fazendaId: this.props.fazendaId
        }
    }
}