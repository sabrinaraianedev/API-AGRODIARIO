import { FazendaListarDto } from "../dto/fazenda.dto"
import { Fazenda } from "../modelo/fazenda"
import conexao from "../util/conexao"

export class FazendaDao {

    public async salvar(fazenda: Fazenda): Promise<void> {
        try {
            const { nome, proprietario, localizacao, areaTotal } = fazenda

            const resultado = await conexao.query(
                `INSERT INTO fazenda (nome, proprietario, localizacao, area_total)
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                [nome, proprietario, localizacao, areaTotal]
            )
            
            const idGerado = resultado.rows[0].id
            fazenda.props.id = Number(idGerado)

        } catch (error) {
            console.error('Erro ao salvar fazenda:', error)
            throw error
        }
    }

    public async listar(): Promise<FazendaListarDto[]> {
        try {
            const result = await conexao.query<any>(
                `SELECT id, nome, proprietario, localizacao, area_total as "areaTotal" FROM fazenda`
            )

            return result.rows.map((f: any) => ({
                id: Number(f.id),
                nome: f.nome,
                proprietario: f.proprietario,
                localizacao: f.localizacao,
                areaTotal: Number(f.areaTotal)
            }))

        } catch (error) {
            throw error
        }
    }

    public async buscar(id: number): Promise<Fazenda | null> {
        try {
            const result = await conexao.query<any>(
                `SELECT id, nome, proprietario, localizacao, area_total as "areaTotal" 
                 FROM fazenda WHERE id = $1`,
                [id]
            )

            if (result.rows.length === 0) {
                return null
            }

            const row = result.rows[0]
            return Fazenda.construir(
                Number(row.id),
                row.nome,
                row.proprietario,
                row.localizacao,
                Number(row.areaTotal)
            )
        } catch (error) {
            throw error
        }
    }

    public async deletar(id: number): Promise<boolean> {
        try {
            const result = await conexao.query(
                'DELETE FROM fazenda WHERE id = $1',
                [id]
            )
            return result.rowCount! > 0
        } catch (error) {
            throw error
        }
    }

    public async atualizar(fazenda: Fazenda): Promise<void> {
        try {
            const { id, nome, proprietario, localizacao, areaTotal } = fazenda

            await conexao.query(
                `UPDATE fazenda SET nome = $1, proprietario = $2, localizacao = $3, area_total = $4 WHERE id = $5`,
                [nome, proprietario, localizacao, areaTotal, id]
            )
        } catch (error) {
            throw error
        }
    }
}