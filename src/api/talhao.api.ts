import { TalhaoControle } from "../controle/talhao.controle";
import { TalhaoDao } from "../dao/talhao.dao";
import { FazendaDao } from "../dao/fazenda.dao";
import { TalhaoServico } from "../servico/talhao.servico";
import { Api } from "./api"; // Classe centralizada do seu professor

export class TalhaoApi {
    readonly talhaoControle: TalhaoControle;

    // INJEÇÃO: Instancia os DAOs e repassa de trás para frente na cadeia de dependências
    private constructor(readonly api: Api) {
        const talhaoDao = new TalhaoDao();
        const fazendaDao = new FazendaDao();
        const talhaoServico = new TalhaoServico(talhaoDao, fazendaDao);
        
        this.talhaoControle = new TalhaoControle(talhaoServico);
    }

    public static build(api: Api) {
        const apiTalhao = new TalhaoApi(api);
        apiTalhao.addRotas();
    }

    public addRotas() {
        this.api.addRota("/talhao", "POST", this.talhaoControle.cadastrar.bind(this.talhaoControle));
        this.api.addRota("/talhao", "GET", this.talhaoControle.listar.bind(this.talhaoControle));
        this.api.addRota("/talhao/:id", "GET", this.talhaoControle.buscar.bind(this.talhaoControle));
        this.api.addRota("/talhao/:id", "PUT", this.talhaoControle.atualizar.bind(this.talhaoControle));
        this.api.addRota("/talhao/:id", "DELETE", this.talhaoControle.deletar.bind(this.talhaoControle));
    }
}