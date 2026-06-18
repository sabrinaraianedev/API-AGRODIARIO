import { Request, Response } from 'express'
import { TalhaoServico } from '../servico/talhao.servico'
import { FazendaDao } from '../dao/fazenda.dao' // Importada para validação inter-entidades

export class TalhaoControle {

    private servico: TalhaoServico
    private fazendaDao: FazendaDao // Necessário para a regra de negócio complexa

    constructor() {
        this.servico = new TalhaoServico()
        this.fazendaDao = new FazendaDao()
    }

    public cadastrar = async (req: Request, res: Response) => {
        try {
        // Força a desestruturação direto do req.body
        const { area, fazendaId } = req.body

        // Validação rápida de segurança se o body veio vazio
        if (!fazendaId) {
            throw new Error('O campo fazendaId não foi enviado no corpo da requisição.')
        }

        const dto = { area: Number(area), fazendaId: Number(fazendaId) }

        // REGRA DE NEGÓCIO COMPLEXA: Validação que envolve outra entidade (Fazenda)
        const fazenda = await this.fazendaDao.buscar(dto.fazendaId)
        
        if (!fazenda) {
            throw new Error('Regra de Negócio: Não é possível criar um talhão para uma fazenda inexistente')
        }

        // OUTRA REGRA COMPLEXA: A área somada não pode ultrapassar a da fazenda
        const talhoesExistentes = await this.servico.buscarPorFazenda(dto.fazendaId)
        const areaTotalTalhoes = talhoesExistentes.reduce((acc, t) => acc + t.area, 0)

        if (areaTotalTalhoes + dto.area > fazenda.areaTotal) {
            throw new Error('Regra de Negócio: A área somada dos talhões excede a área total da fazenda')
        }

        const talhao = await this.servico.cadastrar(dto)
        return res.status(201).json(talhao)

    } catch (error: any) {
        return res.status(400).json({
            erro: error.message
        })
    }
}

    public listar = async (req: Request, res: Response) => {
        try {
            const talhoes = await this.servico.listar()
            return res.status(200).json(talhoes)
        } catch (error: any) {
            return res.status(400).json({
                erro: error.message
            })
        }
    }

    public buscar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            const talhao = await this.servico.buscar(id)
            return res.status(200).json(talhao)
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
                mensagem: 'Talhão deletado'
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
            
            // Regra Complexa replicada na alteração se necessário
            const fazendaId = Number(req.body.fazendaId)
            const fazenda = await this.fazendaDao.buscar(fazendaId)
            if (!fazenda) {
                throw new Error('Regra de Negócio: Fazenda não encontrada')
            }

            await this.servico.atualizar(id, req.body)
            return res.status(200).json({
                mensagem: 'Talhão atualizado'
            })
        } catch (error: any) {
            return res.status(400).json({
                erro: error.message
            })
        }
    }
}