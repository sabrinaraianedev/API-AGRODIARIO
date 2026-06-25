import { Request, Response } from 'express';
import { FazendaServico } from '../servico/fazenda.servico';
import { FazendaDtoCreate } from '../dto/fazenda.dto';

export class FazendaControle {
    // INJEÇÃO: Recebe o serviço pronto via construtor
    public constructor(readonly servico: FazendaServico) { }

    public cadastrar = async (req: Request, res: Response) => {
        try {
            const dto: FazendaDtoCreate = req.body;
            const fazenda = await this.servico.cadastrar(dto);
            return res.status(201).json(fazenda);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public listar = async (req: Request, res: Response) => {
        try {
            const fazendas = await this.servico.listar();
            return res.status(200).json(fazendas);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public buscar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const fazenda = await this.servico.buscar(id);
            return res.status(200).json(fazenda);
        } catch (error: any) {
            return res.status(404).json({ erro: error.message });
        }
    }

    public deletar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.servico.deletar(id);
            return res.status(200).json({ mensagem: 'Fazenda deletada' });
        } catch (error: any) {
            return res.status(404).json({ erro: error.message });
        }
    }

    public atualizar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.servico.atualizar(id, req.body);
            return res.status(200).json({ mensagem: 'Fazenda atualizada' });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}