import { FazendaListarDto } from "../dto/fazenda.dto"
import { Fazenda, FazendaProps } from "../modelo/fazenda"
import conexao from "../util/conexao"
import { QueryResult } from "pg"

export class FazendaDao {

    public async salvar(fazenda: Fazenda): Promise<void> {

        try {

            const {
                nome,
                proprietario,
                localizacao,
                areaTotal
            } = fazenda

            console.log('Inserindo fazenda:', { nome, proprietario, localizacao, areaTotal })

            const resultado = await conexao.query(
                `INSERT INTO fazenda
                (nome, proprietario, localizacao, area_total)
                VALUES ($1, $2, $3, $4)`,
                [
                    nome,
                    proprietario,
                    localizacao,
                    areaTotal
                ]
            )
            
            console.log('Resultado da inserção:', resultado)

        } catch (error) {
            console.error('Erro ao salvar fazenda:', error)
            throw error
        }
    }

    public async listar(): Promise<FazendaListarDto[]> {

        try {

            const result = await conexao.query<
                FazendaProps
            >('SELECT * FROM fazenda')

            const fazendas: FazendaListarDto[] = result.rows.map((f: FazendaProps) => {

                const {
                    id,
                    nome,
                    proprietario,
                    localizacao,
                    areaTotal
                } = f

                return {
                    id,
                    nome,
                    proprietario,
                    localizacao,
                    areaTotal
                }
            })

            return fazendas

        } catch (error) {
            throw error
        }
    }

    public async buscar(id: number): Promise<Fazenda | null> {
        try {
            const result = await conexao.query<FazendaProps>(
                'SELECT * FROM fazenda WHERE id = $1',
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
                row.areaTotal
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
            const {
                id,
                nome,
                proprietario,
                localizacao,
                areaTotal
            } = fazenda

            await conexao.query(
                `UPDATE fazenda SET nome = $1, proprietario = $2, localizacao = $3, area_total = $4 WHERE id = $5`,
                [
                    nome,
                    proprietario,
                    localizacao,
                    areaTotal,
                    id
                ]
            )
        } catch (error) {
            throw error
        }
    }
}