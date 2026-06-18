import { PreparacaoSoloDao } from "../dao/preparacaoSolo.dao"
import { PreparacaoSoloDtoCreate } from "../dto/preparacaoSolo.dto"
import { PreparacaoSolo } from "../modelo/preparacaoSolo"

export class PreparacaoSoloServico {

    private dao: PreparacaoSoloDao

    constructor() {
        this.dao = new PreparacaoSoloDao()
    }

    public async cadastrar(dto: PreparacaoSoloDtoCreate) {
        const preparacao = PreparacaoSolo.build(
            dto.tipo,
            new Date(dto.data),
            dto.talhaoId
        )

        await this.dao.salvar(preparacao)
        return preparacao
    }

    public async listar() {
        return await this.dao.listar()
    }

    public async buscarPorTalhao(talhaoId: number) {
        return await this.dao.buscarPorTalhao(talhaoId)
    }

    public async buscar(id: string) {
        const preparacao = await this.dao.buscar(Number(id))
        if (!preparacao) throw new Error('Preparação de solo não encontrada')
        return preparacao
    }

    public async deletar(id: string) {
        const removido = await this.dao.deletar(Number(id))
        if (!removido) throw new Error('Preparação de solo não encontrada')
        return true
    }

    public async atualizar(id: string, dto: PreparacaoSoloDtoCreate) {
        const preparacao = PreparacaoSolo.construir(
            Number(id),
            dto.tipo,
            new Date(dto.data),
            dto.talhaoId
        )
        return await this.dao.atualizar(preparacao)
    }
}