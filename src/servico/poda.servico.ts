import { PodaDao } from "../dao/poda.dao";
import { TalhaoDao } from "../dao/talhao.dao";
import { Poda } from "../modelo/poda";

export class PodaServico {
    
    public constructor(
        readonly dao: PodaDao,
        readonly talhaoDao: TalhaoDao
    ) { }

    public async cadastrar(dto: any) {
        if (!dto.talhaoId) throw new Error('O campo talhaoId é obrigatório.');

        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId));
        if (!talhao) throw new Error(' Não é possível registrar uma poda para um talhão inexistente');

        const podasDoTalhao = await this.dao.buscarPorTalhao(Number(dto.talhaoId));
        const dataInputString = new Date(dto.data).toISOString().split('T')[0];
      
        const jaExisteIgual = podasDoTalhao.some(
            p => p.data === dataInputString && p.tipo.toLowerCase() === dto.tipo.toLowerCase()
        );
        if (jaExisteIgual) {
            throw new Error(` Já existe uma atividade de poda do tipo "${dto.tipo}" registrada para este talhão nesta data`);
        }

        const poda = Poda.build(dto.tipo, new Date(dto.data), Number(dto.talhaoId));
        await this.dao.salvar(poda);
        return poda;
    }

    public async listar() { return await this.dao.listar(); }
    public async buscarPorTalhao(talhaoId: number) { return await this.dao.buscarPorTalhao(talhaoId); }

    public async buscar(id: string | number) {
        const poda = await this.dao.buscar(Number(id));
        if (!poda) throw new Error('Poda não encontrada');
        return poda;
    }

    public async deletar(id: string | number) {
        const removido = await this.dao.deletar(Number(id));
        if (!removido) throw new Error('Poda não encontrada');
        return true;
    }

    public async atualizar(id: string | number, dto: any) {
        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId));
        if (!talhao) throw new Error(' Talhão não encontrado');

        const poda = Poda.construir(Number(id), dto.tipo, new Date(dto.data), Number(dto.talhaoId));
        return await this.dao.atualizar(poda);
    }
}