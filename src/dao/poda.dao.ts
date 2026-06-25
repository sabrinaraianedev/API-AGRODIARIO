import { PodaListarDto } from "../dto/poda.dto"
import { Poda } from "../modelo/poda"
import conexao from "../util/conexao"

export class PodaDao {

    public async salvar(poda: Poda): Promise<void> {
        try {
            const { tipo, data, talhaoId } = poda

            console.log('Inserindo poda:', { tipo, data, talhaoId })

            await conexao.query(
                `INSERT INTO poda
                (tipo, data, talhao_id)
                VALUES ($1, $2, $3)`,
                [tipo, data, talhaoId]
            )
        } catch (error) {
            console.error('Erro ao salvar poda:', error)
            throw error
        }
    }

    public async listar(): Promise<PodaListarDto[]> {
        try {
            const result = await conexao.query<any>('SELECT id, tipo, data, talhao_id as "talhaoId" FROM poda')

            return result.rows.map((p: any) => {
                return {
                    id: p.id,
                    tipo: p.tipo,
                    data: new Date(p.data).toISOString().split('T')[0],
                    talhaoId: p.talhaoId
                }
            })
        } catch (error) {
            throw error
        }
    }

    public async buscar(id: number): Promise<Poda | null> {
        try {
            // query com o FROM poda certinho
            const result = await conexao.query<any>(
                'SELECT id, tipo, data, talhao_id as "talhaoId" FROM poda WHERE id = $1',
                [id]
            )

            if (result.rows.length === 0) {
                return null
            }

            const row = result.rows[0]
            return Poda.construir(
                Number(row.id),
                row.tipo,
                new Date(row.data),
                Number(row.talhaoId)
            )
        } catch (error) {
            throw error
        }
    }

    public async buscarPorTalhao(talhaoId: number): Promise<PodaListarDto[]> {
        try {
            const result = await conexao.query<any>(
                'SELECT id, tipo, data, talhao_id as "talhaoId" FROM poda WHERE talhao_id = $1',
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
            const result = await conexao.query(
                'DELETE FROM poda WHERE id = $1',
                [id]
            )
            return result.rowCount! > 0
        } catch (error) {
            throw error
        }
    }

    public async atualizar(poda: Poda): Promise<void> {
        try {
            const { id, tipo, data, talhaoId } = poda

            await conexao.query(
                `UPDATE poda SET tipo = $1, data = $2, talhao_id = $3 WHERE id = $4`,
                [tipo, data, talhaoId, id]
            )
        } catch (error) {
            throw error
        }
    }
}