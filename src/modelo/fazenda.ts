export type FazendaProps = {
    id: number
    nome: string
    proprietario: string
    localizacao: string
    areaTotal: number
}

export class Fazenda {

    private constructor(readonly props: FazendaProps) {}

    public static build(
        nome: string,
        proprietario: string,
        localizacao: string,
        areaTotal: number
    ) {

        if (!nome.trim()) {
            throw new Error("Nome da fazenda não pode ser vazio")
        }

        const props: FazendaProps = {
            id: 0,
            nome,
            proprietario,
            localizacao,
            areaTotal
        }

        return new Fazenda(props)
    }

    public static construir(
        id: number,
        nome: string,
        proprietario: string,
        localizacao: string,
        areaTotal: number
    ) {

        const props: FazendaProps = {
            id,
            nome,
            proprietario,
            localizacao,
            areaTotal
        }

        return new Fazenda(props)
    }

    public get id() {
        return this.props.id
    }

    public get nome() {
        return this.props.nome
    }

    public get proprietario() {
        return this.props.proprietario
    }

    public get localizacao() {
        return this.props.localizacao
    }

    public get areaTotal() {
        return this.props.areaTotal
    }

    public toJSON() {
        return {
            id: this.props.id,
            nome: this.props.nome,
            proprietario: this.props.proprietario,
            localizacao: this.props.localizacao,
            areaTotal: this.props.areaTotal
        }
    }
}