import { TalhaoListarDto } from "../dto/talhao.dto"
import { Talhao, TalhaoProps } from "../modelo/talhao"
import conexao from "../util/conexao"

export class TalhaoDao {

    public async salvar(talhao: Talhao): Promise<void> {
        try {
            const { area, fazendaId } = talhao

            console.log('Inserindo talhão:', { area, fazendaId })

            await conexao.query(
                `INSERT INTO talhao
                (area, fazenda_id)
                VALUES ($1, $2)`,
                [area, fazendaId]
            )
        } catch (error) {
            console.error('Erro ao salvar talhão:', error)
            throw error
        }
    }

    public async listar(): Promise<TalhaoListarDto[]> {
        try {
            // Mapeando a coluna snake_case do banco para o camelCase esperado
            const result = await conexao.query<any>('SELECT id, area, fazenda_id as "fazendaId" FROM talhao')

            const talhoes: TalhaoListarDto[] = result.rows.map((t: any) => {
                return {
                    id: t.id,
                    area: Number(t.area),
                    fazendaId: t.fazendaId
                }
            })

            return talhoes
        } catch (error) {
            throw error
        }
    }

    public async buscar(id: number): Promise<Talhao | null> {
        try {
            const result = await conexao.query<any>(
                'SELECT id, area, fazenda_id as "fazendaId" WHERE id = $1',
                [id]
            )

            if (result.rows.length === 0) {
                return null
            }

            const row = result.rows[0]
            return Talhao.construir(
                Number(row.id),
                Number(row.area),
                Number(row.fazendaId)
            )
        } catch (error) {
            throw error
        }
    }

    public async buscarPorFazenda(fazendaId: number): Promise<TalhaoListarDto[]> {
        try {
            const result = await conexao.query<any>(
                'SELECT id, area, fazenda_id as "fazendaId" FROM talhao WHERE fazenda_id = $1',
                [fazendaId]
            )

            return result.rows.map((t: any) => ({
                id: t.id,
                area: Number(t.area),
                fazendaId: t.fazendaId
            }))
        } catch (error) {
            throw error
        }
    }

    public async deletar(id: number): Promise<boolean> {
        try {
            const result = await conexao.query(
                'DELETE FROM talhao WHERE id = $1',
                [id]
            )
            return result.rowCount! > 0
        } catch (error) {
            throw error
        }
    }

    public async atualizar(talhao: Talhao): Promise<void> {
        try {
            const { id, area, fazendaId } = talhao

            await conexao.query(
                `UPDATE talhao SET area = $1, fazenda_id = $2 WHERE id = $3`,
                [area, fazendaId, id]
            )
        } catch (error) {
            throw error
        }
    }
}