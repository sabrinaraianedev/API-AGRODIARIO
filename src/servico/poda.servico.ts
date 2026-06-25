import { PodaDao } from "../dao/poda.dao"
import { TalhaoDao } from "../dao/talhao.dao"
import { Poda } from "../modelo/poda"

export class PodaServico {
    private dao: PodaDao
    private talhaoDao: TalhaoDao

    constructor() {
        this.dao = new PodaDao()
        this.talhaoDao = new TalhaoDao()
    }

    public async cadastrar(dto: any) {
        if (!dto.talhaoId) throw new Error('O campo talhaoId é obrigatório.')

        // REGRA 1: Valida se o talhão existe
        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId))
        if (!talhao) throw new Error('Regra de Negócio: Não é possível registrar uma poda para um talhão inexistente')

        // REGRA 2: Evita duplicidade do mesmo tipo de poda na mesma data e talhão
        const podasDoTalhao = await this.dao.buscarPorTalhao(Number(dto.talhaoId))
        const dataInputString = new Date(dto.data).toISOString().split('T')[0]
        
        const jaExisteIgual = podasDoTalhao.some(
            p => p.data === dataInputString && p.tipo.toLowerCase() === dto.tipo.toLowerCase()
        )
        if (jaExisteIgual) {
            throw new Error(`Regra de Negócio: Já existe uma atividade de poda do tipo "${dto.tipo}" registrada para este talhão nesta data`)
        }

        const poda = Poda.build(dto.tipo, new Date(dto.data), Number(dto.talhaoId))
        await this.dao.salvar(poda)
        return poda
    }

    public async listar() { return await this.dao.listar() }
    public async buscarPorTalhao(talhaoId: number) { return await this.dao.buscarPorTalhao(talhaoId) }

    public async buscar(id: string | number) {
        const poda = await this.dao.buscar(Number(id))
        if (!poda) throw new Error('Poda não encontrada')
        return poda
    }

    public async deletar(id: string | number) {
        const removido = await this.dao.deletar(Number(id))
        if (!removido) throw new Error('Poda não encontrada')
        return true
    }

    public async atualizar(id: string | number, dto: any) {
        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId))
        if (!talhao) throw new Error('Regra de Negócio: Talhão não encontrado')

        const poda = Poda.construir(Number(id), dto.tipo, new Date(dto.data), Number(dto.talhaoId))
        return await this.dao.atualizar(poda)
    }
}