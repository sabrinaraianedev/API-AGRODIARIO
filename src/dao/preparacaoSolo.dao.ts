import { PreparacaoSoloListarDto } from "../dto/preparacaoSolo.dto"
import { PreparacaoSolo } from "../modelo/preparacaoSolo"
import conexao from "../util/conexao"

export class PreparacaoSoloDao {

    public async salvar(preparacao: PreparacaoSolo): Promise<void> {
        try {
            const { tipo, data, talhaoId } = preparacao

            await conexao.query(
                `INSERT INTO preparacao_solo (tipo, data, talhao_id) VALUES ($1, $2, $3)`,
                [tipo, data, talhaoId]
            )
        } catch (error) {
            console.error('Erro ao salvar preparação do solo:', error)
            throw error
        }
    }

    public async listar(): Promise<PreparacaoSoloListarDto[]> {
        try {
            const result = await conexao.query<any>('SELECT id, tipo, data, talhao_id as "talhaoId" FROM preparacao_solo')

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

    public async buscar(id: number): Promise<PreparacaoSolo | null> {
        try {
            const result = await conexao.query<any>(
                'SELECT id, tipo, data, talhao_id as "talhaoId" FROM preparacao_solo WHERE id = $1',
                [id]
            )

            if (result.rows.length === 0) return null

            const row = result.rows[0]
            return PreparacaoSolo.construir(
                Number(row.id),
                row.tipo,
                new Date(row.data),
                Number(row.talhaoId)
            )
        } catch (error) {
            throw error
        }
    }

    public async buscarPorTalhao(talhaoId: number): Promise<PreparacaoSoloListarDto[]> {
        try {
            const result = await conexao.query<any>(
                'SELECT id, tipo, data, talhao_id as "talhaoId" FROM preparacao_solo WHERE talhao_id = $1',
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
            const result = await conexao.query('DELETE FROM preparacao_solo WHERE id = $1', [id])
            return result.rowCount! > 0
        } catch (error) {
            throw error
        }
    }

    public async atualizar(preparacao: PreparacaoSolo): Promise<void> {
        try {
            const { id, tipo, data, talhaoId } = preparacao

            await conexao.query(
                `UPDATE preparacao_solo SET tipo = $1, data = $2, talhao_id = $3 WHERE id = $4`,
                [tipo, data, talhaoId, id]
            )
        } catch (error) {
            throw error
        }
    }
}