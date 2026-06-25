import { AdubacaoListarDto } from "../dto/adubacao.dto"
import { Adubacao } from "../modelo/adubacao"
import conexao from "../util/conexao"

export class AdubacaoDao {

    public async salvar(adubacao: Adubacao): Promise<void> {
        try {
            const { tipoAdubacao, tipoAdubo, data, talhaoId } = adubacao

            await conexao.query(
                `INSERT INTO adubacao (tipo_adubacao, tipo_adubo, data, talhao_id) 
                 VALUES ($1, $2, $3, $4)`,
                [tipoAdubacao, tipoAdubo, data, talhaoId]
            )
        } catch (error) {
            console.error('Erro ao salvar adubação:', error)
            throw error
        }
    }

    public async listar(): Promise<AdubacaoListarDto[]> {
        try {
            const result = await conexao.query<any>(
                `SELECT id, tipo_adubacao as "tipoAdubacao", tipo_adubo as "tipoAdubo", data, talhao_id as "talhaoId" 
                 FROM adubacao`
            )

            return result.rows.map((a: any) => ({
                id: a.id,
                tipoAdubacao: a.tipoAdubacao,
                tipoAdubo: a.tipoAdubo,
                data: new Date(a.data).toISOString().split('T')[0],
                talhaoId: a.talhaoId
            }))
        } catch (error) {
            throw error
        }
    }

    public async buscar(id: number): Promise<Adubacao | null> {
        try {
            const result = await conexao.query<any>(
                `SELECT id, tipo_adubacao as "tipoAdubacao", tipo_adubo as "tipoAdubo", data, talhao_id as "talhaoId" 
                 FROM adubacao WHERE id = $1`,
                [id]
            )

            if (result.rows.length === 0) return null

            const row = result.rows[0]
            return Adubacao.construir(
                Number(row.id),
                row.tipoAdubacao,
                row.tipoAdubo,
                new Date(row.data),
                Number(row.talhaoId)
            )
        } catch (error) {
            throw error
        }
    }

    public async buscarPorTalhao(talhaoId: number): Promise<AdubacaoListarDto[]> {
        try {
            const result = await conexao.query<any>(
                `SELECT id, tipo_adubacao as "tipoAdubacao", tipo_adubo as "tipoAdubo", data, talhao_id as "talhaoId" 
                 FROM adubacao WHERE talhao_id = $1`,
                [talhaoId]
            )

            return result.rows.map((a: any) => ({
                id: a.id,
                tipoAdubacao: a.tipoAdubacao,
                tipoAdubo: a.tipoAdubo,
                data: new Date(a.data).toISOString().split('T')[0],
                talhaoId: a.talhaoId
            }))
        } catch (error) {
            throw error
        }
    }

    public async deletar(id: number): Promise<boolean> {
        try {
            const result = await conexao.query('DELETE FROM adubacao WHERE id = $1', [id])
            return result.rowCount! > 0
        } catch (error) {
            throw error
        }
    }

    public async atualizar(adubacao: Adubacao): Promise<void> {
        try {
            const { id, tipoAdubacao, tipoAdubo, data, talhaoId } = adubacao

            await conexao.query(
                `UPDATE adubacao SET tipo_adubacao = $1, tipo_adubo = $2, data = $3, talhao_id = $4 WHERE id = $5`,
                [tipoAdubacao, tipoAdubo, data, talhaoId, id]
            )
        } catch (error) {
            throw error
        }
    }
}