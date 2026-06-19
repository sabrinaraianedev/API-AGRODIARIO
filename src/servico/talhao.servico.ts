import { TalhaoDao } from "../dao/talhao.dao"
import { FazendaDao } from "../dao/fazenda.dao" // Supondo que você tenha o FazendaDao
import { Talhao } from "../modelo/talhao"

export class TalhaoServico {
    private dao: TalhaoDao
    private fazendaDao: FazendaDao

    constructor() {
        this.dao = new TalhaoDao()
        this.fazendaDao = new FazendaDao()
    }

    public async cadastrar(dto: any) {
        if (!dto.fazendaId) throw new Error('O campo fazendaId é obrigatório.')

        // REGRA 1: Verifica se a fazenda vinculada realmente existe
        const fazenda = await this.fazendaDao.buscar(Number(dto.fazendaId))
        if (!fazenda) {
            throw new Error('Regra de Negócio: Não é possível registrar um talhão para uma fazenda inexistente')
        }

        const talhao = Talhao.build(Number(dto.area), Number(dto.fazendaId))
        await this.dao.salvar(talhao)
        return talhao
    }

    public async listar() { return await this.dao.listar() }

    public async buscar(id: string | number) {
        const talhao = await this.dao.buscar(Number(id))
        if (!talhao) throw new Error('Talhão não encontrado')
        return talhao
    }

    public async deletar(id: string | number) {
        const removido = await this.dao.deletar(Number(id))
        if (!removido) throw new Error('Talhão não encontrado')
        return true
    }

    public async atualizar(id: string | number, dto: any) {
        const fazenda = await this.fazendaDao.buscar(Number(dto.fazendaId))
        if (!fazenda) throw new Error('Regra de Negócio: Fazenda não encontrada')

        const talhao = Talhao.construir(Number(id), Number(dto.area), Number(dto.fazendaId))
        return await this.dao.atualizar(talhao)
    }
}