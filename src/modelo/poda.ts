export type PodaProps = {
    id: number
    tipo: string     // <-- Adicionado
    data: Date
    talhaoId: number
}

export class Poda {

    private constructor(readonly props: PodaProps) {}

    public static build(
        tipo: string, // <-- Adicionado
        data: Date,
        talhaoId: number
    ) {
        // Regras de negócio simples
        if (!tipo || !tipo.trim()) {
            throw new Error("O tipo da poda não pode ser vazio")
        }

        if (!data || isNaN(data.getTime())) {
            throw new Error("A data da poda informada é inválida")
        }

        if (data > new Date()) {
            throw new Error("A data da poda não pode ser uma data futura")
        }

        if (!talhaoId || talhaoId <= 0) {
            throw new Error("A poda deve estar vinculada a um talhão válido")
        }

        const props: PodaProps = {
            id: 0,
            tipo,
            data,
            talhaoId
        }

        return new Poda(props)
    }

    public static construir(
        id: number,
        tipo: string, // <-- Adicionado
        data: Date,
        talhaoId: number
    ) {
        const props: PodaProps = {
            id,
            tipo,
            data,
            talhaoId
        }

        return new Poda(props)
    }

    public get id() {
        return this.props.id
    }

    public get tipo() {
        return this.props.tipo
    }

    public get data() {
        return this.props.data
    }

    public get talhaoId() {
        return this.props.talhaoId
    }

    public toJSON() {
        return {
            id: this.props.id,
            tipo: this.props.tipo,
            data: this.props.data.toISOString().split('T')[0],
            talhaoId: this.props.talhaoId
        }
    }
}