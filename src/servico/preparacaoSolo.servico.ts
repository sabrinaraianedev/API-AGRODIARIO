import { PreparacaoSoloDao } from "../dao/preparacaoSolo.dao";
import { TalhaoDao } from "../dao/talhao.dao";
import { PreparacaoSoloDtoCreate } from "../dto/preparacaoSolo.dto";
import { PreparacaoSolo } from "../modelo/preparacaoSolo";

export class PreparacaoSoloServico {
    
    public constructor(
        readonly dao: PreparacaoSoloDao,
        readonly talhaoDao: TalhaoDao
    ) { }

    public async cadastrar(dto: PreparacaoSoloDtoCreate) {
        if (!dto.talhaoId) throw new Error('O campo talhaoId é obrigatório.');

       
        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId));
        if (!talhao) throw new Error('Não é possível registrar uma preparação de solo para um talhão inexistente');

        
        const preparacoesDoTalhao = await this.dao.buscarPorTalhao(Number(dto.talhaoId));
        const dataInputString = new Date(dto.data).toISOString().split('T')[0];
      
        const jaExisteIgual = preparacoesDoTalhao.some(
            p => p.data === dataInputString && p.tipo.toLowerCase() === dto.tipo.toLowerCase()
        );
        if (jaExisteIgual) throw new Error(`Já existe uma atividade de "${dto.tipo}" registrada para este talhão nesta data`);

        const preparacao = PreparacaoSolo.build(dto.tipo, new Date(dto.data), Number(dto.talhaoId));
        await this.dao.salvar(preparacao);
        return preparacao;
    }

    public async listar() { return await this.dao.listar(); }
    public async buscarPorTalhao(talhaoId: number) { return await this.dao.buscarPorTalhao(talhaoId); }

    public async buscar(id: string) {
        const preparacao = await this.dao.buscar(Number(id));
        if (!preparacao) throw new Error('Preparação de solo não encontrada');
        return preparacao;
    }

    public async deletar(id: string) {
        const removido = await this.dao.deletar(Number(id));
        if (!removido) throw new Error('Preparação de solo não encontrada');
        return true;
    }

    public async atualizar(id: string, dto: PreparacaoSoloDtoCreate) {
        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId));
        if (!talhao) throw new Error('Talhão não encontrado');

        const preparacao = PreparacaoSolo.construir(Number(id), dto.tipo, new Date(dto.data), Number(dto.talhaoId));
        return await this.dao.atualizar(preparacao);
    }
}