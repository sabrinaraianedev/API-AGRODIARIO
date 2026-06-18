import { Request, Response } from 'express'
import { AdubacaoServico } from '../servico/adubacao.servico'
import { TalhaoDao } from '../dao/talhao.dao'

export class AdubacaoControle {

    private servico: AdubacaoServico
    private talhaoDao: TalhaoDao

    constructor() {
        this.servico = new AdubacaoServico()
        this.talhaoDao = new TalhaoDao()
    }

    public cadastrar = async (req: Request, res: Response) => {
        try {
            const { tipoAdubacao, tipoAdubo, data, talhaoId } = req.body

            if (!talhaoId) {
                throw new Error('O campo talhaoId não foi enviado no corpo da requisição.')
            }

            const dto = { tipoAdubacao, tipoAdubo, data, talhaoId: Number(talhaoId) }

            // Regra Complexa 1: Valida existência do Talhão
            const talhao = await this.talhaoDao.buscar(dto.talhaoId)
            if (!talhao) {
                throw new Error('Regra de Negócio: Não é possível registrar uma adubação para um talhão inexistente')
            }

            // Regra Complexa 2: Evita aplicar o mesmo adubo, no mesmo talhão, no mesmo dia
            const adubacoesDoTalhao = await this.servico.buscarPorTalhao(dto.talhaoId)
            const dataInputString = new Date(dto.data).toISOString().split('T')[0]
            
            const jaExisteIgual = adubacoesDoTalhao.some(
                a => a.data === dataInputString && 
                     a.tipoAdubo.toLowerCase() === dto.tipoAdubo.toLowerCase()
            )
            if (jaExisteIgual) {
                throw new Error(`Regra de Negócio: O adubo "${dto.tipoAdubo}" já foi aplicado neste talhão na data informada`)
            }

            const adubacao = await this.servico.cadastrar(dto)
            return res.status(201).json(adubacao)

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
            return res.status(200).json({ mensagem: 'Registro de adubação deletado com sucesso' })
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
            return res.status(200).json({ mensagem: 'Registro de adubação atualizado com sucesso' })
        } catch (error: any) {
            return res.status(400).json({ erro: error.message })
        }
    }
}