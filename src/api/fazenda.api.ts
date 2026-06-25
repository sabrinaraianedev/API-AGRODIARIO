import { FazendaControle } from "../controle/fazenda.controle";
import { FazendaDao } from "../dao/fazenda.dao";
import { FazendaServico } from "../servico/fazenda.servico";
import { Api } from "./api"; // Classe centralizada do seu professor

export class FazendaApi {
    readonly fazendaControle: FazendaControle;

    // INJEÇÃO: Recebe o servidor genérico por parâmetro
    private constructor(readonly api: Api) {
        // Monta a estrutura injetando as dependências de trás para frente
        const fazendaDao = new FazendaDao();
        const fazendaServico = new FazendaServico(fazendaDao);
        
        this.fazendaControle = new FazendaControle(fazendaServico);
    }

    public static build(api: Api) {
        const apiFazenda = new FazendaApi(api);
        apiFazenda.addRotas();
    }

    public addRotas() {
        this.api.addRota("/fazenda", "POST", this.fazendaControle.cadastrar.bind(this.fazendaControle));
        this.api.addRota("/fazenda", "GET", this.fazendaControle.listar.bind(this.fazendaControle));
        this.api.addRota("/fazenda/:id", "GET", this.fazendaControle.buscar.bind(this.fazendaControle));
        this.api.addRota("/fazenda/:id", "PUT", this.fazendaControle.atualizar.bind(this.fazendaControle));
        this.api.addRota("/fazenda/:id", "DELETE", this.fazendaControle.deletar.bind(this.fazendaControle));
    }
}