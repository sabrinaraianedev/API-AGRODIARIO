import { Request, Response } from 'express'
import { PodaServico } from '../servico/poda.servico'
import { TalhaoDao } from '../dao/talhao.dao'

export class PodaControle {

    private servico: PodaServico
    private talhaoDao: TalhaoDao

    constructor() {
        this.servico = new PodaServico()
        this.talhaoDao = new TalhaoDao()
    }

    public cadastrar = async (req: Request, res: Response) => {
        try {
            const { tipo, data, talhaoId } = req.body // <-- Adicionado tipo

            if (!talhaoId) {
                throw new Error('O campo talhaoId não foi enviado no corpo da requisição.')
            }

            const dto = { tipo, data, talhaoId: Number(talhaoId) }

            // REGRA COMPLEXA: Verifica se o talhão existe
            const talhao = await this.talhaoDao.buscar(dto.talhaoId)
            if (!talhao) {
                throw new Error('Regra de Negócio: Não é possível registrar uma poda para um talhão inexistente')
            }

            // REGRA COMPLEXA: Evita podas do mesmo tipo no mesmo talhão na mesma data
            const podasDoTalhao = await this.servico.buscarPorTalhao(dto.talhaoId)
            const dataInputString = new Date(dto.data).toISOString().split('T')[0]
            
            const jaExistePodaIgual = podasDoTalhao.some(p => p.data === dataInputString && p.tipo.toLowerCase() === dto.tipo.toLowerCase())
            if (jaExistePodaIgual) {
                throw new Error(`Regra de Negócio: Já existe uma poda do tipo "${dto.tipo}" registrada para este talhão nesta mesma data`)
            }

            const poda = await this.servico.cadastrar(dto)
            return res.status(201).json(poda)

        } catch (error: any) {
            return res.status(400).json({
                erro: error.message
            })
        }
    }

    public listar = async (req: Request, res: Response) => {
        try {
            const podas = await this.servico.listar()
            return res.status(200).json(podas)
        } catch (error: any) {
            return res.status(400).json({
                erro: error.message
            })
        }
    }

    public buscar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            const poda = await this.servico.buscar(id)
            return res.status(200).json(poda)
        } catch (error: any) {
            return res.status(404).json({
                erro: error.message
            })
        }
    }

    public deletar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            await this.servico.deletar(id)
            return res.status(200).json({
                mensagem: 'Poda deletada'
            })
        } catch (error: any) {
            return res.status(404).json({
                erro: error.message
            })
        }
    }

    public atualizar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            
            const talhaoId = Number(req.body.talhaoId)
            const talhao = await this.talhaoDao.buscar(talhaoId)
            if (!talhao) {
                throw new Error('Regra de Negócio: Talhão não encontrado')
            }

            await this.servico.atualizar(id, req.body)
            return res.status(200).json({
                mensagem: 'Poda updated com sucesso'
            })
        } catch (error: any) {
            return res.status(400).json({
                erro: error.message
            })
        }
    }
}