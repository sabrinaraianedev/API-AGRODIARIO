import { LimpezaListarDto } from "../dto/limpeza.dto"
import { Limpeza } from "../modelo/limpeza"
import conexao from "../util/conexao"

export class LimpezaDao {

    public async salvar(limpeza: Limpeza): Promise<void> {
        try {
            const { tipo, data, talhaoId } = limpeza

            await conexao.query(
                `INSERT INTO limpeza (tipo, data, talhao_id) VALUES ($1, $2, $3)`,
                [tipo, data, talhaoId]
            )
        } catch (error) {
            console.error('Erro ao salvar limpeza:', error)
            throw error
        }
    }

    public async listar(): Promise<LimpezaListarDto[]> {
        try {
            const result = await conexao.query<any>('SELECT id, tipo, data, talhao_id as "talhaoId" FROM limpeza')

            return result.rows.map((p: any) => ({
                id: p.id,
                tipo: p.tipo,
                data: new Date(p.data).toISOString().split('T')[0],
                talhaoId: p.talhaoId
            }))
        } catch (error) {
            throw error
        }
    }

    public async buscar(id: number): Promise<Limpeza | null> {
        try {
            const result = await conexao.query<any>(
                'SELECT id, tipo, data, talhao_id as "talhaoId" FROM limpeza WHERE id = $1',
                [id]
            )

            if (result.rows.length === 0) return null

            const row = result.rows[0]
            return Limpeza.construir(
                Number(row.id),
                row.tipo,
                new Date(row.data),
                Number(row.talhaoId)
            )
        } catch (error) {
            throw error
        }
    }

    public async buscarPorTalhao(talhaoId: number): Promise<LimpezaListarDto[]> {
        try {
            const result = await conexao.query<any>(
                'SELECT id, tipo, data, talhao_id as "talhaoId" FROM limpeza WHERE talhao_id = $1',
                [talhaoId]
            )

            return result.rows.map((p: any) => ({
                id: p.id,
                tipo: p.tipo,
                data: new Date(p.data).toISOString().split('T')[0],
                talhaoId: p.talhaoId
            }))
        } catch (error) {
            throw error
        }
    }

    public async deletar(id: number): Promise<boolean> {
        try {
            const result = await conexao.query('DELETE FROM limpeza WHERE id = $1', [id])
            return result.rowCount! > 0
        } catch (error) {
            throw error
        }
    }

    public async atualizar(limpeza: Limpeza): Promise<void> {
        try {
            const { id, tipo, data, talhaoId } = limpeza

            await conexao.query(
                `UPDATE limpeza SET tipo = $1, data = $2, talhao_id = $3 WHERE id = $4`,
                [tipo, data, talhaoId, id]
            )
        } catch (error) {
            throw error
        }
    }
}