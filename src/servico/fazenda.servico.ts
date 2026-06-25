import { FazendaDao } from "../dao/fazenda.dao";
import { FazendaDtoCreate } from "../dto/fazenda.dto";
import { Fazenda } from "../modelo/fazenda";

export class FazendaServico {

    public constructor(readonly dao: FazendaDao) { }

    public async cadastrar(dto: FazendaDtoCreate) {
        const fazenda = Fazenda.build(
            dto.nome,
            dto.proprietario,
            dto.localizacao,
            dto.areaTotal
        );

        console.log('Serviço: Cadastrando fazenda com dados:', fazenda);
        await this.dao.salvar(fazenda);
        console.log('Serviço: Fazenda salva com sucesso:', fazenda);

        return fazenda;
    }

    public async listar() {
        return await this.dao.listar();
    }

    public async buscar(id: string) {
        const fazenda = await this.dao.buscar(Number(id));
        if (!fazenda) {
            throw new Error('Fazenda não encontrada');
        }
        return fazenda;
    }

    public async deletar(id: string) {
        const removido = await this.dao.deletar(Number(id));
        if (!removido) {
            throw new Error('Fazenda não encontrada');
        }
        return true;
    }

    public async atualizar(id: string, dto: FazendaDtoCreate) {
        const fazenda = Fazenda.construir(
            Number(id),
            dto.nome,
            dto.proprietario,
            dto.localizacao,
            dto.areaTotal
        );

        return await this.dao.atualizar(fazenda);
    }
}