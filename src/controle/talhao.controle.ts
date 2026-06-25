import { Request, Response } from 'express';
import { TalhaoServico } from '../servico/talhao.servico';

export class TalhaoControle {
    
    public constructor(readonly servico: TalhaoServico) { }

    public cadastrar = async (req: Request, res: Response) => {
        try {
            const talhao = await this.servico.cadastrar(req.body);
            return res.status(201).json(talhao);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public listar = async (req: Request, res: Response) => {
        try {
            const result = await this.servico.listar();
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public buscar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const result = await this.servico.buscar(id);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(404).json({ erro: error.message });
        }
    }

    public deletar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.servico.deletar(id);
            return res.status(200).json({ mensagem: 'Talhão deletado com sucesso' });
        } catch (error: any) {
            return res.status(404).json({ erro: error.message });
        }
    }

    public atualizar = async (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.servico.atualizar(id, req.body);
            return res.status(200).json({ mensagem: 'Talhão atualizado com sucesso' });
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}