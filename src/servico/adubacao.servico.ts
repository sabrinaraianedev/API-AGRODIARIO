import { AdubacaoDao } from "../dao/adubacao.dao"
import { AdubacaoDtoCreate } from "../dto/adubacao.dto"
import { Adubacao } from "../modelo/adubacao"

export class AdubacaoServico {

    private dao: AdubacaoDao

    constructor() {
        this.dao = new AdubacaoDao()
    }

    public async cadastrar(dto: AdubacaoDtoCreate) {
        const adubacao = Adubacao.build(
            dto.tipoAdubacao,
            dto.tipoAdubo,
            new Date(dto.data),
            dto.talhaoId
        )

        await this.dao.salvar(adubacao)
        return adubacao
    }

    public async listar() {
        return await this.dao.listar()
    }

    public async buscarPorTalhao(talhaoId: number) {
        return await this.dao.buscarPorTalhao(talhaoId)
    }

    public async buscar(id: string) {
        const adubacao = await this.dao.buscar(Number(id))
        if (!adubacao) throw new Error('Registro de adubação não encontrado')
        return adubacao
    }

    public async deletar(id: string) {
        const removido = await this.dao.deletar(Number(id))
        if (!removido) throw new Error('Registro de adubação não encontrado')
        return true
    }

    public async atualizar(id: string, dto: AdubacaoDtoCreate) {
        const adubacao = Adubacao.construir(
            Number(id),
            dto.tipoAdubacao,
            dto.tipoAdubo,
            new Date(dto.data),
            dto.talhaoId
        )
        return await this.dao.atualizar(adubacao)
    }
}