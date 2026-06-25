import { PodaControle } from "../controle/poda.controle";
import { PodaDao } from "../dao/poda.dao";
import { TalhaoDao } from "../dao/talhao.dao";
import { PodaServico } from "../servico/poda.servico";
import { Api } from "./api"; // Classe centralizada do seu professor

export class PodaApi {
    readonly podaControle: PodaControle;

    // INJEÇÃO: Instancia os DAOs e passa de trás para frente na cadeia de dependências
    private constructor(readonly api: Api) {
        const podaDao = new PodaDao();
        const talhaoDao = new TalhaoDao();
        const podaServico = new PodaServico(podaDao, talhaoDao);
        
        this.podaControle = new PodaControle(podaServico);
    }

    public static build(api: Api) {
        const apiPoda = new PodaApi(api);
        apiPoda.addRotas();
    }

    public addRotas() {
        this.api.addRota("/poda", "POST", this.podaControle.cadastrar.bind(this.podaControle));
        this.api.addRota("/poda", "GET", this.podaControle.listar.bind(this.podaControle));
        this.api.addRota("/poda/:id", "GET", this.podaControle.buscar.bind(this.podaControle));
        this.api.addRota("/poda/:id", "PUT", this.podaControle.atualizar.bind(this.podaControle));
        this.api.addRota("/poda/:id", "DELETE", this.podaControle.deletar.bind(this.podaControle));
    }
}