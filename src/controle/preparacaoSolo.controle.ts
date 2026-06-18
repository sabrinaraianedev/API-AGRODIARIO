import { Request, Response } from 'express'
import { PreparacaoSoloServico } from '../servico/preparacaoSolo.servico'
import { TalhaoDao } from '../dao/talhao.dao'

export class PreparacaoSoloControle {

    private servico: PreparacaoSoloServico
    private talhaoDao: TalhaoDao

    constructor() {
        this.servico = new PreparacaoSoloServico()
        this.talhaoDao = new TalhaoDao()
    }

    public cadastrar = async (req: Request, res: Response) => {
        try {
            const { tipo, data, talhaoId } = req.body

            if (!talhaoId) {
                throw new Error('O campo talhaoId não foi enviado no corpo da requisição.')
            }

            const dto = { tipo, data, talhaoId: Number(talhaoId) }

            // Regra Complexa 1: Verifica se o talhão realmente existe antes de associar
            const talhao = await this.talhaoDao.buscar(dto.talhaoId)
            if (!talhao) {
                throw new Error('Regra de Negócio: Não é possível registrar uma preparação de solo para um talhão inexistente')
            }

            // Regra Complexa 2: Evita duplicidade do mesmo tipo no mesmo talhão na mesma data
            const preparacoesDoTalhao = await this.servico.buscarPorTalhao(dto.talhaoId)
            const dataInputString = new Date(dto.data).toISOString().split('T')[0]
            
            const jaExisteIgual = preparacoesDoTalhao.some(
                p => p.data === dataInputString && p.tipo.toLowerCase() === dto.tipo.toLowerCase()
            )
            if (jaExisteIgual) {
                throw new Error(`Regra de Negócio: Já existe uma atividade de "${dto.tipo}" registrada para este talhão nesta data`)
            }

            const preparacao = await this.servico.cadastrar(dto)
            return res.status(201).json(preparacao)

        } catch (error: any) {
            return res.status(400).json({ erro: error.message })
        }
    }

    public listar = async (req: Request, res: Response) => {
        try {
            const result = await this.servico.listar()
            return res.status(200).json(result)
        } catch (error: any) {
            return res.status(400).json({ erro: error.message })
        }
    }

    public buscar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            const result = await this.servico.buscar(id)
            return res.status(200).json(result)
        } catch (error: any) {
            return res.status(404).json({ erro: error.message })
        }
    }

    public deletar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            await this.servico.deletar(id)
            return res.status(200).json({ mensagem: 'Preparação de solo deletada com sucesso' })
        } catch (error: any) {
            return res.status(404).json({ erro: error.message })
        }
    }

    public atualizar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            const talhaoId = Number(req.body.talhaoId)

            const talhao = await this.talhaoDao.buscar(talhaoId)
            if (!talhao) throw new Error('Regra de Negócio: Talhão não encontrado')

            await this.servico.atualizar(id, req.body)
            return res.status(200).json({ mensagem: 'Preparação de solo atualizada com sucesso' })
        } catch (error: any) {
            return res.status(400).json({ erro: error.message })
        }
    }
}