import { PodaDao } from "../dao/poda.dao"
import { PodaDtoCreate } from "../dto/poda.dto"
import { Poda } from "../modelo/poda"

export class PodaServico {

    private dao: PodaDao

    constructor() {
        this.dao = new PodaDao()
    }

    public async cadastrar(dto: PodaDtoCreate) {
        const dataConvertida = new Date(dto.data)

        const poda = Poda.build(
            dto.tipo, // <-- Adicionado
            dataConvertida,
            dto.talhaoId
        )

        console.log('Serviço: Cadastrando poda com dados:', poda)
        await this.dao.salvar(poda)
        return poda
    }

    public async listar() {
        return await this.dao.listar()
    }

    public async buscarPorTalhao(talhaoId: number) {
        return await this.dao.buscarPorTalhao(talhaoId)
    }

    public async buscar(id: string) {
        const poda = await this.dao.buscar(Number(id))

        if (!poda) {
            throw new Error('Poda não encontrada')
        }

        return poda
    }

    public async deletar(id: string) {
        const removido = await this.dao.deletar(Number(id))

        if (!removido) {
            throw new Error('Poda não encontrada')
        }

        return true
    }

    public async atualizar(id: string, dto: PodaDtoCreate) {
        const poda = Poda.construir(
            Number(id),
            dto.tipo, // <-- Adicionado
            new Date(dto.data),
            dto.talhaoId
        )

        return await this.dao.atualizar(poda)
    }
}