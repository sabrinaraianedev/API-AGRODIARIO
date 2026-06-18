export type AdubacaoProps = {
    id: number
    tipoAdubacao: string
    tipoAdubo: string
    data: Date
    talhaoId: number
}

export class Adubacao {

    private constructor(readonly props: AdubacaoProps) {}

    public static build(
        tipoAdubacao: string,
        tipoAdubo: string,
        data: Date,
        talhaoId: number
    ) {
        if (!tipoAdubacao || !tipoAdubacao.trim()) {
            throw new Error("O tipo de adubação não pode ser vazio")
        }

        if (!tipoAdubo || !tipoAdubo.trim()) {
            throw new Error("O tipo de adubo não pode ser vazio")
        }

        if (!data || isNaN(data.getTime())) {
            throw new Error("A data informada é inválida")
        }

        if (data > new Date()) {
            throw new Error("A data da adubação não pode ser uma data futura")
        }

        if (!talhaoId || talhaoId <= 0) {
            throw new Error("A adubação deve estar vinculada a um talhão válido")
        }

        const props: AdubacaoProps = {
            id: 0,
            tipoAdubacao,
            tipoAdubo,
            data,
            talhaoId
        }

        return new Adubacao(props)
    }

    public static construir(
        id: number,
        tipoAdubacao: string,
        tipoAdubo: string,
        data: Date,
        talhaoId: number
    ) {
        const props: AdubacaoProps = {
            id,
            tipoAdubacao,
            tipoAdubo,
            data,
            talhaoId
        }

        return new Adubacao(props)
    }

    public get id() { return this.props.id }
    public get tipoAdubacao() { return this.props.tipoAdubacao }
    public get tipoAdubo() { return this.props.tipoAdubo }
    public get data() { return this.props.data }
    public get talhaoId() { return this.props.talhaoId }

    public toJSON() {
        return {
            id: this.props.id,
            tipoAdubacao: this.props.tipoAdubacao,
            tipoAdubo: this.props.tipoAdubo,
            data: this.props.data.toISOString().split('T')[0],
            talhaoId: this.props.talhaoId
        }
    }
}