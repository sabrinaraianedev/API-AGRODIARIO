import { TalhaoDao } from "../dao/talhao.dao"
import { TalhaoDtoCreate } from "../dto/talhao.dto"
import { Talhao } from "../modelo/talhao"

export class TalhaoServico {

    private dao: TalhaoDao

    constructor() {
        this.dao = new TalhaoDao()
    }

    public async cadastrar(dto: TalhaoDtoCreate) {
        // Aciona a factory interna que dispara as validações simples de modelo
        const talhao = Talhao.build(
            dto.area,
            dto.fazendaId
        )

        console.log('Serviço: Cadastrando talhão com dados:', talhao)
        await this.dao.salvar(talhao)
        return talhao
    }

    public async listar() {
        return await this.dao.listar()
    }

    public async buscarPorFazenda(fazendaId: number) {
        return await this.dao.buscarPorFazenda(fazendaId)
    }

    public async buscar(id: string) {
        const talhao = await this.dao.buscar(Number(id))

        if (!talhao) {
            throw new Error('Talhão não encontrado')
        }

        return talhao
    }

    public async deletar(id: string) {
        const removido = await this.dao.deletar(Number(id))

        if (!removido) {
            throw new Error('Talhão não encontrado')
        }

        return true
    }

    public async atualizar(id: string, dto: TalhaoDtoCreate) {
        const talhao = Talhao.construir(
            Number(id),
            dto.area,
            dto.fazendaId
        )

        return await this.dao.atualizar(talhao)
    }
}