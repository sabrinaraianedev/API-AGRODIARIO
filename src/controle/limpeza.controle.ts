import { Request, Response } from 'express'
import { LimpezaServico } from '../servico/limpeza.servico'
import { TalhaoDao } from '../dao/talhao.dao'

export class LimpezaControle {

    private servico: LimpezaServico
    private talhaoDao: TalhaoDao

    constructor() {
        this.servico = new LimpezaServico()
        this.talhaoDao = new TalhaoDao()
    }

    public cadastrar = async (req: Request, res: Response) => {
        try {
            const { tipo, data, talhaoId } = req.body

            if (!talhaoId) {
                throw new Error('O campo talhaoId não foi enviado no corpo da requisição.')
            }

            const dto = { tipo, data, talhaoId: Number(talhaoId) }

            // Regra Complexa 1: Valida se o talhão existe no banco
            const talhao = await this.talhaoDao.buscar(dto.talhaoId)
            if (!talhao) {
                throw new Error('Regra de Negócio: Não é possível registrar uma limpeza para um talhão inexistente')
            }

            // Regra Complexa 2: Evita duplicidade do mesmo tipo de limpeza no mesmo dia e talhão
            const limpezasDoTalhao = await this.servico.buscarPorTalhao(dto.talhaoId)
            const dataInputString = new Date(dto.data).toISOString().split('T')[0]
            
            const jaExisteIgual = limpezasDoTalhao.some(
                l => l.data === dataInputString && l.tipo.toLowerCase() === dto.tipo.toLowerCase()
            )
            if (jaExisteIgual) {
                throw new Error(`Regra de Negócio: Já existe uma atividade de limpeza do tipo "${dto.tipo}" agendada/registrada para este talhão nesta data`)
            }

            const limpeza = await this.servico.cadastrar(dto)
            return res.status(201).json(limpeza)

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
            return res.status(200).json({ mensagem: 'Registro de limpeza deletado com sucesso' })
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
            return res.status(200).json({ mensagem: 'Registro de limpeza atualizado com sucesso' })
        } catch (error: any) {
            return res.status(400).json({ erro: error.message })
        }
    }
}