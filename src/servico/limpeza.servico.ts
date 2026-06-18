import { LimpezaDao } from "../dao/limpeza.dao"
import { LimpezaDtoCreate } from "../dto/limpeza.dto"
import { Limpeza } from "../modelo/limpeza"

export class LimpezaServico {

    private dao: LimpezaDao

    constructor() {
        this.dao = new LimpezaDao()
    }

    public async cadastrar(dto: LimpezaDtoCreate) {
        const limpeza = Limpeza.build(
            dto.tipo,
            new Date(dto.data),
            dto.talhaoId
        )

        await this.dao.salvar(limpeza)
        return limpeza
    }

    public async listar() {
        return await this.dao.listar()
    }

    public async buscarPorTalhao(talhaoId: number) {
        return await this.dao.buscarPorTalhao(talhaoId)
    }

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
        const limpeza = Limpeza.construir(
            Number(id),
            dto.tipo,
            new Date(dto.data),
            dto.talhaoId
        )
        return await this.dao.atualizar(limpeza)
    }
}