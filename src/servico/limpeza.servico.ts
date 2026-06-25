import { LimpezaDao } from "../dao/limpeza.dao"
import { TalhaoDao } from "../dao/talhao.dao"
import { LimpezaDtoCreate } from "../dto/limpeza.dto"
import { Limpeza } from "../modelo/limpeza"

export class LimpezaServico {
    private dao: LimpezaDao
    private talhaoDao: TalhaoDao

    constructor() {
        this.dao = new LimpezaDao()
        this.talhaoDao = new TalhaoDao()
    }

    public async cadastrar(dto: LimpezaDtoCreate) {
        if (!dto.talhaoId) throw new Error('O campo talhaoId é obrigatório.')

        // REGRA 1: Valida se o talhão existe
        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId))
        if (!talhao) throw new Error('Regra de Negócio: Não é possível registrar uma limpeza para um talhão inexistente')

        // REGRA 2: Evita duplicidade
        const limpezasDoTalhao = await this.dao.buscarPorTalhao(Number(dto.talhaoId))
        const dataInputString = new Date(dto.data).toISOString().split('T')[0]
        
        const jaExisteIgual = limpezasDoTalhao.some(
            l => l.data === dataInputString && l.tipo.toLowerCase() === dto.tipo.toLowerCase()
        )
        if (jaExisteIgual) throw new Error(`Regra de Negócio: Já existe uma atividade de limpeza do tipo "${dto.tipo}" registrada para este talhão nesta data`)

        const limpeza = Limpeza.build(dto.tipo, new Date(dto.data), Number(dto.talhaoId))
        await this.dao.salvar(limpeza)
        return limpeza
    }

    public async listar() { return await this.dao.listar() }
    public async buscarPorTalhao(talhaoId: number) { return await this.dao.buscarPorTalhao(talhaoId) }

    public async buscar(id: string) {
        const limpeza = await this.dao.buscar(Number(id))
        if (!limpeza) throw new Error('Registro de limpeza não encontrado')
        return limpeza
    }

    public async deletar(id: string) {
        const removido = await this.dao.deletar(Number(id))
        if (!removido) throw new Error('Registro de limpeza não encontrado')
        return true
    }

    public async atualizar(id: string, dto: LimpezaDtoCreate) {
        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId))
        if (!talhao) throw new Error('Regra de Negócio: Talhão não encontrado')

        const limpeza = Limpeza.construir(Number(id), dto.tipo, new Date(dto.data), Number(dto.talhaoId))
        return await this.dao.atualizar(limpeza)
    }
}