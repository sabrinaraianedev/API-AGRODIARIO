import { AdubacaoDao } from "../dao/adubacao.dao";
import { TalhaoDao } from "../dao/talhao.dao";
import { AdubacaoDtoCreate } from "../dto/adubacao.dto";
import { Adubacao } from "../modelo/adubacao";

export class AdubacaoServico {
    // INJEÇÃO: Os dois DAOs entram prontos aqui
    public constructor(
        readonly dao: AdubacaoDao,
        readonly talhaoDao: TalhaoDao
    ) { }

    public async cadastrar(dto: AdubacaoDtoCreate) {
        if (!dto.talhaoId) throw new Error('O campo talhaoId é obrigatório.');

        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId));
        if (!talhao) throw new Error('Regra de Negócio: Não é possível registrar uma adubação para um talhão inexistente');

        const adubacoesDoTalhao = await this.dao.buscarPorTalhao(Number(dto.talhaoId));
        const dataInputString = new Date(dto.data).toISOString().split('T')[0];
        
        const jaExisteIgual = adubacoesDoTalhao.some(
            a => a.data === dataInputString && a.tipoAdubo.toLowerCase() === dto.tipoAdubo.toLowerCase()
        );
        if (jaExisteIgual) throw new Error(`Regra de Negócio: O adubo "${dto.tipoAdubo}" já foi aplicado neste talhão na data informada`);

        const adubacao = Adubacao.build(dto.tipoAdubacao, dto.tipoAdubo, new Date(dto.data), Number(dto.talhaoId));
        await this.dao.salvar(adubacao);
        return adubacao;
    }

    public async listar() { return await this.dao.listar(); }
    public async buscarPorTalhao(talhaoId: number) { return await this.dao.buscarPorTalhao(talhaoId); }
    
    public async buscar(id: string) {
        const adubacao = await this.dao.buscar(Number(id));
        if (!adubacao) throw new Error('Registro de adubação não encontrado');
        return adubacao;
    }

    public async deletar(id: string) {
        const removido = await this.dao.deletar(Number(id));
        if (!removido) throw new Error('Registro de adubação não encontrado');
        return true;
    }

    public async atualizar(id: string, dto: AdubacaoDtoCreate) {
        const talhao = await this.talhaoDao.buscar(Number(dto.talhaoId));
        if (!talhao) throw new Error('Regra de Negócio: Talhão não encontrado');

        const adubacao = Adubacao.construir(Number(id), dto.tipoAdubacao, dto.tipoAdubo, new Date(dto.data), Number(dto.talhaoId));
        return await this.dao.atualizar(adubacao);
    }
}