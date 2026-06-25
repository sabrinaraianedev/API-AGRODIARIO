export type LimpezaProps = {
    id: number
    tipo: string
    data: Date
    talhaoId: number
}

export class Limpeza {

    private constructor(readonly props: LimpezaProps) {}

    public static build(
        tipo: string,
        data: Date,
        talhaoId: number
    ) {
        if (!tipo || !tipo.trim()) {
            throw new Error("O tipo da limpeza não pode ser vazio")
        }

        if (!data || isNaN(data.getTime())) {
            throw new Error("A data informada é inválida")
        }

        if (data > new Date()) {
            throw new Error("A data da limpeza não pode ser uma data futura")
        }

        if (!talhaoId || talhaoId <= 0) {
            throw new Error("A limpeza deve estar vinculada a um talhão válido")
        }

        const props: LimpezaProps = {
            id: 0,
            tipo,
            data,
            talhaoId
        }

        return new Limpeza(props)
    }

    public static construir(
        id: number,
        tipo: string,
        data: Date,
        talhaoId: number
    ) {
        const props: LimpezaProps = {
            id,
            tipo,
            data,
            talhaoId
        }

        return new Limpeza(props)
    }

    public get id() { return this.props.id }
    public get tipo() { return this.props.tipo }
    public get data() { return this.props.data }
    public get talhaoId() { return this.props.talhaoId }

    public toJSON() {
        return {
            id: this.props.id,
            tipo: this.props.tipo,
            data: this.props.data.toISOString().split('T')[0],
            talhaoId: this.props.talhaoId
        }
    }
}